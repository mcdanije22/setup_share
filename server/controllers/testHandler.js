const testHandler = (req, res) => {
  const id = req.params.id;
  console.log(id)
  res.send({ id });
};
module.exports = testHandler;
