const summer2 = require("./201960.json");
const summerfull = require("./201950.json");

// fall: "10",
// spring: "30",
// summer1: "40",
// summer2: "60",
// summerfull: "50"

////////////////////////////////////////////
// const room = "Snell Library 031";
const room = "Snell Library 031";
////////////////////////////////////////////

const classes = {};

const crns = [];

const classTimes = {};

const latestTime = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0
};

// Simplifies data to only active classes that are not online
function simplifyData(semester) {
  const simplify = semester["sectionMap"];
  Object.keys(simplify).forEach(function(key) {
    if (!simplify[key]["online"]) {
      classes[key] = simplify[key];
    }
  });
}

// Returns crns and latest class times
function getClasses() {
  // Gets the classes from the given room
  Object.keys(classes).forEach(function(key) {
    classes[key]["meetings"].map(function(obj) {
      if (obj["where"] === room) {
        crns.push(classes[key]["crn"]);
        classTimes[key] = obj;
      }
    });
  });
}

function getEndTimes() {
  // Gets the ending time of the last class in that room
  Object.keys(classTimes).forEach(function(key) {
    Object.keys(classTimes[key]["times"]).forEach(function(day) {
      latestTime[day] = Math.max(
        latestTime[day],
        classTimes[key]["times"][day][0]["end"]
      );
    });
  });
}

function convertToSeconds() {
  // Converts seconds to hour
  Object.keys(latestTime).forEach(function(day) {
    latestTime[day] = new Date(latestTime[day] * 1000)
      .toISOString()
      .substr(11, 8);
  });
}

function doAll() {
  simplifyData(summer2);
  getClasses();
  getEndTimes();

  simplifyData(summerfull);
  getClasses();
  getEndTimes();

  convertToSeconds();
}

doAll();

// Show crns and times
console.log("crns: " + crns);
console.log(JSON.stringify(latestTime));
