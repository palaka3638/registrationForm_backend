const formService = require("../service/service");
const register = async (req, res) => {
    try {
        console.log(req.body);
      const response = await formService.registerUser(req.body).then((response)=>{
            // console.log(response1, 'response from service');
        return res.status(123).send(response)
      })
    }catch (error) {
      console.log('Error')
      throw error
    }
  }
  const getUsers = async (req, res) => {
    try {
      const response = await formService.getAllUsers();
      res.status(200).send(response);
      // console.log("************response**********", response);
    } catch (error) {
      console.error("Error in getting users: ", error);
      res.status(500).send({ error: "Internal Server Error", message: error.message });
    }
  };
  const deleteUser = async(req,res)=>{
    try {
      const userId = req.params.id;
      const response = await formService.deleteUser(userId)
      if(!response){
        return res.status(404).send({message:"Failed"})
      }
      return res.status(200).send({message:"Deleted"})

    } catch (error) {
      console.log(error,"Error in deleting user")
      return res.status(500).send({message:"Internal Server Error"})

    }
  }
  const editUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const userDataToUpdate = req.body;
  
      const response = await formService.editUser(userId, userDataToUpdate);
      
      if (!response) {
        return res.status(404).send({ message: "User not found" });
      }
      console.log(response,"response controller")
      return res.status(200).send({ message: "User updated successfully" });
    } catch (error) {
      console.log("Error in editing user:", error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
  module.exports={register,getUsers,deleteUser,editUser}