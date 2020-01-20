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
    // remove the first row
    data.shift();
    // convert to useful form
    const parsedData = data.map(rowParser);

    // arrange records according to companies
    const companyDatabase = {};
    for (record of parsedData) {
      const company = record.company;
      if (!companyDatabase[company]) {
        companyDatabase[company] = [record];
      } else {
        companyDatabase[company].push(record);
      }
    }

    const finalMap = {};

    Object.keys(companyDatabase).forEach(company => {
      let temporalDB = { [company]: [] };
      let totalHours = 0;
      let totalCost = 0;
      for (const record of companyDatabase[company]) {
        // we find records by id
        const employeeRecordIndex = temporalDB[company].findIndex(
          employee => employee.id === record.id
        );
        // if they exist, we merge their details
        if (employeeRecordIndex > -1) {
          const oldRecord = temporalDB[company][employeeRecordIndex];
          const newHours = record.hours + oldRecord.hours;
          const newCost = record.cost + oldRecord.cost;
          temporalDB[company][employeeRecordIndex] = {
            ...oldRecord,
            hours: newHours,
            cost: newCost
          };
          totalHours += record.hours;
          totalCost += record.cost;
        } else {
          // else we create a fresh entry
          temporalDB[company].push({
            id: record.id,
            hours: record.hours,
            rate: record.rate,
            cost: record.cost,
            key: record.id
          });
          totalHours += record.hours;
          totalCost += record.cost;
        }
      }
      // after sorting for a particular company, sort it and store it
      finalMap[company] = {
        totalCost,
        totalHours,
        logs: temporalDB[company].sort((a, b) => {
          return parseFloat(a.id) - parseFloat(b.id);
        })
      };
    });

    // pass the final object to a callback
    cb(finalMap);
  });
}

module.exports = {
  billCreator
};
