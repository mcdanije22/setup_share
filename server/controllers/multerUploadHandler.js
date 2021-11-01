const fs = require("fs");
const AWS = require("aws-sdk");
const uploadFile = require("../services/s3_upload");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multerUploadHandler = async (req, res) => {
  const file = req.file;
  console.log(file);
  const result = await uploadFile(file);
  // may have to add delete logic in different call in order to keep preview
  await unlinkFile(file.path);
  res.send({ aws: result, orgFile: file });
};
module.exports = multerUploadHandler;
