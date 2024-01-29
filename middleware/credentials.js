const allowedOrigins = require("../config/allowedOrigins");

const credentails = (req, res, next) => {
  const origin = req.headres.origin;
  if (allowedOrigins.includes(origin)) {
    res.headres("Access-Control-Allow-Credentials", true);
  }
  next();
};
module.exports = credentails;
