import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../services/dbConnection";
import cookieParser from "cookie-parser";

express().use(cookieParser());

const userRouter = Router();

userRouter.post("/register", (req, res) => {
  const saltRounds = 10;
  const { username, email, createdPassword, first_name, last_name } = req.body;
  bcrypt.hash(createdPassword, saltRounds, function (err, hash) {
    (async function () {
      try {
        const createUser = db("users").insert({
          username,
          email,
          password: hash,
          first_name,
          last_name,
        });
        const data = await createUser;
        res.send({ data });
      } catch (error) {
        console.log(error);
        if (error.constraint === "users_email_unique") {
          res.send({ message: "email already has an account" });
        } else if (error.constraint === "users_username_unique") {
          res.send({ message: "username already taken" });
        } else {
          res.send({ message: error.detail });
        }
      }
    })();
  });
});
userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  const getUserHash = async () => {
    const userHash = await db("users").select("password").where("email", email);
    if (userHash.length !== 0) {
      return userHash;
    } else {
      //send null if querry does not found an account
      return null;
    }
  };
  const createCookie = (token) => {
    res.cookie("token", token, {
      maxAge: 900000,
      httpOnly: true,
    });
  };
  const createJWTToken = (uniqueData) => {
    const token = jwt.sign(
      {
        data: uniqueData,
      },
      "secret", //change this to much longer string and make .env var
      { expiresIn: "1h" }
    );
    createCookie(token);
  };
  const logUserIn = async () => {
    const user = await db("users")
      .select(
        "userID",
        "email",
        "username",
        "first_name",
        "last_name",
        "user_created_date",
        "subscription_exp_date"
      )
      .where("email", email);
    createJWTToken(user[0].userID);
    res.send({ user });
  };

  (async function () {
    const dbHashPassword = await getUserHash();
    if (!dbHashPassword) {
      //receives null if no account found
      res.send({ message: "No account for email" });
    } else {
      const hashedPassword = await dbHashPassword[0].password;
      bcrypt.compare(password, hashedPassword, function (err, result) {
        if (result) {
          console.log("success");
          logUserIn();
        } else {
          res.send({ message: "Incorrect password!" });
        }
      });
    }
  })();
});

export default userRouter;
