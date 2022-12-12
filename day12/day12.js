const fs = require('fs');



const directions = {
  "D": [0, -1],
  "U": [0, 1],
  "L": [-1, 0],
  "R": [1, 0]
}



const search_path = (map, start, end) => {
  let bestPath = [];
  let moveQueue = [];
  let visited = [`${start.x}-${start.y}`];


  moveQueue.push([start]);

  while(moveQueue.length > 0 && bestPath.length == 0) {
    let path = moveQueue.shift();
    let currentPosition = path[path.length - 1];

    let moves = [
      { x: currentPosition.x + 1, y: currentPosition.y },
      { x: currentPosition.x, y: currentPosition.y + 1 },
      { x: currentPosition.x - 1, y: currentPosition.y },
      { x: currentPosition.x, y: currentPosition.y - 1 }
    ];

    for(let move of moves) {
      if(move.x < 0 || move.x >= map[0].length  ||
        move.y < 0 || move.y >= map.length  ||
        visited.includes(`${move.x}-${move.y}`) ||
        map[move.y][move.x] - map[currentPosition.y][currentPosition.x] > 1) {
        continue;
     }


      if(move.x == end.x && move.y == end.y) {
        bestPath = path.concat([end]);
      }
      
      visited.push(`${move.x}-${move.y}`);
      moveQueue.push(path.concat([move]));
    }
  }

  return bestPath.length - 1;
}

const solve = () => {
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };

  const heightMap = fs.readFileSync('input.txt').toString().split("\n").map((line, y) => {
     return line.split("").map((char, x) => {
        if(char == "S") {
          start.x = x;
          start.y = y;
          return "a".charCodeAt(0);
        }

        if(char == "E") {  
          end.x = x;
          end.y = y;
          return "z".charCodeAt(0);
        }
        return char.charCodeAt(0);
     })
  });

  console.log(search_path(heightMap, start, end));
}


const solveSecond = () => {
  let start = { x: 0, y: 0 };
  let end = { x: 0, y: 0 };

  const heightMap = fs.readFileSync('input.txt').toString().split("\n").map((line, y) => {
     return line.split("").map((char, x) => {
        if(char == "S") {
          start.x = x;
          start.y = y;
          return "a".charCodeAt(0);
        }

        if(char == "E") {  
          end.x = x;
          end.y = y;
          return "z".charCodeAt(0);
        }
        return char.charCodeAt(0);
     })
  });

  const startPoints = []
   
  heightMap.map((row, index) => {
    for(var i = 0; i < row.length; i++) {
      if( row[i] == "a".charCodeAt(0)) {
        startPoints.push({x: i, y: index});
      }
    }
  });

  points = startPoints.map((start) => {
    return  search_path(heightMap, start, end); 
  }).filter(point => point != -1);

  console.log(Math.min(...points));
}


solve();
solveSecond();