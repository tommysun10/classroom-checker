const fullData = require('./full.json');

// const room = "Snell Library 031";
const room = "Snell Library 033"

// Simplifies data to only active classes that are not online

const classes = {}

const sectionMap = fullData["sectionMap"];

Object.keys(sectionMap).forEach(function(key) {
    if (!sectionMap[key]["online"]) {
        classes[key] = sectionMap[key]
    }
})

// Returns crns and latest class times

const crns = [];

const classTimes = {};

const latestTime = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0
};

// Gets the classes from the given room
Object.keys(classes).forEach(function(key) {
  classes[key]["meetings"].map(function(obj) {
    if (obj["where"] === room) {
      crns.push(classes[key]["crn"]);
      classTimes[key] = obj
    }
  });
});

// Gets the ending time of the last class in that room
Object.keys(classTimes).forEach(function(key) {
    Object.keys(classTimes[key]["times"]).forEach(function(day) {
        latestTime[day] = Math.max(latestTime[day], classTimes[key]["times"][day][0]["end"])
    })
})

// Converts seconds to hour
Object.keys(latestTime).forEach(function(day) {
    latestTime[day] = new Date(latestTime[day] * 1000).toISOString().substr(11, 8);
})

// Show crns and times
console.log("crns: " + crns);
console.log(JSON.stringify(latestTime));