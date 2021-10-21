import express, { Router } from "express";
import fs from "fs";
import uploadFile from "../services/s3_bucket";
import util from "util";
const unlinkFile = util.promisify(fs.unlink);
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const imageRouter = Router();

imageRouter.post(
  "/upload",
  upload.single("image-file"),
  async (req: express.Request, res: express.Response) => {
    const file = req.file;
    console.log(req.file);
    const result = await uploadFile(file);
    // may have to add delete logic in different call in order to keep preview
    await unlinkFile(file.path);
    res.send({ aws: result, orgFile: file });
  }
);

export default imageRouter;
