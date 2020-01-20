const fs = require("fs");
const readline = require("readline");

let readFile = file => {
  return new Promise((resolve, reject) => {
    let lines = [];
    let readStream = fs.createReadStream(file);
    let reader = readline.createInterface({ input: readStream });

    reader.on("line", line => {
      if (line.trim()) lines.push(line);
    });

    reader.on("close", () => {
      resolve(lines);
    });
  });
};

function calculateHours(start, end) {
  const [startHrs, startMins] = start.split(":");
  const [endHrs, endMins] = end.split(":");

  const hrs = parseFloat(endHrs) - parseFloat(startHrs);
  const mins = parseFloat(endMins) - parseFloat(startMins);

  return hrs + mins / 60;
}

function rowParser(row) {
  const [id, rate, company, date, start, end] = row.split(",");
  const hours = calculateHours(start.trim(), end.trim());
  const parsedRate = parseFloat(rate.trim());
  return {
    id: id.trim(),
    company: company.trim().toLowerCase(),
    rate: parsedRate,
    hours,
    cost: hours * rate,
    date: date.trim(),
    start: start.trim(),
    end: end.trim()
  };
}

function billCreator(path, cb) {
  readFile(path).then(data => {
    data.shift(); // remove the first row
    const parsedData = data.map(rowParser);
    const database = {};
    for (log of parsedData) {
      const company = log.company;
      if (!database[company]) {
        database[company] = [log];
      } else {
        database[company].push(log);
      }
    }

    const finalMap = {};

    Object.keys(database).forEach(company => {
      let db = { [company]: [] };
      for (const log of database[company]) {
        const employeeRecordIndex = db[company].findIndex(
          employee => employee.id === log.id
        );
        if (employeeRecordIndex > -1) {
          const record = db[company][employeeRecordIndex];
          const newHours = log.hours + record.hours;
          db[company][employeeRecordIndex] = {
            ...record,
            hours: newHours,
            cost: record.cost + log.cost
          };
        } else {
          db[company].push({
            id: log.id,
            hours: log.hours,
            rate: log.rate,
            cost: log.cost
          });
        }
      }
      finalMap[company] = db[company];
    });

    // console.log(JSON.stringify(results, null, 2));

    cb(finalMap);
  });
}

module.exports = {
  billCreator
};
