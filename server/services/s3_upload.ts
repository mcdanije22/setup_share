import AWS from "aws-sdk";
import fs from "fs";
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_BUCKET_ID,
  secretAccessKey: process.env.S3_BUCKET_SECRET,
});

const uploadFile = (file) => {
  console.log(file);
  // Read content from the file
  const fileContent = fs.createReadStream(file.filePath);

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: file.fileName, // File name you want to save as in S3
    Body: fileContent,
  };
  return s3.upload(params).promise();
};
export default uploadFile;
