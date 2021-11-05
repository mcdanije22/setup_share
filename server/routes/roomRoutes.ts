import express, { Router } from "express";
import knex from "knex";
import db from "../services/dbConnection";

const roomRoutes = Router();

roomRoutes.post(
  "/create",
  async (req: express.Request, res: express.Response) => {
    const { title, description, images } = req.body;
    console.log(title, description);
    const addRoom = await db("rooms").insert({
      room_title: title,
      room_description: description,
    });
    res.send({ data: req.body });
  }
);

export default roomRoutes;
