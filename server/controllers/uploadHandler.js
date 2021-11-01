const fs = require("fs");
const AWS = require("aws-sdk");
const uploadFile = require("../services/s3_upload");

const uploadHandler = (req, res) => {
  // const id = req.params.id;
  // console.log(id);
  // res.send({ id });
  uploadFile("./cat.jpg");
};

module.exports = uploadHandler;
