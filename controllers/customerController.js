const Customer = require("../model/Customer");
const createObject = require("../services/customeCreate");
const getObjects = require("../services/customeFetchAll");

// get all customers

const getAllCustomers = async (req, res) => {
  const customers = await getObjects(Customer,false);
  res.status(200).json(customers);
};

// create a new customer

const createCustomer = async (req, res) => {
  if (
    !req?.body?.firstName ||
    !req?.body?.lastName ||
    !req?.body?.nationalNumber
  ) {
    return res
      .status(400)
      .json({ message: "FirstName ,LastName and/or nationalNumber are empty" });
  }
  const customerExists = await Customer.findOne({
    nationalNumber: req.body.nationalNumber,
  }).exec();
  if (customerExists) {
    return res.status(400).json({ message: "Customer Already Exists" });
  }
  try {
    const result = await createObject({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phone: parseInt(req.body.phone),
      nationalNumber: req.body.nationalNumber,
    },Customer);
    res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// update an existing customer

const updateCustomer = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No Customer ID was provided" });
  }
  const customer = await Customer.findOne({ _id: req.body.id }).exec();
  if (req.body?.firstName) customer.firstName = req.body.firstName;
  if (req.body?.lastName) customer.lastName = req.body.lastName;
  if (req.body?.address) customer.address = req.body.address;
  if (req.body?.phone) customer.phone = req.body.phone;
  if (req.body?.nationalNumber)
    customer.nationalNumber = req.body.nationalNumber;
  if (req.body?.prescription_id)
    customer.prescreptions_ids.push(req.body.prescription_id);
  const result = await customer.save();
  res.status(200).json(result);
};

//delete customer

const deleteCustomer = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "No Customer ID was provided" });
  }
  const customer = await Customer.findOne({ _id: req.body.id }).exec();
  if (!customer) {
    return res
      .status(204)
      .json({ message: `Customer ID : ${req.body.id} Not found!` });
  }
  const result = await Customer.deleteOne({ _id: req.body.id });
  res.status(200).json(result);
};

// get customer by id

const getCustomerById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "No Customer ID was provided" });
  }
  const customer = await Customer.findOne({ _id: req.params.id }).populate("prescreptions_ids").exec();
  if (!customer) {
    return res
      .status(204)
      .json({ message: `Customer ID : ${req.params.id} Not found!` });
  }
  res.status(200).json(customer);
};

module.exports = {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
};
