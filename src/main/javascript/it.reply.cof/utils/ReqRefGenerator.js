const crypto = require('crypto');

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}

let reqRefGenerator = (date) => {
    let randomstring = "";

    randomstring = date.substring(0,10);
    randomstring = randomstring.replace("-", "");
    randomstring = randomstring.replace("-", "");
    console.log('Subdate: ' + randomstring);
    for(let i = 0; i < 24; i++) {
        randomstring += randomInt(0, 9);
    }

    return randomstring;
}

console.log(reqRefGenerator(new Date().toISOString().substring(0, 23)))

module.exports = {

   generator : reqRefGenerator

}