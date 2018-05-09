var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res){
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
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    // find and udpate the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere(show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
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

module.exports = router;
