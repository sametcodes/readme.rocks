import * as ts from "typescript";
import fs from "fs";
import prisma from "@/services/prisma";
import throat from "throat";

// @ts-ignore
import jsdoc from "jsdoc-api";
import { PlatformCode } from "@prisma/client";

type File = {
  directory: string;
  platform_code: PlatformCode;
  js: string;
  ts: string;
};

type QueryType = "Public" | "Private";

export interface JSDocMinified {
  name: string;
  tags: Array<{ title: string; text: string }>;
  description: string;
}

const platformsRequireOAuth: { [key: string]: boolean } = {
  github: true,
  stackoverflow: true,
  wakatime: true,
};

const getFiles = (path: string): Array<File> => {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      directory: dirent.name + "/query",
      platform_code: dirent.name as PlatformCode,
      js: process.cwd() + "/" + path + dirent.name + "/query/index.js",
      ts: process.cwd() + "/" + path + dirent.name + "/query/index.ts",
    }));
};

const compileTs = (
  compileFiles: Array<File>,
  cb: (files: Array<File>) => void
) => {
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2017,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  };

  console.log(`― Compiling TS files to JS`);

  const program = ts.createProgram(
    compileFiles.map((file) => file.ts),
    options
  );
  program.emit();

  const tm = setInterval(() => {
    if (compileFiles.map((file) => fs.existsSync(file.js)).every(Boolean)) {
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
  code: PlatformCode;
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
      require_auth: platformsRequireOAuth[code] || false,
    },
    update: {
      name,
      queries: {},
      require_auth: platformsRequireOAuth[code] || false,
    },
  });

  const queries = docs
    .map((doc) => {
      const title = doc.tags.find((tag) => tag.title === "title");
      const queryType = doc.tags.find((tag) => tag.title === "query_type");
      const cacheTime = doc.tags.find((tag) => tag.title === "cache_time");
      const forSecured = doc.tags.find((tag) => tag.title === "for_secured");
      const forPublic = doc.tags.find((tag) => tag.title === "for_public");

      return {
        name: doc.name,
        description: doc.description,
        title: title?.text as string,
        query_type: queryType?.text as QueryType,
        for_secured: forSecured?.text,
        for_public: forPublic?.text,
        cache_time: Number((cacheTime?.text as string) || 86400),
      };
    })
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

  for (const query of queriesToDelete) {
    console.log(`― Removing ${code}:${query.name}`);
    await prisma.platformQuery.delete({ where: { id: query.id } });
  }

  // update or create queries
  for (const query of queries) {
    console.log(`― Migrating ${code}:${query.name}`);
    const existingQuery = await prisma.platformQuery.findFirst({
      where: {
        name: query.name,
        platformId: platform.id,
      },
    });

    const data: any = {
      name: query.name,
      title: query.title,
      query_type: query.query_type,
      cache_time: query.cache_time,
      description: query.description,
      platform: { connect: { id: platform.id } },
    };

    if (query.for_secured) {
      const securedQuery = await prisma.platformQuery.findFirst({
        where: { name: query.for_secured, platformId: platform.id },
      });
      if (!securedQuery)
        throw new Error(
          `Secured query ${query.for_secured} not found for ${code}:${query.name}`
        );
      data.securedPlatformQuery = { connect: { id: securedQuery.id } };
    }

    if (query.for_public) {
      const publicQuery = await prisma.platformQuery.findFirst({
        where: { name: query.for_public, platformId: platform.id },
      });
      if (!publicQuery)
        throw new Error(
          `Public query ${query.for_public} not found for ${code}:${query.name}`
        );
      data.publicPlatformQuery = { connect: { id: publicQuery.id } };
    }

    if (existingQuery) {
      await prisma.platformQuery.update({
        where: { id: existingQuery.id },
        data,
      });
    } else {
      await prisma.platformQuery.create({ data });
    }
  }
};

const explainAndMigrateJSDoc = async (
  explainFiles: Array<File>
): Promise<void> => {
  console.log(`― Extracting JSDocs as JSON`);
  const docsPromise = explainFiles.map((file) => {
    const explainedDocs = jsdoc.explainSync({ files: file.js });
    return {
      docs: explainedDocs.filter(
        (doc: any) =>
          !doc?.undocumented && doc.kind === "member" && doc.scope === "global"
      ),
      code: file.platform_code,
    };
  });

  const docs = await Promise.all(docsPromise);
  explainFiles.forEach((file) => fs.unlinkSync(file.js));
  Promise.all(docs.map(throat(1, migrate))).then(() =>
    console.log("All the methods are migrated.")
  );
};

const files = getFiles("platforms/");
compileTs(files, explainAndMigrateJSDoc);
