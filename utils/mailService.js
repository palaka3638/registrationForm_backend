const nodemailer = require("nodemailer");

module.exports.otpFunc = async (obj) => await transporter.sendMail(obj);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "kaur.palakpreet3316@gmail.com",
    pass: "ixhjikmxtehmytbp",
  },
});
