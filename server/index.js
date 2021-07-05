const testHandler = require("./controllers/testHandler");
const uploadHandler = require("./controllers/uploadHandler");
const multerUploadHandler = require("./controllers/multerUploadHandler");
const uploadFile = require("./services/s3_bucket");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("/ping", (req, res) => {
  console.log("new test");
  res.send({ message: "test object" });
});
app.get("/ping/:id", testHandler);
app.get("/upload", uploadHandler);
app.post("/images", upload.single("image-file"), multerUploadHandler);

app.listen(PORT, () => console.log(`server started successfully on ${PORT}`));
