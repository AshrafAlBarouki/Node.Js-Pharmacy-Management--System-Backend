const Drug = require("../model/Drug");
const createObject = require("../services/customeCreate");
const fetchOne = require("../services/customeFetchOne");
const getObjects = require("../services/customeFetchAll");
const customeDeleteOne = require("../services/customeDeleteOne");

// Get All Drugs

const getAllDrugs = async (req, res) => {
  const drugs = await getObjects(Drug, false);
  res.status(200).json(drugs);
};

// Create a Drug

const addDrug = async (req, res) => {
  if (!req?.body?.name) {
    return res.status(400).json({ message: "The Name is Empty!" });
  }
  try {
    const result = await createObject(
      {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        unitPrice:
          req.body.unitPrice ||
          parseInt(req.body.totalPrice / req.body.quantity),
        quantity: req.body.quantity,
        expDate: req.body.expDate,
        manufacturer: req.body.manufacturer,
        totalPrice:
          req.body.totalPrice ||
          parseInt(req.body.unitPrice * req.body.quantity),
      },
      Drug,
      false,
      { name: req.body.name }
    );
    res.json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// update a Drug

const updateDrug = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const drug = await Drug.findOne({ _id: req.body.id }).exec();
  if (!drug) {
    return res
      .status(204)
      .json({ message: `Drug ID : ${req.body.id} Not found!` });
  }
  if (req.body?.name) drug.name = req.body.name;
  if (req.body?.type) drug.type = req.body.type;
  if (req.body?.description) drug.description = req.body.description;
  if (req.body?.unitPrice) drug.unitPrice = req.body.unitPrice;
  if (req.body?.quantity) drug.quantity = req.body.quantity;
  if (req.body?.expDate) drug.expDate = req.body.expDate;
  if (req.body?.manufacturer) drug.manufacturer = req.body.manufacturer;
  if (req.body?.totalPrice) {
    drug.totalPrice = req.body.totalPrice;
    drug.unitPrice = parseInt(req.body.totalPrice / drug.quantity);
  } else {
    drug.totalPrice = parseInt(drug.unitPrice * drug.quantity);
  }
  const result = await drug.save();
  res.status(200).json(result);
};

// Delete a Drug

const deleteDrug = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const result = await customeDeleteOne({ _id: req.body.id }, Drug);
  if (!result) {
    return res.status(400).json({ message: "Nothing was found !" });
  }
  res.status(200).json(result);
};

// get Drug By Id

const getDurgById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const drug = await fetchOne({ _id: req.params.id }, Drug);
  if (!drug) {
    return res
      .status(204)
      .json({ message: `Drug ID : ${req.params.id} Not found!` });
  }
  res.status(200).json(drug);
};

module.exports = { addDrug, getAllDrugs, updateDrug, deleteDrug, getDurgById };
