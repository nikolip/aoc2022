const fs = require('fs');

//First solution was too slow for part 2 so had to create new solutions.
const getInput = () => {
  return fs.readFileSync("input.txt").toString().split("\n").map((line) => {
    const values =  line.split(" ");
    const sensor = {x: Number(values[2].split("=")[1].replace(",", "")), y: Number(values[3].split("=")[1].replace(":", ""))};
    const beacon = {x: Number(values[8].split("=")[1].replace(",", "")), y: Number(values[9].split("=")[1])}
    const distance = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y-beacon.y);
    return {sensor, beacon, distance};
  });

}

let getNotPossiblePoints = (y, sensor, distance) => {
  let notPossiblePoints = [];
  let yDifference = Math.abs(y - sensor.y);
  let leftDistance = distance - yDifference + 1;
  
  for(let i = 0; i < leftDistance; i++) {
    notPossiblePoints.push(sensor.x + i);
    notPossiblePoints.push(sensor.x - i);
  }
  return notPossiblePoints;
}



const part1 = () => {
  let notPossiblePoints = [];
  const sensors = getInput();
  for(let i = 0; i < sensors.length; i++) {
    let sensor = sensors[i].sensor;
    let distance = sensors[i].distance;
    notPossiblePoints = notPossiblePoints.concat(getNotPossiblePoints(2000000, sensor, distance));
  }

  notPossiblePoints = [... new Set(notPossiblePoints)];
  console.log(notPossiblePoints.length - 1);
}
containsAll = (arr, arr2) => arr2.every(v => arr.includes(v));


let getNotPossiblePointsFast = (y, sensor, distance) => {
  let width = distance - Math.abs(sensor.y - y);
  if (width < 0) return null;
  return [sensor.x - width, sensor.x + width];
}


const combineSectors = (sectors) => {
    sectors.sort((a, b) => a[0] - b[0]);
  
    const combined = [];
    let prev = sectors[0];

    for (let i = 0; i < sectors.length; i++) {
        let curr = sectors[i];
        if (prev[1] >= curr[0] - 1) {
          prev = [prev[0], Math.max(prev[1], curr[1])];
        } else {
          combined.push(prev);
          prev = curr;
        }
    }
    

    combined.push(prev);
    return combined;
}
const rowCoverage = (sensors, y) => {
  let sectors = [];
  for(let j = 0; j < sensors.length; j++) {
    let sensor = sensors[j].sensor;
    let distance = sensors[j].distance;
    let points = getNotPossiblePointsFast(y, sensor, distance);
    if(points) {
      sectors.push(points); 
    }

  }
  return combineSectors(sectors);
}

const part2 = (min, max) => {
  let x = 0;
  let y = 0;
  const sensors = getInput();  
  for(let i = min; i <= max; i++) {
    let rowSectors = rowCoverage(sensors, i);

    if(rowSectors.length > 1) {
      console.log((rowSectors[0][1] + 1) * 4000000 + i );
      break;
    }
  }
}

part1();
part2(0, 4000000);