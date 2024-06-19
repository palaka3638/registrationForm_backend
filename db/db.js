const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "RegisterationForm",

});
//Below code is for connecting database 
connection.connect(function (err) {
    if (err) throw err;
    console.log("database*connected!")
})

module.exports = connection


