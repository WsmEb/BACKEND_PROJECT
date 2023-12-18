const jwt = require("jsonwebtoken")

module.exports = async (pyload) => {
  const token = await jwt.sign(pyload,process.env.JWT_SECRET_KEY,{expiresIn : "10m"})
  return token;
}