import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/register", (req, res) => {
  const saltRounds = 10;
  const myPlaintextPassword = req.body.createdPassword;

  bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    //working compare statement

    bcrypt.compare("fantasy7", hash, function (err, result) {
      if (result) {
        //create jwt if compare is successful(true)
        console.log("success");
        const token = jwt.sign(
          {
            data: "foobar",
          },
          "secret",
          { expiresIn: "1h" }
        );
        console.log(token);

        //verify token is valid
        jwt.verify(token, "secret", function (err, decoded) {
          console.log(decoded);
          if (decoded) {
            console.log("good token");
          } else {
            //bycrypt compare fails(false) has does not equal password entered
            console.log("bad token");
          }
        });
      } else {
        console.log("fail");
      }
    });
    res.send({ hash });
  });
});

export default userRouter;
