const fs = require('fs');

let screen = Array.from({length: 6}, () => Array.from({length: 40}, () => "X"));

handleDraw = (X, index) => {
  let row = Number(((index-1)  / 40).toString()[0]);
  let pointer = index -1 - (row * 40);

  if(pointer == X || pointer-1 == X || pointer + 1 == X) {

    screen[row][index - 1 - row * 40] = "#";
  } else {
     
    screen[row][index - 1 - row * 40] = ".";
  }
} 

const handleCycles = (X, index, values) => {
  handleDraw(X, index);

  if(index == 20) {
    values.push(X * 20);
  } 
  if(index == 60) {
    values.push(X * 60);
  }
  if(index == 100) {
    values.push(X * 100);
  }
  if(index == 140) {
    values.push(X * 140);
  }
  if(index == 180) {
    values.push(X * 180);
  }
  if(index == 220) {
    values.push(X * 220);
  }

}
const solve = () => {
  const cycles = fs.readFileSync('input.txt').toString().split('\n');
  let cycleIndex = 1;
  const cyclesValues = [];
  let xValue = 1;
  cycles.map((cycle) => {
  

    const input = cycle.split(" ");

    if(input[0] == "noop") {
      handleCycles(xValue, cycleIndex, cyclesValues);
      cycleIndex++;
    } else {
      for(let i = 0; i < 2; i++) {
        handleCycles(xValue, cycleIndex, cyclesValues);
        cycleIndex++;
      }
      xValue +=  Number(input[1]);
    }
  });

  console.log(cyclesValues.reduce((sum, a) => sum + a, 0));
}
printScreen = () => {
  screenString = "";
  for(let i = 0; i < screen.length; i++) {
    for(let j = 0; j < screen[i].length; j++) {
      screenString += screen[i][j];
    }
    screenString += "\n";
  }
  console.log(screenString);
}


solve();
printScreen();
