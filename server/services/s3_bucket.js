const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_BUCKET_ID,
  secretAccessKey: process.env.S3_BUCKET_SECRET,
});

const uploadFile = (file) => {
  // Read content from the file
  const fileContent = fs.createReadStream(file.path);

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: file.filename, // File name you want to save as in S3
    Body: fileContent,
  };
  return s3.upload(params).promise();
};
module.exports = uploadFile;
