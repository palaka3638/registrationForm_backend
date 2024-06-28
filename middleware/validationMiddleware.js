//joi is a popular library for server side validations in node.js
const Joi = require("joi");

//below is the object created as schema for validations with different fields.
let JoiSchema = Joi.object({
  f_name: Joi.string().min(3).max(20).required(),
  l_name: Joi.string().min(5).max(20).required(),
  email: Joi.string()
    .pattern(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]{1,3})+$/
    )
    .email()
    .required(),
  gender: Joi.string().required(),
  contact: Joi.string()
    .length(10)
    .required()
    .pattern(/[6-9]{1}[0-9]{9}/),
  d_o_b: Joi.date().greater(new Date("1940-01-01")).required(),
  designation: Joi.string().required(),
  hobbies: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@.#$!%*?&])(?!.*\s).{8,}$/)
    .required(),
  confirmPassword: Joi.ref("password"),
});

//middleware for validating the request
const validateRequest = () => {
  return (req, res, next) => {
    console.log("midleware @1", req.body);
    const result = JoiSchema.validate(req.body);
    if (result.error) {
      return res.status(400).json({
        error: result.error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value["body"] = result.value;
    next();
  };
};
module.exports = validateRequest;
