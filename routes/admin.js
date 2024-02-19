const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController")
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");


router.route('/addEditor').post(verifyRoles(ROLES_LIST.Admin),adminController.giveEditorPrivlages)
router.route('/addAdmin').post(verifyRoles(ROLES_LIST.Admin),adminController.giveAdminPrivlages)
router.route('/rvkEditor').post(verifyRoles(ROLES_LIST.Admin),adminController.revokEditorPrivlages)
router.route('/rvkAdmin').post(verifyRoles(ROLES_LIST.Admin),adminController.revokAdminPrivlages)

module.exports = router