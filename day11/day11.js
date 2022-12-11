

const fs = require('fs');

const doOperation = (operator, value, operationValue) => {
  switch(operator) {
    case "+":
      return value + operationValue;
    case "*":
      return value * operationValue;
  }
}


const twoMostActivMonkeys = (input) => {
    return input.reduce((acc, rec) => {
      return rec.inspectedCount > acc[1].inspectedCount ? [acc[1], rec] : rec.inspectedCount > acc[0].inspectedCount ? [rec, acc[1]] : acc
    }, [{inspectedCount: -1}, {inspectedCount: -1}])
}



const solve = (rounds, part) => {
  const monkeys = fs.readFileSync('input.txt').toString().split('\n\n').map((rawMonkey) => {
    const monkeyLines = rawMonkey.split("\n");
    const items = monkeyLines[1].split(":")[1].split(",").map((item) => Number(item.trim()));
    const operator = monkeyLines[2].split("=")[1].trim().split(" ")[1];
    const operatorValue = monkeyLines[2].split("=")[1].trim().split(" ")[2];
    const divider = Number(monkeyLines[3].split(":")[1].split(" ")[3]);
    const ifTrue = Number(monkeyLines[4].trim().split(" ")[5]);
    const ifFalse = Number(monkeyLines[5].trim().split(" ")[5]);
    const inspectedCount = 0;
    return {items, operator, operatorValue, divider, ifTrue, ifFalse, inspectedCount};
  });

  const commonProduct = monkeys
  .map(({ divider }) => divider)
  .reduce((acc, n) => acc * n);

  for(let i = 1; i <= rounds; i++) {
    for(let j = 0; j < monkeys.length; j++) {
      while(monkeys[j].items.length > 0) {
        let item = monkeys[j].items.pop();
        let operationValue = monkeys[j].operatorValue == "old" ? item : Number(monkeys[j].operatorValue);
 
        let newItem = doOperation(monkeys[j].operator, item, operationValue);
        if(part == 1) {
          newItem = Math.floor(newItem / 3);
        } else {        
          newItem = newItem % commonProduct
        }

        let testResult = newItem % monkeys[j].divider == 0;
        if(testResult) {
          monkeys[monkeys[j].ifTrue].items.push(newItem);
        } else {
          monkeys[monkeys[j].ifFalse].items.push(newItem);
        }
        monkeys[j].inspectedCount++;
      }
    }
  }
  const twoBiggest = twoMostActivMonkeys(monkeys);

  const value = twoBiggest.reduce((acc, rec) => acc * rec.inspectedCount, 1);
  console.log(value);

}


solve(20, 1);
solve(10000, 2);