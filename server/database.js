const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Duck130603@",
  database: "aes",
});
connection.connect();

const { sampleData } = require("./sample_data");

// setup thuật toán mã hóa
var AES = require("./aes");

// create table if not exists
connection.query(
  "CREATE TABLE IF NOT EXISTS users (citizenIdentificationCard VARCHAR(255) PRIMARY KEY, userName VARCHAR(255), password VARCHAR(255), gender VARCHAR(255), dateOfBirth VARCHAR(255), address VARCHAR(255), phoneNumber VARCHAR(255))",
  function (err, results) {
    if (err) {
      return console.log(err.message);
    }

    console.log("Create table users success");

    let isErrorOccurred = false;

    // insert sample data
    sampleData.forEach((user) => {
      const {
        userName,
        password,
        citizenIdentificationCard,
        gender,
        dateOfBirth,
        address,
        phoneNumber,
      } = user;

      const encryptedData = {};
      encryptedData.encryptedUserName = AES.encrypt(userName, password);
      encryptedData.encryptedPassword = AES.encrypt(password, password);
      encryptedData.encryptedGender = AES.encrypt(gender, password);
      encryptedData.encryptedDateOfBirth = AES.encrypt(dateOfBirth, password);
      encryptedData.encryptedAddress = AES.encrypt(address, password);
      encryptedData.encryptedPhoneNumber = AES.encrypt(phoneNumber, password);

      // insert user to database ( mã hóa dữ liệu trước khi insert vào db )
      const query = `INSERT INTO users (citizenIdentificationCard, userName, password, gender, dateOfBirth, address, phoneNumber) VALUES ('${citizenIdentificationCard}', '${encryptedData.encryptedUserName}', '${encryptedData.encryptedPassword}', '${encryptedData.encryptedGender}', '${encryptedData.encryptedDateOfBirth}', '${encryptedData.encryptedAddress}', '${encryptedData.encryptedPhoneNumber}')`;

      connection.query(query, function (err) {
        if (err) {
          isErrorOccurred = true;
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
  connection,
};
