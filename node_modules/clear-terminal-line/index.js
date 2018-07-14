"use strict";

var csi = require("control-sequence-introducer");

// cursor will not change
function clearLineString() {
  return csi + "2" + "K"
}
// cursor will not change
function clearRestOfLineString() {
  return csi + "0" + "K"
}
// cursor will not change
function clearBegOfLineString() {
  return csi + "1" + "K"
}

function clearLine(type) {
  // Default type if none provided.
  type = type || "entire";

  switch(type){
    case 'bol':
      process.stdout.write(clearBegOfLineString())
      break;
    case 'eol':
      process.stdout.write(clearRestOfLineString())
      break;
    case 'entire':
      process.stdout.write(clearLineString())
      break;
    default:
      throw new Error("Must provide a valid type")
  }
}

module.exports = clearLine;
