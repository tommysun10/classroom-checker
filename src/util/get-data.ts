import axios from "axios";

const fetchData = async () => {
  const date = new Date();
  const year = date.getFullYear() + 1;
  const month = date.getMonth();

  const semesterKey = getSemesterKey(month);
  const url =
    "https://searchneu.com/data/v2/getTermDump/neu.edu/" +
    year +
    semesterKey +
    ".json";

  const data = await axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "true",
      "Content-Type": "application/json"
    }
  });

  if (data || data === {}) return {};

  const classes = validateClasses(data);

  return classes;
};

// Using the current month, return the correct semester key
const getSemesterKey = (month: number) => {
  if (month >= 0 && month < 4) {
    return 30;
  } else if (month >= 4 && month < 6) {
    return 40;
  } else if (month >= 6 && month < 8) {
    return 60;
  } else if (month >= 8 && month <= 11) {
    return 10;
  } else {
    return 0;
  }
};

// Remove classes that do not need a classroom
const validateClasses = (data: any) => {
  let classes: any = {};
  Object.keys(data["sectionMap"]).forEach(key => {
    if (!data["sectionMap"][key]["online"]) {
      classes[key] = data["sectionMap"][key];
    }
  });
  return classes;
};

// Given a classroom, find the classes
const findClassesByClassroom = (allClasses: any, classroom: string) => {
  let validClasses: any = {};
  Object.keys(allClasses).forEach(singleClass => {
    Object.keys(allClasses[singleClass]["meetings"]).forEach((meeting: any) => {
      if (allClasses[singleClass]["meetings"][meeting]["where"] === classroom) {
        Object.keys(
          allClasses[singleClass]["meetings"][meeting]["times"]
        ).forEach(dayOfWeek => {
          if (validClasses[dayOfWeek]) {
            validClasses[dayOfWeek].concat(
              allClasses[singleClass]["meetings"][meeting]["times"][dayOfWeek]
            );
          } else {
            validClasses[dayOfWeek] =
              allClasses[singleClass]["meetings"][meeting]["times"][dayOfWeek];
          }
        });
      }
    });
  });
  return validClasses;
};

export { findClassesByClassroom, fetchData, validateClasses };
