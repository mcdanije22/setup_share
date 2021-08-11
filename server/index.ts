import testHandler from "./controllers/testHandler";
import uploadHandler from "./controllers/uploadHandler";
import multerUploadHandler from "./controllers/multerUploadHandler";
import uploadFile from "./services/s3_bucket";
import createUserHandler from "./controllers/createUserHandler";
import db from "./services/dbConnection";
import testRoutes from "./routes/testRoutes";
import imageRoutes from "./routes/imageRoutes";
import userRoutes from "./routes/userRouters";

import express, { Router } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use("/test", testRoutes);
app.use("/image", imageRoutes);
app.use("/user", userRoutes);

// app.get("/ping", (req, res) => {
//   const testFunction = async () => {
//     const test = await db.select("*").from("users").where("username", "bjosh");
//     console.log(test);
//     const test2 = await db("users")
//       .where("username", "bjosh")
//       .select("username", "email");
//     res.send({ test2 });
//   };
//   testFunction();
//   console.log("new test");
// });
// app.get("/ping/:id", testHandler);
// app.get("/upload", uploadHandler);
// app.post("/images", upload.single("image-file"), multerUploadHandler);
// app.post("/createuser", createUserHandler);

app.listen(PORT, () => console.log(`server started successfully on ${PORT}`));
