var express = require("express");
var app = express();
var animalList = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof woof!",
    duck: "Quack!",
    frog: "Ribbit!"
};

// visiting "/" should print "hi there, welcome to my assignment"
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

// visting "/speak/animal" should print "the animal says sound"
app.get("/speak/:animal", function(req, res) {
   var selected = req.params.animal.toLowerCase();
   res.send("The " + req.params.animal + " says " + animalList[selected]);
});

// visiting "/repeat/string/number" should print string*number
app.get("/repeat/:string/:number", function(req, res) {
   var times = Number(req.params.number);
   var phrase = req.params.string;
   var completePhrase = "";
   for (var i = 0; i < times; i++) {
       completePhrase += phrase + " ";
   }
   res.send(completePhrase);
});
// Handles any wrong addresses
app.get("*", function(req, res){
    res.send("Sorry page not found...");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!");
});