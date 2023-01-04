//router.js
const express = require("express");
const path = require("path");

const uploadRouter = new express.Router();
const upload = require("../uploadMiddleware");
const Resize = require("../Resize");

uploadRouter.post("/post", upload.single("image"), async function (req, res) {
  // folder upload
  console.log(req.file);
  const imagePath = path.join("D:/bookstore/server", "/public/images");
  // call class Resize
  console.log(imagePath);
  const fileUpload = new Resize(imagePath);
  console.log(req.file);
  if (!req.file) {
    res.status(401).json({ error: "Please provide an image" });
  }
  const filename = await fileUpload.save(req.file.buffer);

  return res
    .status(200)
    .json({ url_img: `http://localhost:9000/images/${filename}` });
});

module.exports = uploadRouter;
