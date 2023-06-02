var fs = require("fs");
var jison = require("jison");

var parser = fs.readFileSync("./src/parser/index.js", "utf8");
console.log(parser);
module.exports = parser;