const fs = require('fs');


const getPairs = () => {
  return fs.readFileSync('input.txt')
  .toString().split('\n');
}



const isCovered = (pair) => {
  const splittedPair = pair.toString().split(',');
  const firstElfValues = splittedPair[0].toString().split('-'); 
  const secondElfValues = splittedPair[1].toString().split('-');

  if(checkIfFullyInside(firstElfValues, secondElfValues) || checkIfFullyInside(secondElfValues, firstElfValues)) {
    return true
  }

  return false;
}

const checkIfFullyInside = (firstElf, secondElf) => {
  if(parseInt(firstElf[0]) >= parseInt(secondElf[0]) && parseInt(firstElf[1]) <= parseInt(secondElf[1])){
    return true
  } 
  return false;
}

const checkOverLap = (firstElf, secondElf) => {
  let isBothSmaller = parseInt(firstElf[0]) < parseInt(secondElf[0]) && parseInt(firstElf[1]) < parseInt(secondElf[0]);
  let isBothBigger = parseInt(firstElf[0]) > parseInt(secondElf[1]) && parseInt(firstElf[1]) < parseInt(secondElf[1]);
  if(isBothSmaller || isBothBigger){
    return false
  } 
  return true
}

const isOverlapping = (pair) => {
  const splittedPair = pair.toString().split(',');
  const firstElfValues = splittedPair[0].toString().split('-'); 
  const secondElfValues = splittedPair[1].toString().split('-');

  if(checkOverLap(firstElfValues, secondElfValues) && checkOverLap(secondElfValues, firstElfValues)) {
    return true
  }
  
  return false;
}


const solveFirst = () => {
  const pairs = getPairs();
  let fullyCoveredCount = 0;

  for(let i = 0; i < pairs.length; i++) {
    if (isCovered(pairs[i])) {
      fullyCoveredCount++;
    }
  }

  return fullyCoveredCount;
}


const solveSecond = () => {
  const pairs = getPairs();
  let overlapsCount = 0;

  for(let i = 0; i < pairs.length; i++) {
    if(isOverlapping(pairs[i])) {
      overlapsCount++;
    }
  }

  return overlapsCount;
}

console.log(solveFirst());
console.log(solveSecond());