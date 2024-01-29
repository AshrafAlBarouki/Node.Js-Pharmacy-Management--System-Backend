const fetchOne = require("./customeFetchOne");

const createObject = async (
  obj,
  model,
  allowDuplicate = true,
  criteria
) => {
  try {
    if (!allowDuplicate && criteria) {
      const getObj = await fetchOne(criteria, model);
      if (getObj) {
        return JSON.stringify({ message: "Drug already exists!" });
      }
    }
    const entry = new model(obj);
    await entry.save();
    return entry;
  } catch (err) {
    return JSON.stringify(err.message);
  }
};

module.exports = createObject;
