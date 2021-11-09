import express, { Router } from "express";
import db from "../services/dbConnection";

const roomRoutes = Router();

roomRoutes.post(
  "/create",
  async (req: express.Request, res: express.Response) => {
    try {
      const { title, room_type, description, images } = req.body;
      console.log(images);
      const insertResult = await db("rooms")
        .insert({
          // userID: "placeholder",
          room_title: title,
          room_description: description,
          room_type: room_type,
        })
        .returning("roomID");
      const mapImages = await images.map(async (image, i) => {
        const insertedImage = await db("images")
          .insert({
            // userID: "placehollder",
            roomID: insertResult[0],
            image_url: image.link,
            aws_key: image.key,
            image_position: image.imagePosition,
          })
          .returning("imageID");
        if (image.areas !== 0) {
          const mapImageItems = await image.areas.map(async (item, i) => {
            const insertedItem = await db("image_items").insert({
              // userID: "placehollder",
              roomID: insertResult[0],
              imageID: insertedImage[0],
              item_name: item.name,
              item_url: item.url,
              coords_list: item.coords,
            });
          });
        }
      });
      res.send({ data: req.body });
    } catch (e) {
      console.log(e);
    }
  }
);

export default roomRoutes;
