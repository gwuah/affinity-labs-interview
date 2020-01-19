var data = [
  ["Writing Fast Tests Against Enterprise Rails", "60min"],
  ["Overdoing it in Python", "45min"],
  ["Lua for the Masses", "30min"],
  ["Ruby Errors from Mismatched Gem Versions", "45min"],
  ["Rails for Python Developers", "lightning"],
  ["Communicating Over Distance", "60min"],
  ["Accounting-Driven Development", "45min"],
  ["Woah", "30min"],
  ["Sit Down and Write", "30min"],
  ["Pair Programming vs Noise", "45min"],
  ["Rails Magic", "60min"],
  ["Ruby on Rails: Why We Should Move On", "60min"],
  ["Clojure Ate Scala (on my project)", "45min"],
  ["Programming in the Boondocks of Seattle", "30min"],
  ["Ruby vs. Clojure for Back-End Development", "30min"],
  ["Ruby on Rails Legacy App Maintenance", "60min"],
  ["A World Without HackerNews", "30min"],
  ["User Interface CSS in Rails Apps", "30min"]
];

function minuteExtractor(string) {
  if (string === "lightning") {
    return 5;
  }
  return parseFloat(string.split("m")[0]);
}

function createTrack() {
  return { morning: [], afternoon: [] };
}

// function timeParser(p, a) {
//     let prev = p
//     let addedMins = parseFloat(a)
// 	let totalHours = 0;
// 	let [hours, minutes] = [parseFloat(prev.split(":")[0]), parseFloat(prev.split(":")[1])]
// 	let meridian = "AM"

// 	function getMeridian(hrs) {
// 		if (hrs >= 12) {
// 			return [hrs - 12, "PM"]
// 		}
// 		return [hrs, "AM"]
// 	}

// 	var g = minutes + addedMins;
// 	var mod = g / 60;
// 	if (mod > 0) {
// 		var f = Math.floor(mod)
// 		const remainingMins = g - (60 * f )
// 		const newHrs = hours + f;
// 		const newMinutes = remainingMins
// 		let phrs = getMeridian(newHrs)[0].length === 1 ? `0${getMeridian(newHrs)[0]}` : getMeridian(newHrs)[0]
// 		return `${getMeridian(newHrs)[0]}:${newMinutes}${getMeridian(newHrs)[1]}`
// 	} else {
// 		let phrs = getMeridian(hours)[0].length === 1 ? `0${getMeridian(hours)[0]}` : getMeridian(hours)[0]
// 		return `${phrs}:${minutes}${getMeridian(hours)[1]}`
// 	}

// }

function timeParser(p, a) {
  let prev = p;
  let addedMins = parseFloat(a);
  let totalHours = 0;
  let [hours, minutes] = [
    parseFloat(prev.split(":")[0]),
    parseFloat(prev.split(":")[1])
  ];
  let meridian = "AM";

  function getMeridian(hrs) {
    if (hrs === 12) {
      return [hrs, "PM"];
    } else if (hrs >= 12) {
      return [hrs - 12, "PM"];
    }
    return [hrs, "AM"];
  }

  var g = minutes + addedMins;
  var mod = g / 60;
  if (mod > 0) {
    var f = Math.floor(mod);
    let remainingMins = g - 60 * f;
    let newHrs = hours + f;
    let newMinutes = remainingMins;
    let phrs =
      String(getMeridian(newHrs)[0]).length === 1
        ? `0${getMeridian(newHrs)[0]}`
        : getMeridian(newHrs)[0];
    newMinutes =
      String(newMinutes).length === 1 ? `0${newMinutes}` : newMinutes;
    return `${phrs}:${newMinutes}${getMeridian(newHrs)[1]}`;
  } else {
    let phrs =
      getMeridian(hours)[0].length === 1
        ? `0${getMeridian(hours)[0]}`
        : getMeridian(hours)[0];
    minutes = String(g).length === 1 ? `0${g}` : g;
    console.log(minutes);

    return `${phrs}:${minutes}${getMeridian(hours)[1]}`;
  }
}

function arranger(data) {
  let maximumMinsPerDay = 420;
  let sortedByTime = {};
  let totalMins = 0;
  let morningSessionMins = 180;
  let eveningSessionMins = 420 - 180;
  let trackDb = {};

  for (const talk of data) {
    const [title, raw_time] = talk;
    const parsedTime = minuteExtractor(raw_time);
    if (sortedByTime[parsedTime]) {
      sortedByTime[parsedTime].push(title);
    } else {
      sortedByTime[parsedTime] = [title];
    }

    totalMins += parsedTime;
  }

  const commonMins = Object.keys(sortedByTime)
    .sort()
    .reverse();

  let maxNumberOfTracks = Math.ceil(totalMins / maximumMinsPerDay);

  // for (let i = 0; i < maxNumberOfTracks; i++) {
  // 	const trackNumber = i + 1;
  // 	let localCounter = maxNumberOfTracks;
  // 	let startTime
  // 	trackDb[trackNumber] = createTrack()

  // 	while (localCounter > 0) {

  // 	}

  // }

  let mm = [];

  for (const min of commonMins) {
    const lunch = 180;
    const network = 420;
    const localCounter = 0;
    while (localCounter < maximumMinsPerDay) {
      mm.push({
        name: ""
      });
    }
  }
}
