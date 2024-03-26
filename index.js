var express = require('express');
var AES = require('./aes');
var app = express();

app.listen(3000, function () {

    const keyText = "Thats my Kung Fu";

    // Thực hiện phần mở rộng khóa
    new AES("da", keyText);
});