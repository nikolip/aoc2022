const fs = require('fs');

const getCratesAndCommands = () => {
  return fs.readFileSync('input.txt').toString().split('\n\n');
}

moveCrate = (crates, command) => {
  const amountOfCrates =  command.toString().split(' ')[1];
  const from = parseInt(command.toString().split(' ')[3]) - 1;
  const to = parseInt(command.toString().split(' ')[5]) - 1;

  for(let i = 0; i < amountOfCrates; i++) {
    let value = crates[from].shift();
    crates[to].unshift(value);
  }
  return crates;
  
}

moveCrateWith9001 = (crates,command) => {
  const amountOfCrates =  command.toString().split(' ')[1];
  const from = parseInt(command.toString().split(' ')[3]) - 1;
  const to = parseInt(command.toString().split(' ')[5]) - 1;

  values = crates[from].splice(0, amountOfCrates);
  crates[to].unshift(...values);
 
  return crates; 
}

getVerticalStacks = (crates) => {
  let verticalStacks = [[],[],[],[],[],[],[],[],[]];
  let lines = crates.toString().split('\n');
  for(let i = 0; i < lines.length; i++) {
    let markCount = 35;
    let j = 0;
    for(let k = 0; k < markCount; k+=4) {
      let value = lines[i].substring(k+1, k+2);
      if(value != ' ' && isNaN(value)) {
        verticalStacks[j].push(value);
      }
      j++;
    }
  }

return verticalStacks;
}

const getTopCrates = (crates) => {
  for(let i = 0; i < crates.length; i++) {
    console.log(crates[i][0]);
  }
}
const solveFirst = () => {

  let crates = getCratesAndCommands()[0];
  let listOfCommands = getCratesAndCommands()[1];

  let verticalStacks = getVerticalStacks(crates);
    
  let commands = listOfCommands.toString().split('\n');
  for(var i = 0; i < commands.length; i++) {
    verticalStacks = moveCrate(verticalStacks, commands[i]);
  }
 
  getTopCrates(verticalStacks);
}

const solveSecond = () => {

  let crates = getCratesAndCommands()[0];
  let listOfCommands = getCratesAndCommands()[1];

  let verticalStacks = getVerticalStacks(crates);
    
  let commands = listOfCommands.toString().split('\n');
  for(var i = 0; i < commands.length; i++) {
    verticalStacks = moveCrateWith9001(verticalStacks, commands[i]);
  }

  
  getTopCrates(verticalStacks);
}

solveFirst();
console.log("--")
solveSecond();
