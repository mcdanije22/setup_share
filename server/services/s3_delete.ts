import AWS from "aws-sdk";
require("dotenv").config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_BUCKET_ID,
  secretAccessKey: process.env.S3_BUCKET_SECRET,
});

const deleteFile = (key) => {
  // Setting up S3 upload parameters
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };
  return s3.deleteObject(params).promise();
};
export default deleteFile;
