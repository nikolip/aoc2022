const fs = require('fs');

const findItem = (firstBag, secondBag) => {
  // Find the same item
  for(let i = 0; i < firstBag.length; i++) {
    if(secondBag.includes(firstBag[i])) {
      return firstBag[i];
    }
  }
}

convertToValue=(char) => {
let isUpperCase = char >= 'A' && char <=  'Z';

  if(isUpperCase) {
    return char.charCodeAt(0) - 38;
  } 

  return char.charCodeAt(0) - 96;

}

const valueFirst = fs.readFileSync('input.txt')
  .toString().split('\n')
  .map((line) =>  {
    // Split string into equal parts
    let firstBag = line.substring(0, line.length/2);
    let secondBag = line.substring(line.length/2, line.length);
    
    // Find same item
    let item = findItem(firstBag, secondBag);
    
    // Get the value
    return convertToValue(item);
  }).reduce((sum, y) => sum + y, 0);


const valueSecond = () => {
  let lines = fs.readFileSync('input.txt')
      .toString().split('\n')
      .map((line) =>  {
        return line;
      });
  
  let value = 0;
  for (let i = 0; i < lines.length; i += 3) {
    // form sacks from group of three lines
    let sacks = lines.slice(i, i + 3).map((line) => [...line]);
    
    // start from the first letter 
    let common = sacks[0];

    // go through of all 
    for(let sack of sacks.slice(1)) {
      common = common.filter((char) => sack.includes(char));
    }
    
    value += convertToValue(common[0]);  
  }
  return value;
}

console.log(valueFirst);
console.log(valueSecond());