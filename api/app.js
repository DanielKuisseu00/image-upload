require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const { uploadFile, getFileStream } = require("./s3");

app.use(cors({ origin: "*" }));

const upload = multer({ dest: __dirname + "./images" });

app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  try {
    const result = await uploadFile(file);
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }

  const description = req.body.description;
});

// app.get("/images/:key", (req, res) => {
//   const result = req.params.key;

//   const pic = getFileStream(result);

//   res.status(200).json(pic);
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
