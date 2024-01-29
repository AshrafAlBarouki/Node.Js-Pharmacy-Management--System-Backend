const express = require("express");

const getObjects = async (Model, criteria) => {
  try {
    if (criteria) {
      const obj = await Model.find(criteria);
      return obj;
    } else {
      const obj = await Model.find();
      if (!obj) {
        return express.json({ message: "Nothing was Found" });
      }
      return obj;
    }
  } catch (err) {
    return JSON.stringify(err.message);
  }
};

module.exports = getObjects;
