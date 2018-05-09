var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104497f3c17fa1e5b0b0_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/eb3db8072cf2023ed1584d05fb1d4e97e07ee3d21cac104497f3c17fa1e5b0b0_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8314/7968774876_11eafbfbb7.jpg"},
        {name: "Salmon Creek", image: "https://pixabay.com/get/e835b20e29f7083ed1584d05fb1d4e97e07ee3d21cac104497f3c17fa1e5b0b0_340.jpg"},
        {name: "Granite Hill", image: "https://pixabay.com/get/eb3db8072cf2023ed1584d05fb1d4e97e07ee3d21cac104497f3c17fa1e5b0b0_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8314/7968774876_11eafbfbb7.jpg"}
    ]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("landing");  
});

app.get("/campgrounds", function(req, res){
   res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds pagecd
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp app has started!");
});