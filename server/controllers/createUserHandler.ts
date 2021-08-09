import bcrypt from "bcrypt";

const createUserHandler = (req, res) => {
  const saltRounds = 10;
  const myPlaintextPassword = req.body.createdPassword;

  bcrypt.hash(req.body.createdPassword, saltRounds, function (err, hash) {
    console.log(hash);
  });
  res.send({ id: req.body.createdPassword });
};
export default createUserHandler;
