import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../services/dbConnection";
import cookieParser from "cookie-parser";
import checkAPIAuthMiddleware from "../middlewares/checkAPIAuthMiddleware";

express().use(cookieParser());

const userRouter = Router();

interface RegisterUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_id: string;
}
interface LoginUser {
  email: string;
  password: string;
}
interface Token {
  data: RegisterUser;
  iat: number;
  exp: number;
}
interface passwordHash {
  password: string;
}

userRouter.post("/pageauth", (req: express.Request, res: express.Response) => {
  const { cookie } = req.body;
  if (cookie) {
    //failing
    jwt.verify(cookie, "secret", function (err, decoded: Token) {
      if (decoded) {
        return res.send({ authd: true, user: decoded.data.user_id });
      } else {
        console.log("test");
        //bycrypt compare fails(false) has does not equal password entered
        return res.status(401).send(false);
      }
    });
  } else {
    return res.status(401).send(false);
  }
});

userRouter.get(
  "/usercontext",
  checkAPIAuthMiddleware,
  async (req: express.Request, res: express.Response) => {
    if (res.locals.user) {
      const tokenEmail = res.locals.user.email;
      const user = await db("users")
        .select(
          "user_id",
          "email",
          "username",
          "first_name",
          "last_name",
          "user_created_date",
          "subscription_exp_date"
        )
        .where("email", tokenEmail);
      res.send({ user: user[0] });
    } else {
      res.status(400).send({ message: "Need to log in" });
    }
  }
);

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
        if (error.constraint === "users_email_unique") {
          res.status(400).send({ message: "email already has an account" });
        } else if (error.constraint === "users_username_unique") {
          res.status(400).send({ message: "username already taken" });
        } else {
          res.status(400).send({ message: "Error in registration, try again" });
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
        "user_id",
        "email",
        "username",
        "first_name",
        "last_name",
        "user_created_date",
        "subscription_exp_date"
      )
      .where("email", email);
    createJWTToken(user[0]);
    res.send({ user: user[0] });
  };

  (async function () {
    const dbHashPassword: Array<passwordHash> = await getUserHash();
    if (!dbHashPassword) {
      //receives null if no account found
      res.status(400).send({ message: "No account for email" });
    } else {
      const hashedPassword = await dbHashPassword[0].password;
      bcrypt.compare(password, hashedPassword, function (err, result: boolean) {
        if (result) {
          logUserIn();
        } else {
          return res.status(400).send({ message: "Incorrect password!" });
        }
      });
    }
  })();
});

userRouter.get(
  "/dashboard/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const userDashboardInfo = await db("users")
        .innerJoin("setups", "setups.user_id", "users.user_id")
        .innerJoin("images", "setups.setup_id", "images.setup_id")
        .where("users.user_id", req.params.id)
        .andWhere("images.image_position", "Main")
        .select(
          "users.user_id",
          "users.username",
          "setups.setup_id",
          "setups.setup_title",
          "setups.setup_description",
          "setups.setup_type",
          "setups.setup_created_date",
          "setups.created_screen_type",
          "images.image_id",
          "images.image_url",
          "images.image_position",
          "images.image_position_number",
          "images.setup_id"
        );
      res.send({ userDashboardInfo });
    } catch (e) {
      res.status(400).send({ message: "Not Logged in" });
    }
  }
);

userRouter.get(
  "/analytics/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const setUpInfo = await db("setups")
        .innerJoin("users", "setups.user_id", "users.user_id")
        .innerJoin("images", "setups.setup_id", "images.setup_id")
        .where("setups.setup_id", req.params.id)
        .select(
          "setups.setup_id",
          "setups.setup_title",
          "setups.setup_description",
          "setups.setup_type",
          "setups.setup_created_date",
          "setups.created_screen_type",
          "images.image_id",
          "images.image_url",
          "images.image_position",
          "images.image_position_number",
          "images.setup_id",
          "users.user_id",
          "users.username"
        );
      const imageItems = await db("image_items")
        .where("image_items.setup_id", req.params.id)
        .select(
          "image_items.item_id",
          "image_items.image_id",
          "image_items.coords_list",
          "image_items.item_name",
          "image_items.item_url"
        );
      res.send({ setUpInfo, imageItems });
    } catch (e) {
      res.status(404).send("Setup does not exist");
    }
  }
);

export default userRouter;
