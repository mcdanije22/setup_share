import express, { Router } from "express";
import fs from "fs";
import uploadFile from "../services/s3_upload";
import deleteFile from "../services/s3_delete";
import util from "util";
const unlinkFile = util.promisify(fs.unlink);
import multer from "multer";
const upload = multer({ dest: "uploads/" });

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
    const result = await uploadFile(file);
    await unlinkFile(file.path);
    res.send({ aws: result, orgFile: file });
  }
);

imageRouter.post(
  "/delete",
  async (req: express.Request, res: express.Response) => {
    const result = await deleteFile(req.body.key);
    res.send({ message: "deleted" });
  }
);

export default imageRouter;
