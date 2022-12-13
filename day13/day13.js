const fs = require('fs');

// If both values are integers, the lower integer should come first.
// If the left integer is lower than the right integer, the inputs are in the right order.
// If the left integer is higher than the right integer, the inputs are not in the right order.
// Otherwise, the inputs are the same integer; continue checking the next part of the input.

// If both values are lists, compare the first value of each list, then the second value, and so on.
// If the left list runs out of items first, the inputs are in the right order. 
// If the right list runs out of items first, the inputs are not in the right order.
// If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.

// If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison.
// For example, if comparing [0,0,0] and 2, convert the right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0] and [2].

const comparePair = (left, right) => {
    if(Number.isInteger(left) && Number.isInteger(right)) {
      return left - right;
    } else if(Number.isInteger(left) && Array.isArray(right)) {
      left = [left];
    }else if(Array.isArray(left) && Number.isInteger(right)) {
      right = [right];
    }

    //Both arrays
    for(let index = 0; index < left.length; index++) {
      if(index >= right.length) {
        return 1;
      } else {
        const result = comparePair(left[index], right[index]);
        if (result !== 0) {
          return result;
        }
      }
    }

    if(left.length === right.length) {
      return 0;
    } else {
      return -1;
    }
}

const solve = () => {
  let allPairs = [];
  let pairs = fs.readFileSync("input.txt").toString().split("\n\n").map((pair, index) => {
    let splitted = pair.split("\n");
    return {"left": JSON.parse(splitted[0]), "right": JSON.parse(splitted[1]), sumIndex: index + 1};
  });

  let validPairs = pairs.filter((pair) => {
    allPairs.push(pair.left, pair.right);
    return comparePair(pair.left, pair.right) < 0;
  });



  console.log("part1: ", validPairs.reduce((sum, itr) => sum + itr.sumIndex, 0));

  const firstDivider = [[2]];
  const secondDivider = [[6]];

  allPairs.push(firstDivider);
  allPairs.push(secondDivider);
  allPairs.sort( comparePair );
  
  const firstDividerIndex = allPairs.indexOf(firstDivider) + 1;
  const secondDividerIndex = allPairs.indexOf(secondDivider) + 1;

  console.log("part2: ", firstDividerIndex * secondDividerIndex);
}

solve();

//5043
//27690