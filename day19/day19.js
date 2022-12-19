
const fs = require("fs");
const getBluePrints = () => {
 return  fs.readFileSync("input.txt").toString().split("\n").map(line => {
    return line.match(/\d+/g).map(Number);
  })
}


const part1 = () => {
  const blueprints = getBluePrints()

  let value = 0;
  for(let blueprint of blueprints) {
    value += blueprint[0] * getBluePrintValue(blueprint, 24);
  }
  console.log(value);
}





const part2 = () => {
  const blueprints = getBluePrints()

  let value = 1;
  for(let i = 0; i < 3; i++) {
    value *= getBluePrintValue(blueprints[i], 32);
  }
  console.log(value);
}



const getBluePrintValue = (blueprint, time) => {
  let maxRobots = {
    ore: Math.max(
        blueprint[1],
        blueprint[2],
        blueprint[3],
        blueprint[5]
    ),
    clay: blueprint[4],
  };


  let maxGeodes = 0;

  const calculateValue = (time, oreRobots, clayRobots, obsidianRobots, ore, clay, obsidian, geodes) => {
    
    if(time < 1) return;

    if(geodes > maxGeodes) {
      maxGeodes = geodes;
    }


    let canBuildGeode = blueprint[5] <= ore && blueprint[6] <= obsidian;
    let canBuildObsidian = blueprint[3] <= ore && blueprint[4] <= clay;
    let canBuildClay = blueprint[2] <= ore;
    let canBuildOre = blueprint[1] <= ore;


    //FIRST: builde geode robot if possible
    if(obsidianRobots > 0) {
   
      let timeCost = 1 + (canBuildGeode ? 0 : Math.max(
        Math.ceil((blueprint[5] - ore) / oreRobots),
        Math.ceil((blueprint[6] - obsidian) / obsidianRobots)
      ));
 
      calculateValue(
        time - timeCost,
        oreRobots,
        clayRobots,
        obsidianRobots,
        ore + timeCost * oreRobots - blueprint[5],
        clay + timeCost * clayRobots,
        obsidian + timeCost * obsidianRobots - blueprint[6],
        geodes + time - timeCost,
      );

      if(canBuildGeode) return;
    }

    //Check obsidian
    if(clayRobots > 0) {

      let timeCost = 1 + (canBuildObsidian ? 0 : Math.max(
        Math.ceil((blueprint[3] - ore) / oreRobots),
        Math.ceil((blueprint[4] - clay) / clayRobots),
      ));

      if(time - timeCost > 2) {
        calculateValue(
          time - timeCost,
          oreRobots,
          clayRobots,
          obsidianRobots + 1,
          ore + timeCost * oreRobots - blueprint[3],
          clay + timeCost * clayRobots - blueprint[4],
          obsidian + timeCost * obsidianRobots,
          geodes,
        );
      }
    }

    // build clay 
    if(clayRobots < maxRobots.clay) {
      let timeCost = 1 + (canBuildClay ? 0 : Math.ceil((blueprint[2] - ore) / oreRobots));
     
      if(time - timeCost > 3) {
        calculateValue(
          time - timeCost,
          oreRobots,
          clayRobots + 1,
          obsidianRobots,
          ore + timeCost * oreRobots - blueprint[2],
          clay + timeCost * clayRobots, 
          obsidian + timeCost * obsidianRobots,
          geodes
        )
      }
    }

    if(oreRobots < maxRobots.ore) {

      let timeCost = 1 + (canBuildOre ? 0 : Math.ceil((blueprint[1] - ore) / oreRobots));

      if(time - timeCost > 4) {
        calculateValue(
          time - timeCost,
          oreRobots + 1,
          clayRobots,
          obsidianRobots,
          ore + timeCost * oreRobots - blueprint[1],
          clay + timeCost * clayRobots,
          obsidian + timeCost * obsidianRobots,
          geodes,
        )
      }
    }
  }

  calculateValue(time, 1, 0, 0, 0, 0 , 0, 0);
  return maxGeodes;
}
 
part1();
part2()