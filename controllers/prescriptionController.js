const Prescription = require("../model/Prescription");
const Drug = require("../model/Drug");
const Customer = require("../model/Customer");
const createObject = require("../services/customeCreate");
const getObjects = require("../services/customeFetchAll");
const fetchOne = require("../services/customeFetchOne");
const customeDeleteOne = require("../services/customeDeleteOne");

//get prescriptions

const getAllprescriptions = async (req, res) => {
  const prescriptions = await Prescription.find().populate([
    "customer_id",
    "drugs_ids",
  ]);
  res.status(200).json({
    prescriptions,
  });
};

//create prescription

const createprescription = async (req, res) => {
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
      Prescription
    );
    customer.prescreptions_ids.push(result._id); // the prescription id to the customer profile or DB in this case
    await customer.save();
    res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// update prescription

const updateprescription = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const prescription = await fetchOne({ _id: req.body.id }, Prescription);
  if (req.body?.price) prescription.price = req.body.price;
  if (req.body?.drugNames) {
    const drugs = [];
    const keys = Object.keys(req.body.drugNames); // returns the indecis of the values in the requist
    for (let i = 0; i < keys.length; i++) {
      const drug = await fetchOne({ name: req.body.drugNames[i] }, Drug); // get the name of the drug based on the index stored in keys
      drugs.push(drug._id);
    }
    prescription.drugs_ids = drugs;
  }
  try {
    const result = await prescription.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete prescription

const deleteprescription = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const result = await customeDeleteOne({ _id: req.body.id }, Prescription);
  if (result) {
    return res.status(400).json({ message: "No prescription was Found" });
  }
  res.status(200).json(result);
};
const getprescriptionById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "No ID was provided" });
  }
  const result = await Prescription.findOne({ _id: req.params.id }).populate([
    "customer_id",
    "drugs_ids",
  ]);
  res.status(200).json(result);
};

module.exports = {
  getAllprescriptions,
  createprescription,
  updateprescription,
  deleteprescription,
  getprescriptionById,
};
