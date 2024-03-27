var dot = require('dotenv')
dot.config();
var express = require('express');
var AES = require('./aes');
var app = express();

AES.init(process.env.SECRET_KEY || "1234567890abcdef");

app.listen(3000, function () {
    const cipherText = AES.encrypt("Có mã hóa được Tiếng Việt không?");
    AES.decrypt(cipherText);
});