const fs = require('fs');

const a1 = fs.readFileSync('input.txt')
  .toString().split('\n\n')
  .map((x) => 
    x
       .split(/[^0-9]/)
       .filter((y) => y !== '')
       .reduce((sum, y) => sum + parseInt(y), 0)
  )
  .sort((a, b) => a - b)
  .reverse();

const a2 = a1[0] + a1[1] + a1[2];

console.log(a1[0]);
console.log(a2);


