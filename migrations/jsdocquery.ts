import * as ts from "typescript";
import fs from "fs";
import prisma from "@/services/prisma";
import throat from "throat";

// @ts-ignore
import jsdoc from "jsdoc-api";

type File = {
  directory: string;
  js: string;
  ts: string;
};

export interface JSDocMinified {
  name: string;
  tags: Array<{ title: string; text: string }>;
  description: string;
}

const platforms_require_oauth: { [key: string]: boolean } = {
  github: true,
  stackoverflow: true,
  wakatime: true,
};

const getFiles = (path: string): Array<File> => {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      directory: dirent.name,
      js: process.cwd() + "/" + path + "/" + dirent.name + "/index.js",
      ts: process.cwd() + "/" + path + "/" + dirent.name + "/index.ts",
    }));
};

const compileTs = (files: Array<File>, cb: (files: Array<File>) => void) => {
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2017,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  };

  console.log(`― Compiling TS files to JS`);

  const program = ts.createProgram(
    files.map((file) => file.ts),
    options
  );
  program.emit();

  const tm = setInterval(() => {
    if (files.map((file) => fs.existsSync(file.js)).every(Boolean)) {
      cb(files);
      clearInterval(tm);
    }
  }, 100);
};

const migrate = async ({
  docs,
  code,
}: {
  docs: Array<JSDocMinified>;
  code: string;
}): Promise<void> => {
  let platform = await prisma.platform.findUnique({ where: { code } });

  const name = Array.from(code)
    .map((letter, i) => (i === 0 ? letter.toUpperCase() : letter))
    .join("");

  platform = await prisma.platform.upsert({
    where: { code },
    create: {
      code,
      name,
      config: {},
      queries: {},
      require_auth: platforms_require_oauth[code] || false,
    },
    update: {
      name,
      queries: {},
      require_auth: platforms_require_oauth[code] || false,
    },
  });

  const queries = docs
    .map((doc) => ({
      name: doc.name,
      description: doc.description,
      title: doc.tags.find((tag) => tag.title === "title")?.text as string,
    }))
    .filter((doc) => Boolean(doc.title));

  // delete all queries on the database that are not in the "queries" array
  const existingQueries = await prisma.platformQuery.findMany({
    where: {
      platformId: platform.id,
    },
  });
  const queriesToDelete = existingQueries.filter(
    (query) => !queries.find((q) => q.name === query.name)
  );

  for (let query of queriesToDelete) {
    console.log(`― Removing ${code}:${query.name}`);
    await prisma.platformQuery.delete({ where: { id: query.id } });
  }

  // update or create queries
  for (let query of queries) {
    console.log(`― Migrating ${code}:${query.name}`);
    const existingQuery = await prisma.platformQuery.findFirst({
      where: {
        name: query.name,
        platformId: platform.id,
      },
    });

    if (existingQuery) {
      await prisma.platformQuery.update({
        where: { id: existingQuery.id },
        data: {
          name: query.name,
          title: query.title,
          description: query.description,
          platform: {
            connect: { id: platform.id },
          },
        },
      });
    } else {
      const newQuery = await prisma.platformQuery.create({
        data: {
          name: query.name,
          title: query.title,
          description: query.description,
          platform: { connect: { id: platform.id } },
        },
      });
    }
  }
};

const explainAndMigrateJSDoc = async (files: Array<File>): Promise<void> => {
  console.log(`― Extracting JSDocs as JSON`);
  const docs_promise = files.map((file) => {
    const docs = jsdoc.explainSync({ files: file.js });
    return {
      docs: docs.filter(
        (doc: any) =>
          !doc?.undocumented && doc.kind === "member" && doc.scope === "global"
      ),
      code: file.directory,
    };
  });

  const docs = await Promise.all(docs_promise);
  files.forEach((file) => fs.unlinkSync(file.js));
  Promise.all(docs.map(throat(1, migrate))).then(() =>
    console.log("All the methods are migrated.")
  );
};

const files = getFiles("services/platform");
compileTs(files, explainAndMigrateJSDoc);
