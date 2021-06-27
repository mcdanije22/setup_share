// const testHandler = require("./controllers/testHandler");

// const express = require("express");
// const next = require("next");
// const bodyParser = require("body-parser");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = express();

//   server.use(bodyParser.json());
//   // add custom path here
//   // server.post('/request/custom', custom);
//   server.get("/ping", (req, res) => console.log("test"));
//   // server.get("/ping/:id", (req, res) => {
//   //   const id = req.params.id;
//   //   res.send({ id });
//   // });
//   server.get("/ping/:id", testHandler);

//   server.listen(5000, (err) => {
//     if (err) throw err;
//     console.log("Ready on http://localhost:5000");
//   });
// });
const testHandler = require("./controllers/testHandler");

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


app.get("/ping", (req, res) => {
  console.log("new test")
  res.send({message:'test object'})
});
app.get("/ping/:id", testHandler);


app.listen(PORT, ()=> console.log(`server started successfully on ${PORT}`))