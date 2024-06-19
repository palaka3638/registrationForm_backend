const connectionDB = require("../db/db.js");
const bcrypt = require('bcrypt');

const registorUser = async (data, res) => {
    try {
        const [response] = await connectionDB.promise().query("Insert into RegisterationForm.student SET ?", data)
        if (response) {
            console.log(response)
        }
        else {
            console.log(error)
        }
        return {
            status: 200,
            message: "Query executed successfully, student have been registered.",
        }
    } catch (error) {
        console.log('error!!!!!',error);
        return {
            status: 404,
            message: "student already exists!!!",
        }
        // console.log('Error', error)
        // throw "Error while entering user data, may be dupilcate data issue"
    }
}
async function getUserByEmail(email) {
    let partialResponse = {
        message: '',
        user: null

    }
    const response = await connectionDB.promise().query("select * from student where email=?", [email], (errorr, results) => {
        // console.log(email,"%%%%%%%%")
        
        if (errorr) {
            console.log("--Error--", errorr);
        }
        else {
            console.log(results.length, "LENGTH OF THE RESuLT")
            // console.log(results,'results');
            if (results.length === 1) {
                partialResponse.message='already exist';
            }
        }
    })
    // console.log(response,"######################");
    partialResponse.user = response[0].length>0 ?response[0]:null
    return partialResponse
}
module.exports={registorUser,getUserByEmail}