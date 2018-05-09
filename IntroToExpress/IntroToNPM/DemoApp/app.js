var express = require("express");
var app = express();

// "/" => "Hi there!"
app.get("/", function(req, res) {
   res.send("Hi there!"); 
});

// "/bye" => "Goodbye!"

// "/dog" => "MEOW!"

// Tell Express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!");
});