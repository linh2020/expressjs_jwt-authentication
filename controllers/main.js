const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400); // 400 Bad Request
  }

  // just for demo, normally provided by DB
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value
  // https://jwt.io/
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  res.status(200).json({ msg: "user created", token }); // HTTP 200 OK success - the request has succeeded
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`, // { id: 23, username: 'linh' }
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
