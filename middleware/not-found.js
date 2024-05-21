const notFound = (req, res, next) => {
  try {
    res.status(404).json({
      msg: "request does not exits!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = notFound;
