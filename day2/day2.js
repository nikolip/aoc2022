const fs = require('fs');



const calculateBattlePoints = (me, opponent) => {
  if(me == opponent) {
    return 3;
  }
  if(me == "A" ) {
    return rockInput(opponent);
  }
  if(me == "B") {
    return paperInput(opponent);
  }
  if(me == "C") {
    return scissorInput(opponent);
  }
}

const rockInput = (second) => {
  switch(second) {
    case "B":
      return 0;
    case "C":
      return 6;
  }
}
const paperInput = (second) => {
  switch(second) {
    case "A":
      return 6;
    case "C":
      return 0;
  }
}
const scissorInput = (second) => {
  switch(second) {
    case "A":
      return 0;
    case "B":
      return 6;
  }
}



const decisionPoints = (input) => {
  switch(input) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
    default: 
      return 0;
  }
} 

const transformDecision = (input) => {
  switch(input) {
    case "X":
      return "A";
    case "Y":
      return "B";
    case "Z":
      return "C";
    default: 
      return input;
  }
}

const calculateRoundPoints = (opponent, me) => {
  let meReal = transformDecision(me);
  let points = 0;
  points += decisionPoints(meReal);
  points += calculateBattlePoints(meReal, opponent); 
  return points;
}
const chooseMyPick = (opponent, result) => {
  if(result == "Y") {
    return opponent;
  }

  if(result == "X") {
    return getLosingPick(opponent);
  }

  return getWinningPick(opponent);
}

const getLosingPick= (opponent) => {
  switch(opponent) {
    case "A":
      return "C";
    case "B":
      return "A";
    case "C":
      return "B";
  }
}

const getWinningPick= (opponent) => {
  switch(opponent) {
    case "A":
      return "B";
    case "B":
      return "C";
    case "C":
      return "A";
  }
}

const points = fs.readFileSync('input.txt')
.toString().split('\n')
.map((x) => {
  let inputs = x.toString().split(" ")
  return calculateRoundPoints(inputs[0], inputs[1]);
}).reduce((sum, y) => sum + y, 0) ;


const realPoints = fs.readFileSync('input.txt')
.toString().split('\n')
.map((x) => {
  let inputs = x.toString().split(" ")
  let myPick = chooseMyPick(inputs[0], inputs[1]);
  console.log(myPick);
  return calculateRoundPoints(inputs[0], myPick);
}).reduce((sum, y) => sum + y, 0) ;

console.log(points);
console.log(realPoints);
