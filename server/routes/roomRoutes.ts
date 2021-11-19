import express, { Router } from "express";
import db from "../services/dbConnection";

const roomRoutes = Router();

roomRoutes.post(
  "/create",
  async (req: express.Request, res: express.Response) => {
    try {
      const { title, setupType, description, images } = req.body;
      const insertResult = await db("rooms")
        .insert({
          // userID: "placeholder",
          setup_title: title,
          setup_description: description,
          setup_type: setupType,
        })
        .returning("roomID");
      const mapImages = await images.map(async (image, i) => {
        const insertedImage = await db("images")
          .insert({
            // userID: "placeholder",
            roomID: insertResult[0],
            image_url: image.link,
            aws_key: image.key,
            image_position: image.imagePosition,
          })
          .returning("imageID");
        if (image.areas !== 0) {
          const mapImageItems = await image.areas.map(async (item, i) => {
            const insertedItem = await db("image_items").insert({
              // userID: "placeholder",
              roomID: insertResult[0],
              imageID: insertedImage[0],
              item_name: item.name,
              item_url: item.url,
              coords_list: item.coords,
            });
          });
        }
      });
      res.send({ message: "Setup submitted successfully" });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ message: "Setup failed to submit" });
    }
  }
);

export default roomRoutes;
