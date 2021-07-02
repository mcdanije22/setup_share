const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_BUCKET_ID,
  secretAccessKey: process.env.S3_BUCKET_SECRET,
});

const uploadFile = (fileName) => {
  // Read content from the file
  const imageTitle = "front view";
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: imageTitle, // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};
module.exports = uploadFile;
