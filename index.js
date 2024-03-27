var express = require('express');
var AES = require('./aes');
var app = express();

app.listen(3000, function () {
    const keyText = "Thats my Kung Fu";
    const aes = new AES(keyText)
    const state = aes.encrypt("Two One Nine Two");
    aes.decrypt(state);
});