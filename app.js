var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
var port = process.enc.PORT || 1422;
app.listen(port);