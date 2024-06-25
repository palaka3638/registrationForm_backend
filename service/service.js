const formRepository = require("../repository/repository");
const bcrypt = require("bcrypt");
const mailService = require("../utils/mailService");

const registerUser = async (registerUserData) => {
  try {
    let password = registerUserData?.password;
    let user = await formRepository.getUserByEmail(registerUserData?.email);

    // Check if user already exists
    if (user && user.user) {
      return { status: 400, message: "User already exists!" };
    }

    let hobbiesArray = [];
    if (registerUserData?.hobbies) {
      hobbiesArray = registerUserData.hobbies.map(hobby => hobby.trim());
    }

    const hashPassword = await bcrypt.hash(password, 10); // Salt rounds 10

    const registerData = {
      f_name: registerUserData?.f_name,
      l_name: registerUserData?.l_name,
      gender: registerUserData?.gender,
      email: registerUserData?.email,
      contact: registerUserData?.contact,
      countryCode: registerUserData?.countryCode,
      d_o_b: registerUserData?.d_o_b,
      designation: registerUserData.designation,
      hobbies: JSON.stringify(hobbiesArray),
      password: hashPassword,
    };

    const response1 = await formRepository.registorUser(registerData); 

    // Send registration email
    const mail = {
      from: "mailto:welcome@resend.com", 
      to: registerUserData.email,
      subject: "Thanks for Registering with us",
      html: `<p>Dear User, You have been successfully registered with us. Stay Updated!.</p>`,
    };

    const result = await mailService.otpFunc(mail); 

    return { status: 200, message: "User registered successfully!" };

  } catch (error) {
    console.error("Error in registerUser service:", error);
    throw error; // Throw the error to handle it at the higher level or log it
  }
};

const getAllUsers = async () => {
  try {
    const response = await formRepository.getUsersDetails();
    // console.log('------------getAll users from service:-------------', response)
    return response;
  } catch (error) {
    console.log("Error while getting users from service: ", error);
    throw error;
  }
};
const deleteUser = async (userId) => {
  try {
    const response = await formRepository.deleteUser(userId);
    if (!response) {
      return { status: 404, message: "Failed to delete user (service)" };
    }
    return { status: 200, message: "User deleted successfully" };
  } catch (error) {
    console.log(error, "Error in deleteUser service");
    throw error;
  }
};
const editUser = async (userId, userDataToUpdate) => {
  console.log(userDataToUpdate,"<--------------service userdATA---")
  try {
    const response = await formRepository.editUser(userId, userDataToUpdate);
    if (!response) {
      return { status: 404, message: "User not found" };
    }
    console.log("response from edit service", response)
    return { status: 200, message: "User updated successfully" };
  } catch (error) {
    console.error("Error in editUser service:", error);
    throw error;
  }
};
module.exports = {
  registerUser,getAllUsers,deleteUser,editUser
};


