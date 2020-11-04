const express = require("express");
const multer = require("multer");
const fs = require("fs");
const imageThumbnail = require("image-thumbnail");

const app = express();
const port = 3000;

const uploadImage = multer({ dest: "/assests" });

app.post("/image", uploadImage.single("file"), async (req, res) => {
  console.log(req.file, "req.files");
  const path = __dirname + "/" + "assests" + "/" + req.file.originalname;

  console.log(path);
  //validating if the file exist using fs.existsSync
  if (!fs.existsSync(path)) {
    res.send({ message: "An error occured", success: false });
  }
  //generating the thumbnail
  const data = await fs.readFileSync(path, {encoding: "base64"});
  const newImage = await fs.writeFileSync(path, data)
  console.log(newImage, "new Image")
  
  
//   const thumbnail = await imageThumbnail(path);
  
  
  res.send({ message: "File upload success", success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
