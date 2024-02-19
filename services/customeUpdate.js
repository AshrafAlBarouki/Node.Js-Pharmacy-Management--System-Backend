const customeUpdate = async (criteria, model) => {
  try {
    const entry = model(criteria);
    entry.save();
  } catch (err) {
    return JSON.stringify({ message: err.message });
  }
};
