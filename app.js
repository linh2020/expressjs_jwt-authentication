require("dotenv").config();
require("express-async-errors");

const PORT = process.env.PORT || 5000;

const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Middleware
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.get("/", (req, res, next) => {
  try {
    res.status(200).json({
      msg: "Testing",
    });
  } catch (error) {
    console.log(error);
  }
});

// Handle Errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {};
try {
  app.listen(PORT, () =>
    console.log(`Express server is listening on port ${PORT}!`)
  );
} catch (error) {
  console.log(error);
}
start();
