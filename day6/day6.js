const fs = require('fs');

const getInput = () => {
  return fs.readFileSync('input.txt').toString();
}

const isUnique = (chars) => {
  for(let i = 0; i < chars.length; i++) {
    let amount = chars.match(new RegExp(chars[i], "g") || []).length;
    if(amount >= 2) {
     
      return false;
    }
  }
  console.log(chars);
  return true;
}


const getIndex = (input, uniqueCount) => {
  for(let i = 0; i < input.length; i++) {

    if(isUnique(input.substring(i, i + uniqueCount))) {
      return i;
    }
  }
  return -1;
}

const solveFirst = () => {
  const input = getInput();

  let i = getIndex(input, 4);

  console.log(i+4);
}


const solveSecond = () => {
  const input = getInput();

  let i = getIndex(input, 14);

  console.log(i+14);
}

solveFirst();
solveSecond();