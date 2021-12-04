import express, { Router } from "express";
import db from "../services/dbConnection";

const setupRoutes = Router();

setupRoutes.post(
  "/create",
  async (req: express.Request, res: express.Response) => {
    try {
      const { title, setupType, description, images } = req.body;
      const insertResult = await db("setups")
        .insert({
          // user_id: "placeholder",
          setup_title: title,
          setup_description: description,
          setup_type: setupType,
        })
        .returning("setup_id");
      const mapImages = await images.map(async (image, i) => {
        const insertedImage = await db("images")
          .insert({
            // user_id: "placeholder",
            setup_id: insertResult[0],
            image_url: image.link,
            aws_key: image.key,
            image_position: image.imagePosition,
          })
          .returning("image_id");
        if (image.areas !== 0) {
          const mapImageItems = await image.areas.map(async (item, i) => {
            const insertedItem = await db("image_items").insert({
              // user_id: "placeholder",
              setup_id: insertResult[0],
              image_id: insertedImage[0],
              item_name: item.name,
              item_url: item.url,
              coords_list: item.coords,
            });
          });
        }
      });
      res.send({ setup_id: insertResult[0] });
    } catch (e) {
      console.log(e);
      return res.status(400).send({ message: "Setup failed to submit" });
    }
  }
);
setupRoutes.get("/:id", async (req: express.Request, res: express.Response) => {
  const getSetUpInfo = await db("setups")
    .innerJoin("users", "setups.user_id", "users.user_id")
    .innerJoin("images", "setups.setup_id", "=", "images.setup_id")
    .leftJoin("image_items", "images.image_id", "=", "image_items.image_id")
    .where("setups.setup_id", req.params.id)
    .select(
      "setups.*",
      "images.*",
      "image_items.*",
      "users.user_id",
      "users.first_name",
      "users.last_name",
      "users.email",
      "users.username"
    );
  res.send({ getSetUpInfo });
});

export default setupRoutes;
