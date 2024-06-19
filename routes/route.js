
const controller = require("../controller/controller");
// const login = require("../controllers/controller")
const express = require("express")

let router = express.Router();

// router.get("/getallusers", controller.getUser)
router.post("/register", controller.register)



module.exports = router