const fs = require("fs");

export default function(path) {
  let contents = "";
  return new Promise((resolve, reject) => {
    // read type definition file as a stream: https://stackoverflow.com/a/46801928
    const readStream = fs.createReadStream(path, "utf8");
    readStream.on("error", (error) => reject(error));
    readStream.on("data", (chunk) => (contents += chunk));
    readStream.on("end", () => resolve(contents));
  });
}
