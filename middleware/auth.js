const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Unauthenticated("No token provided"); // 401 - Unauthorized Error
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // { id: 23, username: 'aaaa', iat: 1716454914, exp: 1716455214 }
    const { id, username } = decoded;

    req.user = { id, username };
    next();
  } catch (error) {
    throw new Unauthenticated("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
