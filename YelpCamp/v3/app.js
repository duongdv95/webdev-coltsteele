var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req,res){
  res.render("landing");  
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("index",{campgrounds:allCampgrounds});
       }
    });
//   res.render("campgrounds",{campgrounds:campgrounds});
});

// Create - add campground to database
app.post("/campgrounds", function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    createCampground(name, image, description);
    // redirect back to campgrounds pagecd
    res.redirect("/campgrounds");
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
   res.render("new.ejs");
});

// SHOW - show information about specific campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            console.log(foundCampground);
            res.render("show",{campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp app has started!");
});

function createCampground(name, image, description) {
    Campground.create(
        {
            name: name,
            image: image,
            description: description
        }, 
        function(err, campground){
            if(err){
                console.log(err);
            } else{
                console.log("new created campground: ");
                console.log(campground);
            }
        }
    );
}
