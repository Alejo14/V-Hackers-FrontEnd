var express = require('express');
var app = express();

app.use(express.static("app"));

app.get('/inicio/principal', function (req, res) {
    res.redirect('/inicio/principal');
});

app.listen(8070, 'localhost');
console.log("MyProject Server is Listening on port 8070");
