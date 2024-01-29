const express = require("express");
const router = express.Router();
const prescriptionController = require("../../controllers/prescriptionController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),
    prescriptionController.getAllprescriptions
  )
  .post(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    prescriptionController.createprescription
  )
  .put(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    prescriptionController.updateprescription
  )
  .delete(verifyRoles(ROLES_LIST.Admin), prescriptionController.deleteprescription);

router.get(
  "/:id",
  verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),
  prescriptionController.getprescriptionById
);

module.exports = router;