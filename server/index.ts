import testHandler from "./controllers/testHandler";
import uploadHandler from "./controllers/uploadHandler";
import multerUploadHandler from "./controllers/multerUploadHandler";
import uploadFile from "./services/s3_upload";
import createUserHandler from "./controllers/createUserHandler";
import db from "./services/dbConnection";
import imageRoutes from "./routes/imageRoutes";
import userRoutes from "./routes/userRouters";
import setupRoutes from "./routes/setupRoutes";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());
app.use(express.json());

// need to make sure to specify origin or cors will block cookies
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/image", imageRoutes);
app.use("/user", userRoutes);
app.use("/setup", setupRoutes);

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
