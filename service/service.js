const formRepository = require("../repository/repository");
const bcrypt = require("bcrypt");
const mailService = require("../utils/mailService");
const registerUser = async (registerUserData) => {
  try {
    let password = registerUserData?.password;
    let user = await formRepository.getUserByEmail(registerUserData?.email);
    // console.log(user,'outside user');
    if (user.user) {
      return { status: 404, message: "user already exists!!!!!" };
    }

    const hashPassword = await bcrypt.hash(password, 10); //here 10 is salt rounds
    const registerData = {
      f_name: registerUserData?.fname,
      l_name: registerUserData?.lname,
      gender: registerUserData?.gender,
      email: registerUserData?.email,
      contact: registerUserData?.contact,
      d_o_b: registerUserData?.dob,
      designation: registerUserData.designation,
      hobbies: registerUserData.hobbies,
      password: hashPassword,
    };
    const response1 = await formRepository.registorUser(registerData);
    const mail = {
      from: "welcome@resend.com",
      to: registerUserData.email,
      subject: "Thanks for Registering with us",
      html: `<p>Dear User, You have been successfully registered with us. Keep chilling.</p>`,
    };
    console.log(response1, "email registered generated");
    const result = await mailService.otpFunc(mail);
    console.log(result, "result in mail registereation");
    return { status: 200, message: "user register successfully!!!!!" };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
};
