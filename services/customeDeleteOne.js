const fetchOne = require("./customeFetchOne");

const customeDeleteOne = async (criteria, model) => {
  try {
    const getObj = await fetchOne(criteria, model);
    if (!getObj) {
      return false;
    }
    const obj = await model.deleteOne(criteria);
    return obj;
  } catch (err) {
    return JSON.stringify(err.message);
  }
};
module.exports = customeDeleteOne;
