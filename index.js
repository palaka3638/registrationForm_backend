const express = require("express");
// const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const router = require("../RegFormBackend/routes/route");
const connectionDB = require("./db/db");
const path = require("path");
// const Joi = require("joi");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/", router);


  // const JoiSchema = Joi.object({
  //   f_name: Joi.string().min(3).max(20).required(),
  //   l_name: Joi.string().min(5).max(20).required(),
  //   email: Joi.string()
  //     .pattern(
  //       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]{1,3})+$/
  //     )
  //     .email()
  //     .required(),
  //   gender: Joi.string().required(),
  //   contact: Joi.string()
  //     .length(10)
  //     .required()
  //     .pattern(/[6-9]{1}[0-9]{9}/),
  //   d_o_b: Joi.date().greater(new Date("1940-01-01")).required(),
  //   designation: Joi.string().required(),
  //   hobbies: Joi.string().required(),
  //   password: Joi.string().pattern( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@.#$!%*?&])(?!.*\s).{8,}$/).required(),
  //   confirmPassword:Joi.ref('password')
  // });


// const validateRequest = (JoiSchema) => {
//   return (req, res, next) => {
//     const result = Joi.validate(req.body, JoiSchema);
//     if (result.error) {
//       return res.status(400).json({
//         error: result.error.details[0].message,
//       });
//     }
//     if (!req.value) {
//       req.value = {};
//     }
//     req.value['body'] = result.value;
//     next();
//   };
// };

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});