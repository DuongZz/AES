var dot = require('dotenv')
dot.config();
var express = require('express');
var AES = require('./aes');
var app = express();

AES.init(process.env.SECRET_KEY || "Thats my Kung Fu");

app.listen(3000, function () {
    const cipherText = AES.encrypt("Two One Nine Two");
    AES.decrypt(cipherText);
});