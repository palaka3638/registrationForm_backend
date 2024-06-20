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
      html: `<p>Dear User, You have been successfully registered with us. Stay Tuned!.</p>`,
    };
    console.log(response1, "email registered generated");
    const result = await mailService.otpFunc(mail);
    console.log(result, "result in mail registereation");
    return { status: 200, message: "user register successfully!!!!!" };
  } catch (error) {
    console.log(error);
  }
};
const getAllUsers = async () => {
  try {
    const response = await formRepository.getUsersDetails();
    // console.log('service:', response)
    return response;
  } catch (error) {
    console.log("Error while getting users from service: ", error);
    throw error;
  }
};
const deleteUser =async(userId)=>{
  try {
    const response =await formRepository.deleteUser(userId);
    if(!response){
      return {status:404, message:"Failed to delete user (service)"}
    }
    return {status:200,message:'User deleted successfully'}
  } catch (error) {
    console.log(error,"Error in deleteUser service");
    throw error;
  }
}
const editUser = async (userId, userDataToUpdate) => {
  try {
    const response = await formRepository.editUser(userId, userDataToUpdate);
    if (!response) {
      return { status: 404, message: "User not found" };
    }
    console.log("response from service", response)
    return { status: 200, message: "User updated successfully" };
  } catch (error) {
    console.error("Error in editUser service:", error);
    throw error;
  }
};
module.exports = {
  registerUser,getAllUsers,deleteUser,editUser
};


/**
 * edit 
 * - check if user exists with the new email (service check user existacne based on mail)
 * - user alreday exists --> cannot use this mail, already exists user
 * - else, {all fields : update them in db }
 * - return response 
 */