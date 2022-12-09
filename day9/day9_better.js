const fs = require('fs');

//rope can move only one coord at a time
const  directions = {
  U: [0, 1],
  D: [0, -1],
  L: [-1, 0],
  R: [1, 0]
}

const solve = (knotCount) => {
 const dirAndLengths = fs.readFileSync('input.txt').toString().split('\n');
 
  // create rope coordinates
 let rope = Array.from({length: knotCount}, () => [0,0]);
 let visitedPoints = {};
  dirAndLengths.map(move => {
    let dir = move.split(' ')[0];
    let length = parseInt(move.split(' ')[1]);
    
    //Make move for every length
    for(let i = 0; i < length; i++) {
      //Move the head first
      //point is the value for x or y
      //index is the pointer for the x or y
      rope[0] = rope[0].map((point, index) => point + directions[dir][index]);
      //move the point
      for(let j = 1; j < knotCount; j++) {
        /// test that if the some point of the rope is further away then move 
        if (rope[j-1].some((point, index) => Math.abs(point-rope[j][index]) > 1)) {
          rope[j] = rope[j].map((point, index) => point + Math.sign(rope[j-1][index]-point));
        }
      }

      //lastly mark the tail position
      visitedPoints[rope[knotCount -1]] = true;
    }

  });


  console.log(Object.keys(visitedPoints).length);
}

solve(2);
solve(10);