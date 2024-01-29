const express = require("express");
const router = express.Router();
const prescreptionController = require("../../controllers/prescreptionController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),
    prescreptionController.getAllPrescreptions
  )
  .post(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    prescreptionController.createPrescreption
  )
  .put(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    prescreptionController.updatePrescreption
  )
  .delete(verifyRoles(ROLES_LIST.Admin), prescreptionController.deletePrescreption);

router.get(
  "/:id",
  verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),
  prescreptionController.getPrescreptionById
);

module.exports = router;