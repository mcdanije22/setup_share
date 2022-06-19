import imageRoutes from "./routes/imageRoutes";
import userRoutes from "./routes/userRouters";
import setupRoutes from "./routes/setupRoutes";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const db = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(bodyParser.json());
app.use(express.json());

app.get("/setups", async (req, res) => {
  const setups = await db.select().from("setups");
  res.json(setups);
});

// need to make sure to specify origin or cors will block cookies
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use("/image", imageRoutes);
app.use("/user", userRoutes);
app.use("/setup", setupRoutes);

app.listen(PORT, () => console.log(`server started successfully on ${PORT}`));
