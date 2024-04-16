var dot = require('dotenv')
dot.config();

var express = require('express');
var app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

// khởi tạo db
const { connection } = require('./database');

// setup thuật toán mã hóa
var AES = require('./aes');

// api
app.post('/auth/sign-up', function (req, res) {

    const { userName, password, citizenIdentificationCard, gender, dateOfBirth, address, phoneNumber } = req.body;

    const encryptedData = {};
    encryptedData.encryptedUserName = AES.encrypt(userName, password);
    encryptedData.encryptedPassword = AES.encrypt(password, password);
    encryptedData.encryptedGender = AES.encrypt(gender, password);
    encryptedData.encryptedDateOfBirth = AES.encrypt(dateOfBirth, password);
    encryptedData.encryptedAddress = AES.encrypt(address, password);
    encryptedData.encryptedPhoneNumber = AES.encrypt(phoneNumber, password);

    // insert user to database
    const query = `INSERT INTO users (citizenIdentificationCard, userName, password, gender, dateOfBirth, address, phoneNumber) 
        VALUES ('${citizenIdentificationCard}', '${encryptedData.encryptedUserName}', '${encryptedData.encryptedPassword}', 
        '${encryptedData.encryptedGender}', '${encryptedData.encryptedDateOfBirth}', '${encryptedData.encryptedAddress}', 
        '${encryptedData.encryptedPhoneNumber}')`;

    connection.query(query, function (err, results, fields) {
        if (err) {
            // check if user exists
            if (err.errno === 1062) {
                res.status(500).send("Người dùng đã tồn tại");
            } else {
                res.status(500).send("Sign up failed");
            }
            return console.log(err.message);
        }

        console.log("Insert user success");
        res.status(200).send("Sign up success");
    });
});

app.post('/auth/sign-in', function (req, res) {
    const { citizenIdentificationCard, password } = req.body

    const encryptedPassword = AES.encrypt(password, password);

    const query = `SELECT * FROM users WHERE citizenIdentificationCard='${citizenIdentificationCard}' AND password='${encryptedPassword}'`;

    connection.query(query, function (err, results) {
        if (err) {
            res.status(500).send("Sign in failed");
            return console.log(err.message);
        }
        if (results.length === 0) {
            res.status(403).send("Tài khoản hoặc mật khẩu không đúng");
            return;
        }
        const getAllUsersQuery = `SELECT * FROM users`;
        connection.query(getAllUsersQuery, function (err, results) {
            if (err) {
                res.status(500).send("Get users failed");
                return console.log(err.message);
            }

            const users = results.map(user => {

                const isCurrentUser = user.citizenIdentificationCard === citizenIdentificationCard;

                return {
                    citizenIdentificationCard: user.citizenIdentificationCard,
                    userName: isCurrentUser ? AES.decrypt(user.userName, password) : '*****',
                    password: isCurrentUser ? AES.decrypt(user.password, password) : '*****',
                    gender: isCurrentUser ? AES.decrypt(user.gender, password) : '*****',
                    dateOfBirth: isCurrentUser ? AES.decrypt(user.dateOfBirth, password) : '*****',
                    address: isCurrentUser ? AES.decrypt(user.address, password) : '*****',
                    phoneNumber: isCurrentUser ? AES.decrypt(user.phoneNumber, password) : '*****'
                }
            });

            res.status(200).send(users);
        });
    });
});

app.get('/user/fetch-all-users/:userId', function (req, res) {

    const userId = req.params.userId;

    const query = `SELECT 
        citizenIdentificationCard, 
        CASE WHEN citizenIdentificationCard = '${userId}' THEN userName ELSE '*****' END AS userName,
        CASE WHEN citizenIdentificationCard = '${userId}' THEN password ELSE '*****' END AS password, 
        CASE WHEN citizenIdentificationCard = '${userId}' THEN gender ELSE '*****' END AS gender, 
        CASE WHEN citizenIdentificationCard = '${userId}' THEN dateOfBirth ELSE '*****' END AS dateOfBirth, 
        CASE WHEN citizenIdentificationCard = '${userId}' THEN address ELSE '*****' END AS address, 
        CASE WHEN citizenIdentificationCard = '${userId}' THEN phoneNumber ELSE '*****' END AS phoneNumber 
        FROM users`;

    connection.query(query, function (err, results) {
        if (err) {
            res.status(500).send("Get users failed");
            return console.log(err.message);
        }

        res.status(200).send(results);
    });
});

app.listen(8080, function () {
    // const cipherText = AES.encrypt("Có mã hóa được Tiếng Việt không?", "ddderredsds");
    // const plainText = AES.decrypt(cipherText, "ddderredsds");
    // console.log("plainText: ", plainText);
    console.log('Example app listening on port 8080!');
});