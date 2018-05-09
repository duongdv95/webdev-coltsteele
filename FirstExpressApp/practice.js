var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req,res) {
    res.send("Hi there!");
})

// "/bye" => "Goodbye!"
app.get("/bye", function(req, res) {
    res.send("Goodbye!!");
})
// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    console.log("Someone made a request to /dog!!")
    res.send("MEOW!");
})

app.get("/r/:subredditName", function(req, res){
    console.log(req.params);
    var subreddit = req.params.subredditName;
    res.send("welcome to the " + subreddit.toUpperCase() + " subreddit!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    res.send("welcome to comments page");
});
// catch all if user enters wrong address
app.get("*", function(req, res) {
    res.send("404 error");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!");
})