import * as ts from "typescript";
import fs from "fs";
import prisma from "@services/prisma";

// @ts-ignore
import jsdoc from "jsdoc-api";

type File = {
  directory: string;
  js: string;
  ts: string;
};

export interface JSDocMinified {
  name: string;
  tags: { title: string; text: string }[];
  description: string;
}

const getFiles = (path: string): File[] => {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({
      directory: dirent.name,
      js: process.cwd() + "/" + path + "/" + dirent.name + "/index.js",
      ts: process.cwd() + "/" + path + "/" + dirent.name + "/index.ts",
    }));
};

const compileTs = (files: File[], cb: (files: File[]) => void) => {
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2017,
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  };

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
  }, 1000);
};

const migrate = async ({
  docs,
  code,
}: {
  docs: JSDocMinified[];
  code: string;
}): Promise<void> => {
  const platform = await prisma.platform.findUnique({ where: { code } });

  if (!platform) return console.error(`Platform ${code} not found`);

  const methods = docs
    .map((doc) => ({
      name: doc.name,
      description: doc.description,
      title: doc.tags.find((tag) => tag.title === "title")?.text,
    }))
    .filter((doc) => Boolean(doc.title));

  await prisma.platform.update({
    where: { id: platform.id },
    data: { methods },
  });
};

const explainAndMigrateJSDoc = async (files: File[]): Promise<void> => {
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
  Promise.all(docs.map(migrate)).then(() =>
    console.log("All the methods are migrated")
  );
};

const files = getFiles("services/platform");
compileTs(files, explainAndMigrateJSDoc);
