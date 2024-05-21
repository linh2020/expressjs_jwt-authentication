const errorHandlerMiddleware = async (err, req, res, next) => {
  try {
    res.status(500).json({
      msg: "Something went wrong, please try again!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = errorHandlerMiddleware;
