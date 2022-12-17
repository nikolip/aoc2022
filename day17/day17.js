const fs = require('fs');

const rockTypes = [
  [[0,0],[1,0],[2,0],[3,0]],
  [[1,0],[1,1],[0,1],[2,1],[1,2]],
  [[2,2],[2,1],[2,0],[1,0],[0,0]],
  [[0,0],[0,1],[0,2],[0,3]],
  [[0,0],[0,1],[1,0],[1,1]],
];

//keeps track of the height at the spot;
let line = [[],[],[],[],[],[],[]];

const solve = (rockCount, pattern) => {
  let maxHeight = -1;
  let jetId = 0;
  
  for(let i = 0; i < rockCount; i++) {
    let rock = rockTypes[i%5].map(x =>[x[0]+2,x[1]+maxHeight+4]);
    //Move until in rest
    while(true) {
      let jet = pattern[(jetId++)%pattern.length];
      let newRock;

      if(jet == "<") {
        newRock = rock.map(x=>[x[0]-1,x[1]]);
      }else {
        newRock = rock.map(x=>[x[0]+1,x[1]]);
      }

      //check if new rock
      let replicateRock = true;
      for(let c of newRock) {
        if(c[0]<0 || c[0]>=7 || line[c[0]][c[1]]) {
          replicateRock = false;
        }
      }

      if(replicateRock) {
        rock = newRock;
      }

      newRock = rock.map(x=>[x[0], x[1]-1]);

      let finished = false;
      for(let c of newRock) {
        if(c[1]<0 || line[c[0]][c[1]]) {
          finished = true;
        }
      }
      if(finished) {
        for (let c of rock) {
          line[c[0]][c[1]] = 1;
          if(c[1] > maxHeight) {
            maxHeight = c[1]
          }
        }
        break;
      } else {
        rock = newRock;
      }
    }

  }
  return maxHeight + 1;
}

const pattern = fs.readFileSync("test.txt").toString().trim();
//console.log(solve(2022, pattern));
console.log(solve(1000000000000, pattern));