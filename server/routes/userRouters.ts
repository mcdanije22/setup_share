import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/register", (req, res) => {
  const saltRounds = 10;
  const myPlaintextPassword = req.body.createdPassword;

  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    console.log(hash);
    //working compare statement
    bcrypt.compare("fantasy7", hash, function (err, result) {
      if (result) {
        console.log("success");
        const token = jwt.sign(
          {
            data: "foobar",
          },
          "secret",
          { expiresIn: "1h" }
        );
        console.log(token);

        jwt.verify(token, "secret", function (err, decoded) {
          console.log(decoded);
          if (decoded) {
            console.log("good token");
          } else {
            console.log("bad token");
          }
          //   try {
          //     const decoded = jwt.verify(token, "secret");
          //     console.log(decoded);
          //   } catch (err) {
          //     res.send({ error: "invalid signature" });
          //   }
          //   if (err) {
          //     res.send({ error: "invalid signature" });
          //   } else {
          //     const decoded = jwt.verify(token, "secret");
          //     console.log(decoded);
          //   }
        });
      } else {
        console.log("fail");
      }
    });
    res.send({ hash });
  });
});

export default userRouter;
