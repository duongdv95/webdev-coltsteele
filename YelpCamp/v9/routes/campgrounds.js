var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
// INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});

// CREATE - add campground to database
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {id: req.user._id, username: req.user.username}
    var newCampground = {
            name: name,
            image: image,
            description: description,
            author: author
        }
    createCampground(newCampground);
    console.log(req.user);
    // redirect back to campgrounds pagecd
    res.redirect("/campgrounds");
});

// NEW - display form to create new campground
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new");
});

// SHOW - show information about specific campground
router.get("/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            // console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});



function createCampground(newCampground) {
    Campground.create(newCampground, 
        function(err, campground){
            if(err){
                console.log(err);
            } else{
                // console.log("new created campground: ");
                console.log(campground);
            }
        }
    );
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;