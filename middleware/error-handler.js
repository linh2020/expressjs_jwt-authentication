const errorHandler = (err, req, res, next) => {
  try {
    res.status(500).json({
      msg: "Something went wrong!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = errorHandler;
