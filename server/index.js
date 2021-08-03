const testHandler = require("./controllers/testHandler");
const uploadHandler = require("./controllers/uploadHandler");
const multerUploadHandler = require("./controllers/multerUploadHandler");
const uploadFile = require("./services/s3_bucket");

const express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = process.env.PORT || 5000;

const db = require("knex")({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    // user: "your_database_user",
    // password: "your_database_password",
    database: "test_db",
  },
});

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.use(bodyParser.json());
app.use(cors());

app.get("/ping", (req, res) => {
  const testFunction = async () => {
    const test = await db.select("*").from("users").where("username", "bjosh");
    console.log(test);
    const test2 = await db("users")
      .where("username", "bjosh")
      .select("username", "email");
    res.send({ test2 });
  };
  testFunction();
  console.log("new test");
});
app.get("/ping/:id", testHandler);
app.get("/upload", uploadHandler);
app.post("/images", upload.single("image-file"), multerUploadHandler);

app.listen(PORT, () => console.log(`server started successfully on ${PORT}`));
