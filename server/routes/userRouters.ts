import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../services/dbConnection";
import cookieParser from "cookie-parser";

express().use(cookieParser());

const userRouter = Router();

interface RegisterUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
interface LoginUser {
  email: string;
  password: string;
}
interface Token {
  data: string;
  iat: number;
  exp: number;
}
interface passwordHash {
  password: string;
}

userRouter.get("/test", (req: express.Request, res: express.Response) => {
  if (req.headers.cookie) {
    //route to test cookie access and jwt token verify
    const cookie = req.headers.cookie.replace("token=", "");
    jwt.verify(cookie, "secret", function (err, decoded: Token) {
      if (decoded) {
        console.log("good token");
        res.send({ message: "good token" });
      } else {
        //bycrypt compare fails(false) has does not equal password entered
        console.log("bad token");
        res.send({ message: "bad token" });
      }
    });
  } else {
    console.log("need to re-verify log in and obtain cookie");
    res.send({ message: 'need to re-verify log in and obtain cookie"' });
  }
});

userRouter.post("/register", (req: express.Request, res: express.Response) => {
  const saltRounds = 10;
  const { username, email, first_name, last_name }: RegisterUser = req.body;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash: string) {
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
        res.send({ message: "user registered" });
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
userRouter.post("/login", (req: express.Request, res: express.Response) => {
  const { email, password }: LoginUser = req.body;
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
    var now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000);
    res.cookie("token", token, {
      //sets cookie exp for 6hs
      maxAge: 6 * 60 * 60 * 1000,
      httpOnly: true,
    });
  };
  const createJWTToken = (uniqueData: string) => {
    const token = jwt.sign(
      {
        data: uniqueData,
      },
      "secret", //change this to much longer string and make .env var
      { expiresIn: "6h" }
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
    res.send({ user: user[0] });
  };

  (async function () {
    const dbHashPassword: Array<passwordHash> = await getUserHash();
    if (!dbHashPassword) {
      //receives null if no account found
      res.send({ message: "No account for email" });
    } else {
      const hashedPassword = await dbHashPassword[0].password;
      bcrypt.compare(password, hashedPassword, function (err, result: boolean) {
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
