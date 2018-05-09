function average(array) {
    var total = 0;
    for(var i = 0; i < array.length; i++) {
        total += array[i];
    }
    var averageScore = Math.round(total/array.length);
    return averageScore;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
var x = average(scores);
console.log(x);
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
var y = average(scores2);
console.log(y);