const express = require("express");
const router = express.Router();
const customerController = require("../../controllers/customerController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),
    customerController.getAllCustomers
  )
  .post(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    customerController.createCustomer
  )
  .put(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    customerController.updateCustomer
  )
  .delete(verifyRoles(ROLES_LIST.Admin), customerController.deleteCustomer);

router.get(
  "/:id",
  verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),
  customerController.getCustomerById
);

module.exports = router;
