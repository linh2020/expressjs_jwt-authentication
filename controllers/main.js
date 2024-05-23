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
  // console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No token provided", 401); // 401 - Unauthorized Error
  }

  const token = authHeader.split(" ")[1];
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded); // { id: 23, username: 'aaaa', iat: 1716454914, exp: 1716455214 }

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};

module.exports = { login, dashboard };
