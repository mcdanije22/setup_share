import express, { Router } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Cookies from "universal-cookie";

express().use(cookieParser());

interface Token {
  data: string;
  iat: number;
  exp: number;
}
export default function authenticateToken(req, res, next) {
  if (req.headers.cookie) {
    const cookies = new Cookies(req.headers.cookie);
    const authCookieToken = cookies.get("token");
    jwt.verify(authCookieToken, "secret", function (err, decoded: Token) {
      if (decoded) {
        res.locals.user = decoded.data;
        next();
      } else {
        //bycrypt compare fails(false) has does not equal password entered
        return res.status(401).send({ message: "Need to log back in" });
      }
    });
  } else {
    return res.status(401).send({ message: "Need to log back in" });
  }
}
