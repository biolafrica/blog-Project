const Router = require("express");
const adminController = require('../controller/adminController');

const router = Router();
router.get("/", adminController.adminRegGet);
router.get("/create", adminController.adminCreateGet);
router.get("/logout", adminController.adminLogout);
router.post("/create", adminController.adminCreatePost);
//router.post("/", userController.adminRegPost);
router.post("/", adminController.adminLogPost);
router.get("/home", adminController.adminHomeGet);
router.get("/edit/:id", adminController.adminEditGet);
router.put("/edit/:id", adminController.adminEditPut);
router.get("/delete/:id", adminController.adminEditDelete);



module.exports = router;