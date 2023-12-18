
const EnumCases = require("./EnumCases")


module.exports = (role) => {

  const toArray = Object.values(EnumCases)
  return !toArray.includes(role) ? EnumCases.USER : role
}