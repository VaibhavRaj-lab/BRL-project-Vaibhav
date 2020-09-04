var express = require("express");
var app = express();
var port = 2701;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://vaibhav:vaibhav@cluster0-shard-00-00.rk1ef.mongodb.net:27017,cluster0-shard-00-01.rk1ef.mongodb.net:27017,cluster0-shard-00-02.rk1ef.mongodb.net:27017/vaibhav?ssl=true&replicaSet=atlas-7mghhz-shard-0&authSource=admin&retryWrites=true&w=majority",{ useUnifiedTopology: true, useNewUrlParser:true});
var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});
var User = mongoose.model("User", UserSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/addnameandemail", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("Name saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
