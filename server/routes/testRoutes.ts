import express, { Router } from "express";

const testRouter = Router();

testRouter.get("/1", (req, res) => {
  console.log("test");
  res.send({ message: "test" });
});
testRouter.get("/2", (req, res) => {
  console.log("test2");
  res.send({ message: "test2" });
});
export default testRouter;
