const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Matkhau@123',
    database: 'baomat'
});
connection.connect();

const { sampleData } = require('./sample_data');

// create table if not exists
connection.query(
    'CREATE TABLE IF NOT EXISTS users (citizenIdentificationCard VARCHAR(255) PRIMARY KEY, userName VARCHAR(255), password VARCHAR(255), gender VARCHAR(255), dateOfBirth VARCHAR(255), address VARCHAR(255), phoneNumber VARCHAR(255))'
    , function (err, results) {
        if (err) {
            return console.log(err.message);
        }

        console.log("Create table users success");

        let isErrorOccurred = false;

        // insert sample data
        sampleData.forEach(user => {
            const { userName, password, citizenIdentificationCard, gender, dateOfBirth, address, phoneNumber } = user;

            // insert user to database
            const query = `INSERT INTO users (citizenIdentificationCard, userName, password, gender, dateOfBirth, address, phoneNumber) VALUES ('${citizenIdentificationCard}', '${userName}', '${password}', '${gender}', '${dateOfBirth}', '${address}', '${phoneNumber}')`;

            connection.query(query, function (err) {
                if (err) {
                    isErrorOccurred = true;
                    // console.log(err.message);
                    return;
                }
            });
        });

        if (!isErrorOccurred) {
            console.log("Insert sample data success");
        }
    }
);

module.exports = {
    connection
}