const testHandler = (req, res) => {
  const id = req.params.id;
  res.send({ id });
};
module.exports = testHandler;
