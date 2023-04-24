import fs from "fs";

const fonts = fs
  .readdirSync("./document/fonts", { withFileTypes: true })
  .filter((item) => item.isDirectory() === true);

for (const font of fonts) {
  const fontDirectory = font.name;

  fs.readdir(`./document/fonts/${fontDirectory}`, (err, files) => {
    if (err) throw err;
    const fontFiles = files.filter((file) => file.endsWith(".ttf"));
    let fontFileContents = "";
    fontFiles.forEach((fontFile) => {
      const fontWeight = fontFile.split("-")[1].split(".")[0];
      const fontFileContent = fs.readFileSync(
        `./document/fonts/${fontDirectory}/${fontFile}`
      );
      const fontFileContentBase64 = fontFileContent.toString("base64");
      fontFileContents += `export const W${fontWeight} = "${fontFileContentBase64}";\n`;
    });
    fs.writeFileSync(
      `./document/fonts/${fontDirectory}/index.ts`,
      fontFileContents
    );
  });
}
