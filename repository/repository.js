const connectionDB = require("../db/db.js");
const bcrypt = require('bcrypt');

const registorUser = async (data) => {
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
const getUsersDetails = async () => {
    try {
        let response = await connectionDB.promise().query(`SELECT * FROM student`);
        // console.log('response ', response )
        return response
    } catch (error) {
        console.error(error, "error while getting users");
        throw error;
    }
};
const deleteUser = async(id)=>{
    try {
        const [response]= await connectionDB.promise().query("DELETE FROM student WHERE id=?",[id])
        if(response.affectedRows>0){
            return {
                status:200,
                message: "User deleted successfully"
            }
         } else {
                return {
                    status:404,
                    message: "User Not found"
                }
            }
        
    } catch (error) {
        console.log(error, "Error in deleting user(repo)")
    }
}

const editUser = async (userId, userDataToUpdate) => {
    // console.log(userDataToUpdate,"userDataToUpdate in edit repo")
    try {
        // Check if userDataToUpdate has password field
        if (userDataToUpdate.password) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(userDataToUpdate.password, 10); // Salt rounds = 10

            // Update the password in userDataToUpdate with the hashed password
            userDataToUpdate.password = hashedPassword;
        }

        // Perform the database update
        const [response] = await connectionDB.promise().query("UPDATE student SET ? WHERE id = ?", [userDataToUpdate, userId]);
        
        if (response.affectedRows > 0) {
            return {
                status: 200,
                message: "User updated successfully",
            };
        } else {
            return {
                status: 404,
                message: "User not found",
            };
        }
    } catch (error) {
        console.error('Error in editUser repository:', error);
        throw error; // Throw the error to be caught by the service layer
    }
};

// const editUser = async (userId, userDataToUpdate) => {
//     try {
//         console.log('------------ userdata---------', userDataToUpdate)
//         const [response] = await connectionDB.promise().query("UPDATE student SET ? WHERE id = ?", [userDataToUpdate, userId]);
//         console.log("response from repo", response)
//         if (response.affectedRows > 0) {
//             return {
//                 status: 200,
//                 message: "User updated successfully",
//             };
//         } else {
//             return {
//                 status: 404,
//                 message: "User not found",
//             };
//         }
//     } catch (error) {
//         console.error('Error in editUser repository:', error);
//         throw error; // Throw the error to be caught by the service layer
//     }
// };

module.exports={registorUser,getUserByEmail,getUsersDetails,deleteUser,editUser}