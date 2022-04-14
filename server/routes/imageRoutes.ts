import express, { Router } from "express";
import fs from "fs";
import uploadFile from "../services/s3_upload";
import deleteFile from "../services/s3_delete";
import util from "util";
const unlinkFile = util.promisify(fs.unlink);
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import checkAPIAuthMiddleware from "../middlewares/checkAPIAuthMiddleware";

const imageRouter = Router();

interface Token {
  data: string;
  iat: number;
  exp: number;
}

imageRouter.post(
  "/upload",
  upload.single("image-file"),
  async (req: express.Request, res: express.Response) => {
    const file = req.file;
    console.log(file);
    // const result = await uploadFile(file);
    // await unlinkFile(file.path);
    // res.send({ aws: result, orgFile: file, filePath: file.path });
    res.send({ orgFile: file, filePath: file.path });
  }
);

imageRouter.post(
  "/awsUpload",
  async (req: express.Request, res: express.Response) => {
    const { filePath, fileName } = req.body;
    console.log(filePath);
    const awsData = await uploadFile({ filePath, fileName });
    res.send({ awsData });
  }
);

imageRouter.post(
  "/delete",
  checkAPIAuthMiddleware,
  async (req: express.Request, res: express.Response) => {
    const result = await deleteFile(req.body.key);
    res.send({ message: "deleted" });
  }
);

export default imageRouter;
