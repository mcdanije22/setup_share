import express, { Router } from "express";
import fs from "fs";
import util from "util";
const unlinkFile = util.promisify(fs.unlink);
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const roomRoutes = Router();

roomRoutes.post(
  "/create",
  upload.single("image-file"),
  async (req: express.Request, res: express.Response) => {
    const { data } = req.body;
    console.log(data);
    const file = data;

    // const result = await uploadFile(file);
    // // may have to add delete logic in different call in order to keep preview
    // console.log(result);
    // await unlinkFile(file.path);
    // res.send({ description, title });
  }
);

export default roomRoutes;
