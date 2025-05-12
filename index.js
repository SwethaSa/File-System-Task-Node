import fs from "fs";
import moment from "moment";
import express from "express";
import path from "path";

const app = express();

const filename = moment().format("YYYY-MM-DD-HH-mm-ss") + ".txt";

let timeStamp = new Date().toISOString();

fs.writeFile(
  `./Text Files/${filename}`,
  `Current Timestamp: ${timeStamp}`,
  (err) => {
    if (err) {
      console.log("Sorry Yaar😕", err);
    } else {
      console.log("File Created Successfully 👍");
    }
  }
);

const PORT = 5000;

app.get("/", (request, response) => {
  response.send(
    "Type 🎊http://localhost:5000/text-files🎊 to see the File Name"
  );
});

app.get("/text-files", (request, response) => {
  fs.readdir("./Text Files", (err, files) => {
    if (err) {
      response.status(500).json({ error: err });
      return;
    }
    const txtFiles = files.filter((file) => path.extname(file) === ".txt");
    response.json({ files: txtFiles });
  });
});

app.get("/text-files/:fileName", (request, response) => {
  const fileName = request.params.fileName;
  fs.readFile(`./Text Files/${fileName}`, "utf8", (err, data) => {
    if (err) {
      response.status(500).json({ error: err });
      return;
    }
    response.json({ data });
  });
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
