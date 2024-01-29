const Prescreption = require("../model/Prescreption");
const Drug = require("../model/Drug");
const Customer = require("../model/Customer");
const createObject = require("../services/customeCreate");
const getObjects = require("../services/customeFetchAll");
const fetchOne = require("../services/customeFetchOne");
const customeDeleteOne = require("../services/customeDeleteOne");

//get prescreptions

const getAllPrescreptions = async (req, res) => {
  const prescreptions = await getObjects(Prescreption, false);
  res.status(200).json(prescreptions);
};

//create Prescreption

const createPrescreption = async (req, res) => {
  if (!req?.body?.nationalNumber || !req?.body?.drugNames) {
    res
      .status(400)
      .json({ message: "Customer National Number and Drug Names are needed!" });
  }

  // get the customer

  const customer = await fetchOne(
    { nationalNumber: req.body.nationalNumber },
    Customer
  );
  // get the durg names from the requist
  const drugs = [];
  const keys = Object.keys(req.body.drugNames); // returns the indecis of the values in the requist
  for (let i = 0; i < keys.length; i++) {
    const drug = await fetchOne({ name: req.body.drugNames[i] }, Drug); // get the name of the drug based on the index stored in keys
    drugs.push(drug._id);
  }
  try {
    const result = await createObject(
      {
        customer_id: customer._id,
        drugs_ids: drugs,
        price: req.body.price,
      },
      Prescreption
    );
    customer.prescreptions_ids.push(result._id); // the prescreption id to the customer profile or DB in this case
    await customer.save();
    res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// update Prescreption

const updatePrescreption = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const prescreption = await fetchOne({ _id: req.body.id }, Prescreption);
  if (req.body?.price) prescreption.price = req.body.price;
  if (req.body?.drugNames) {
    const drugs = [];
    const keys = Object.keys(req.body.drugNames); // returns the indecis of the values in the requist
    for (let i = 0; i < keys.length; i++) {
      const drug = await fetchOne({ name: req.body.drugNames[i] }, Drug); // get the name of the drug based on the index stored in keys
      drugs.push(drug._id);
    }
    prescreption.drugs_ids = drugs;
  }
  try {
    const result = await prescreption.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete Prescreption

const deletePrescreption = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const result = await customeDeleteOne({ _id: req.body.id }, Prescreption);
  if (result) {
    return res.status(400).json({ message: "No Prescreption was Found" });
  }
  res.status(200).json(result);
};
const getPrescreptionById = (req, res) => {};

module.exports = {
  getAllPrescreptions,
  createPrescreption,
  updatePrescreption,
  deletePrescreption,
  getPrescreptionById,
};
