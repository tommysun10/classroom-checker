import axios from 'axios';

const fetchData = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    const semesterKey = getSemesterKey(month);
    
    const url ='https://searchneu.com/data/v2/getTermDump/neu.edu/' + year + semesterKey
    const data = axios.get(url);

    if (!data) return {};

    const classes = validateClasses(data)

    return classes;
}

// Using the current month, return the correct semester key
const getSemesterKey = (month: number) => {
    if (month >= 0 && month <= 4) {
        return 30;
    } else if (month > 4 && month <= 6) {
        return 40;
    } else if (month > 6 && month <= 8) {
        return 60;
    } else if (month > 8 && month <= 11) {
        return 10;
    } else {
        return 0;
    }
}

// Remove classes that do not need a classroom
const validateClasses = (data: any) => {
    let classes: any = {};
    Object.keys(data["sectionMap"]).forEach( key => {
        if (!data[key]["online"]) {
            classes[key] = data[key]
        }
    })
    return classes;
}

export { fetchData }