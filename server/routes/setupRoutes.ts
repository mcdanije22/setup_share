import express, { Router } from "express";
import db from "../services/dbConnection";
import checkAPIAuthMiddleware from "../middlewares/checkAPIAuthMiddleware";

const setupRouter = Router();

interface Token {
  data: string;
  iat: number;
  exp: number;
}

setupRouter.post(
  "/create",
  checkAPIAuthMiddleware,
  async (req: express.Request, res: express.Response) => {
    //TODO changed to add user_id at the end of check due to other part of code. Need to verify
    if (res.locals.user.user_id !== req.body.userId) {
      return res.status(401).send({ message: "Need to log in" });
    }
    try {
      const {
        title,
        setupType,
        description,
        images,
        createdScreenType,
        userId,
      } = req.body;
      const insertResult = await db("setups")
        .insert({
          user_id: userId,
          setup_title: title,
          setup_description: description,
          setup_type: setupType,
          created_screen_type: createdScreenType,
        })
        .returning("setup_id");
      const mapImages = await images.map(async (image, i) => {
        const insertedImage = await db("images")
          .insert({
            user_id: userId,
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
              user_id: userId,
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
setupRouter.get("/:id", async (req: express.Request, res: express.Response) => {
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

setupRouter.put(
  "/item/delete",
  checkAPIAuthMiddleware,
  async (req: express.Request, res: express.Response) => {
    const { userId, itemId } = req.body;
    console.log("userid", userId);
    console.log("cookie", res.locals.user);
    if (res.locals.user.user_id !== userId) {
      return res.status(401).send({ message: "Unauthorized" });
    } else {
      try {
        const deleteItem = await db("image_items")
          .where("image_items.item_id", itemId)
          .del();
        res.send({ message: "Item Deleted Successfully" });
      } catch (e) {
        return res
          .status(500)
          .send({ message: "There was an error in processing, try again" });
      }
    }
  }
);

export default setupRouter;
