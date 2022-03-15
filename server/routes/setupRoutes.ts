import express, { Router } from "express";
import db from "../services/dbConnection";
import deleteFile from "../services/s3_delete";
import checkAPIAuthMiddleware from "../middlewares/checkAPIAuthMiddleware";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";

const setupRouter = Router();

interface Token {
  data: Data;
  iat: number;
  exp: number;
}

interface Data {
  user_id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  user_created_date: Date;
  subscription_exp_date: Date;
}

setupRouter.post(
  "/create",
  checkAPIAuthMiddleware,
  async (req: express.Request, res: express.Response) => {
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
    if (getSetUpInfo.length === 0) {
      res.status(404).send("Setup does not exist");
    } else {
      res.send({ getSetUpInfo, getImageItems });
    }
  } catch (e) {
    res.status(404).send("Setup does not exist");
  }
});

setupRouter.put(
  "/item/delete",
  checkAPIAuthMiddleware,
  async (req: express.Request, res: express.Response) => {
    const { userId, itemId } = req.body;
    if (res.locals.user.user_id !== userId) {
      return res.status(401).send({ message: "Unauthorized" });
    } else {
      try {
        await db("image_items").where("image_items.item_id", itemId).del();
        res.send({ message: "Item Deleted Successfully" });
      } catch (e) {
        return res
          .status(500)
          .send({ message: "There was an error in processing, try again" });
      }
    }
  }
);

setupRouter.put(
  "/delete",
  checkAPIAuthMiddleware,
  async (req: express.Request, res: express.Response) => {
    const { userId, setupId } = req.body;
    if (res.locals.user.user_id !== userId) {
      return res.status(401).send({ message: "Unauthorized" });
    } else {
      try {
        const keyList = await db("setups")
          .innerJoin("images", "setups.setup_id", "images.setup_id")
          .where("setups.setup_id", setupId)
          .select("images.aws_key");
        if (keyList.length !== 0) {
          try {
            await db("setups").where("setups.setup_id", setupId).del();
            await keyList.forEach((image) => {
              deleteFile(image.aws_key);
            });
            res.send({ message: "Setup Deleted Successfully" });
          } catch (error) {
            return res
              .status(500)
              .send({ message: "There was an error in processing, try again" });
          }
        } else {
          return res
            .status(500)
            .send({ message: "There was an error in processing, try again" });
        }
      } catch (e) {
        return res
          .status(500)
          .send({ message: "There was an error in processing, try again" });
      }
    }
  }
);

setupRouter.put(
  "/trackVisit",
  async (req: express.Request, res: express.Response) => {
    const { setupId, setupUserId } = req.body;
    const cookies = new Cookies(req.headers.cookie);
    const authCookieToken = cookies.get("token");
    jwt.verify(authCookieToken, "secret", async function (err, decoded: Token) {
      if (decoded?.data.user_id === setupUserId) {
        return res.send(false);
      } else {
        try {
          await db("setups")
            .where("setup_id", setupId)
            .increment("number_of_visits", 1);
          return res.send(true);
        } catch (error) {
          return res.send(false);
        }
      }
    });
  }
);

setupRouter.put(
  "/trackItemClick",
  async (req: express.Request, res: express.Response) => {
    const { itemId, setupUserId } = req.body;
    const cookies = new Cookies(req.headers.cookie);
    const authCookieToken = cookies.get("token");
    jwt.verify(authCookieToken, "secret", async function (err, decoded: Token) {
      if (decoded?.data.user_id === setupUserId) {
        return res.send(false);
      } else {
        try {
          await db("image_items")
            .where("item_id", itemId)
            .increment("number_of_clicks", 1);
          return res.send(true);
        } catch (error) {
          return res.send(false);
        }
      }
    });
  }
);

export default setupRouter;
