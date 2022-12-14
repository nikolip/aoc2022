const fs = require('fs');


printCave = (cave) => {
  caveOutput = "";
  for(let i = 0; i < cave.length; i++) {
    for(let j = 0; j < cave[i].length; j++) {
      caveOutput += cave[i][j];
    }
    caveOutput += "\n";
  }
  console.log(caveOutput);
}


const solve = (floor) => {
  const caveSize = 450;
  const reduceFromXCoord = 300;
  const rocks = fs.readFileSync("input.txt").toString().split("\n");
  let cave =  Array.from({length: caveSize}, () => Array.from({length: caveSize}, () => "."));
  let deepestPoint = 0;
  // {x: <x.coord>, y: <y.coord>}
  let rockPaths = rocks.map((rock) => {
    let filteredPath = rock.split(" ").filter((path) => !isNaN(path[0]));
    return filteredPath.map((path) =>  {
      return {"x": Number(path.split(",")[0]) - reduceFromXCoord, "y": Number(path.split(",")[1])}
    });
  })


  for(let i = 0; i < rockPaths.length; i++) {
    for(let j = 0; j < rockPaths[i].length - 1; j++) {
      let start = rockPaths[i][j];
      let end  = rockPaths[i][j+1]
      
      if(start.x != end.x) {
        let lineLength = Math.abs(start.x - end.x);
        let dir = start.x - end.x > 0;
        for(let i = 0; i <= lineLength; i++) {
          if(dir) {
            cave[start.y][start.x - i] = "X";
          } else {
            cave[start.y][start.x + i] = "X";
          }
        }
      }else {
        let lineLength = Math.abs(start.y - end.y);
        let dir = start.y - end.y > 0;
        for(let i = 0; i <= lineLength; i++) {
          if(dir) {
            cave[start.y - i][start.x] = "X";
            if(deepestPoint < start.y-i) {
              deepestPoint = start.y-i;
            }
          } else {
            cave[start.y + i][start.x] = "X";
            if(deepestPoint < start.y+i) {
              deepestPoint = start.y+i;
            }
          }
        }
      }

    }
  }

  if(floor) {
   for(let i = 0; i < caveSize; i++) {
    cave[deepestPoint + 2][i] = "X"
   }
  }



  let canPour = true;
  let sandCount = 0;
  let fallBack = 100000;
  while(canPour && fallBack > 0) {
    let sand = {x: 500-reduceFromXCoord, y: 0};
    let canMove = true;
    
    while(canMove) {
      if(cave[0][500-reduceFromXCoord] == "o") {
        canMove = false;
        canPour = false;
        break;
      }
      if(cave[sand.y+1][sand.x] == ".") {
        sand.y++;
      }else if(cave[sand.y+1][sand.x] == "X" || cave[sand.y+1][sand.x] == "o") {
          if(cave[sand.y+1][sand.x-1] == ".") {
            sand.y++;
            sand.x--;
          } else if(cave[sand.y+1][sand.x+1] == ".") {
            sand.y++;
            sand.x++;
          }else {
            canMove = false;
          }
      }


      if(canMove == false) {
        cave[sand.y][sand.x] = "o";
      }
      if(sand.y + 1 == deepestPoint + 3 ){
        canMove = false;
        canPour = false;
      }
    }
    fallBack--;
    sandCount++;
  }


//printCave(cave);
console.log(sandCount - 1);

}

solve(false);
solve(true)