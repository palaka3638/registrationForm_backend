const controller = require("../controller/controller");
const express = require("express");

let router = express.Router();

router.get("/getallusers", controller.getUsers);
router.post("/register", controller.register);
router.put("/edituser/:id", controller.editUser)
router.delete("/deleteuser/:id", controller.deleteUser)

module.exports = router;
