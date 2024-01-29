const express = require("express");
const router = express.Router();
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");
const drugController = require("../../controllers/drugController");

router.route("/")
  .get(drugController.getAllDrugs)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    drugController.addDrug
  ).put(
    verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin),
    drugController.updateDrug
  )
  .delete(verifyRoles(ROLES_LIST.Admin), drugController.deleteDrug);
router.get(
  "/:id",
  verifyRoles(ROLES_LIST.User, ROLES_LIST.Editor, ROLES_LIST.Admin),
  drugController.getDurgById
);

module.exports = router;
