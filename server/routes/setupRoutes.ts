import express, { Router } from "express";
import db from "../services/dbConnection";
import checkAPIAuthMiddleware from "../middlewares/checkAPIAuthMiddleware";

const setupRoutes = Router();

interface Token {
  data: string;
  iat: number;
  exp: number;
}

setupRoutes.post(
  "/create",
  checkAPIAuthMiddleware,
  async (req: express.Request, res: express.Response) => {
    try {
      const { title, setupType, description, images, createdScreenType } =
        req.body;
      const insertResult = await db("setups")
        .insert({
          // user_id: "placeholder",
          setup_title: title,
          setup_description: description,
          setup_type: setupType,
          created_screen_type: createdScreenType,
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
            image_position_number: image.imagePositionNumber,
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
      return res
        .status(400)
        .send({ message: "Setup failed to submit, please try again" });
    }
  }
);
setupRoutes.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const getSetUpInfo = await db("setups")
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
    const getImageItems = await db("image_items")
      .where("image_items.setup_id", req.params.id)
      .select(
        "image_items.item_id",
        "image_items.image_id",
        "image_items.coords_list",
        "image_items.item_name",
        "image_items.item_url"
      );
    res.send({ getSetUpInfo, getImageItems });
  } catch (e) {
    res.status(404).send("Setup does not exist");
  }
});

export default setupRoutes;
