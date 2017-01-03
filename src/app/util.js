module.exports = {// Returns a random integer between min (included) and max (included)
  // Using Math.round() will give you a non-uniform distribution!
  getRandomIntInclusive: function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  //An array for the random colors
  colors: ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"]
}
