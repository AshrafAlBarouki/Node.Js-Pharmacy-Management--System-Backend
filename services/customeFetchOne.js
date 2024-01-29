const fetchOne = async (criteria, Model) => {
  try {
    const obj = await Model.findOne(criteria).exec();
    if (!obj) {
      return false;
    } else {
      return obj;
    }
  } catch (err) {
    return JSON.stringify(err.message);
  }
};
module.exports = fetchOne;
