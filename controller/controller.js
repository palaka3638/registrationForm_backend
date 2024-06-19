const formService = require("../service/service");
const register = async (req, res) => {
    try {
        console.log(req.body);
      const response = await formService.registerUser(req.body).then((response)=>{
            // console.log(response1, 'response from service');
        return res.status(response.status).send(response)
      })
    }catch (error) {
      console.log('Error')
      throw error
    }
  }
  module.exports={register}