const Router = require("express");
const userController = require("../controller/userController");



const router = Router();


router.get("/", userController.getHome);
router.post('/search', userController.postSearch);
router.post("/subscribe", userController.postSubscribe);
router.get("/about", userController.getAbout);
router.get("/:id", userController.getBlog);





module.exports = router;