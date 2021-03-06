const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UserController = require("../controllers/UserController")

router.get("/", HomeController.index);
router.post("/user", UserController.create)
router.get("/user", UserController.index)
router.get("/user/:id", UserController.findUser)
router.put("/user/:id", UserController.edit)

module.exports = router;