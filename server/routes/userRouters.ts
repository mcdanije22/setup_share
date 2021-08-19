import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../services/dbConnection";

const userRouter = Router();

userRouter.post("/register", (req, res) => {
  const saltRounds = 10;
  const { username, email, createdPassword, first_name, last_name } = req.body;
  const myPlaintextPassword = createdPassword;
  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    // const newUser = {
    //   username,
    //   email,
    //   hashedPassword: hash,
    //   first_name,
    //   last_name,
    // };
    db.insert({
      username,
      email,
      password: hash,
      first_name,
      last_name,
    }).into("users");
    res.send({ message: "user created" });
  });
});

export default userRouter;
