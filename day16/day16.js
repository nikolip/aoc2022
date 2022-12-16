const fs = require('fs');

const getValves = () => {
 let valves = fs.readFileSync("input.txt").toString().split("\n").map((line) => {
    let splitted = line.split(" ");
    let name = splitted[1];
    let flowRate = Number(splitted[4].split("=")[1].replace(";", ""));
    let leadsTo = line.split("to")[1].split(" ").map(valve => valve.replace(",","")).filter(valve => {
      if(valve == "" || valve == "valves" || valve == "valve") {
        return false
      }
      return true;
    } );

    return {name, flowRate, leadsTo} 
  }).reduce((obj, valve) => ({ ...obj, [valve.name]: valve }), {});
  Object.values(valves).forEach(valve => {
    valve.paths = Object.values(valves)
      .filter(({ name }) => name !== valve.name)
      .map(({ name }) => ({ name, distance: getShortestPath(valves, valve, name) }));
  });
  return valves;
}

const getShortestPath = (valves, valve, name) => {
  const que = [{name: valve.name, steps: 0}];
  const visited = new Set(`${valve.name},0`);

  while(que.length > 0) {
    const cur = que.shift();
    if(cur.name == name) {
      return cur.steps
    };
    const nextTo = valves[cur.name].leadsTo
      .map(name => ({name, steps: cur.steps +1}))
      .filter(x => !visited.has(`${x.name},${x.steps}`));
      nextTo.forEach(x => visited.add(`${x.name},${x.steps}`));
      que.push(...nextTo)
  }
}

const getNextValve = (valves, current, time, pressure, openValves, elephant) => {
  if (time <= 0) {
    return pressure;
  }

  const ff =  valves[current].paths
  .filter(({ name, distance }) => !openValves.has(name) && time > distance)
  .flatMap(({name, distance})  => {
    const nextOpen = new Set(openValves).add(name);
    const nextPressure = pressure + valves[name].flowRate * (time - distance -1);

    return [
      getNextValve(valves, name, time - distance - 1 , nextPressure, nextOpen, elephant),
      elephant && getNextValve(valves, "AA", 26, nextPressure, nextOpen, !elephant)
    ]
  });

  return Math.max(pressure, ...ff);
}


const solveFirst = () => {
  let valves = getValves();

  let openValves = Object.keys(valves).filter(v => valves[v].flowRate == 0);
  
  console.log(getNextValve(valves, "AA", 30, 0, new Set(openValves), false));
}


const solveSecond = () => {
  let valves = getValves();

  let openValves = Object.keys(valves).filter(v => valves[v].flowRate == 0);
    
  console.log(getNextValve(valves, "AA", 26, 0, new Set(openValves), true));
}

//solveFirst();
solveSecond();