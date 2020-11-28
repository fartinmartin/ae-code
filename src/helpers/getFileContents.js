const fs = require("fs");

export default function(path) {
  let contents = "";
  return new Promise((resolve, reject) => {
    fs.createReadStream(path, "utf8")
      .on("error", (error) => reject(error))
      .on("data", (chunk) => (contents += chunk))
      .on("end", () => resolve(contents));
  });
}
