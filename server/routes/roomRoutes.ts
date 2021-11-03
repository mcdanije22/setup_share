import express, { Router } from "express";
import fs from "fs";
import util from "util";
const unlinkFile = util.promisify(fs.unlink);
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const roomRoutes = Router();

roomRoutes.post("/create", (req: express.Request, res: express.Response) => {
  console.log(req.body);
  res.send({ data: req.body });
});

export default roomRoutes;
