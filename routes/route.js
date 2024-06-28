const controller = require("../controller/controller");
const express = require("express");
const multer = require('multer');
const path = require('path');
const validateRequest = require('../middleware/validationMiddleware')
const JoiSchema = require('../middleware/validationMiddleware')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        const fileName = Date.now() + path.extname(file.originalname);
        cb(null, fileName);
        // Do not assign req.file here, instead multer handles this for you
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

let router = express.Router();

router.get("/getallusers", controller.getUsers);


router.post("/register", validateRequest(),(req,res)=>{res.json({
    message:'Successfully registered',
    data:req.value.body,
})},controller.register);


router.put("/edituser/:id", upload.single('fileImage'), (req, res, next) => {
    req.body.fileImage = req.file.filename; 
    controller.editUser(req, res, next);
});


router.delete("/deleteuser/:id", controller.deleteUser);

module.exports = router;
