var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the DB
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong!");
//     } else {
//         console.log("we just saved a cat to the DB:");
//         console.log(cat);
//     }
// });

Cat.create({
  name: "yolo",
  age: 2,
  temperament: "lmao"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
        console.log("======================")
        listCats();
    }
});

//retrieve all cats from the DB and console.log each one

function listCats() {

    Cat.find({}, function(err, cats){
        if(err){
            console.log("Oh no, error!");
            console.log(err);
        } else {
            console.log("All the cats...");
            console.log(cats);
        }
    });

}