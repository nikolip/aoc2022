const fs = require('fs');

const getMoves = () => {
  return fs.readFileSync('input.txt').toString().split('\n');
}

const getTestMoves = () => {
  return fs.readFileSync('test.txt').toString().split('\n');
}

const getNewPositions = (currentHeadPosition, currentTailPosition, direction, jumpLength, knots) => {
  let tPosition = currentTailPosition;
  let hPosition = currentHeadPosition;
  let tPositions = [tPosition];

  while(jumpLength != 0) {
    switch(direction) {
      case "R":
        hPosition = {...hPosition, x: hPosition.x + 1};
        break;
      case "D":
        hPosition = {...hPosition, y: hPosition.y - 1};
        break;
      case "L":
        hPosition = {...hPosition, x: hPosition.x - 1};
        break;
      case "U":
        hPosition = {...hPosition, y: hPosition.y + 1};
        break;
    }
    tPosition = getNewTailPosition(hPosition, tPosition);
    tPositions.push(tPosition);
    jumpLength--;
  }
  return {hPosition, tPosition, tPositions};
}

const calculateNewY = (h, t) => {
  let yDist = h.y - t.y;
  if(Math.abs(yDist) <= 1) {
    return t.y
  }

  if(yDist < 0) {
    let newY = t.y;
    while(Math.abs(h.y - newY) > 1) {
      newY--;
    }
    return newY;
  }

  if(yDist > 0) {
    let newY = t.y;
    while(Math.abs(h.y - newY) > 1) {
      newY++;
    }
    return newY;
  }
} 

const calculateNewX = (h, t) => {
  let xDist = h.x - t.x;
  if(Math.abs(xDist) <= 1) {
    return t.x
  }

  if(xDist < 0) {
    let newX = t.x;
    while(Math.abs(h.x - newX) > 1) {
      newX--;
    }
    return newX;
  }

  if(xDist > 0) {
    let newX = t.x;
    while(Math.abs(h.x - newX) > 1) {
      newX++;
    }
    return newX;
  }
} 
const getNewTailPosition = (h, t) => {

  if(h.x == t.x && h.y == t.y) {
    return t;
  }
  if(h.x != t.x && h.y != t.y) {
    // Cross jump
    let newY = calculateNewY(h, t);
    let newX = calculateNewX(h, t);
    if(newY != t.y) {
      if(h.x - t.x < 0) {
        newX--;
      } else {
        newX++;
      }
    } else if(newX != t.x) {
      if(h.y - t.y < 0) {
        newY--;
      } else {
        newY++;
      }
    }
    return {x: newX, y:newY};
  } else {
    let newY = calculateNewY(h, t);
    let newX = calculateNewX(h, t);
    return {x: newX, y:newY};
  }
}

const getTailCoordinates = (moves, knots) => {
  let currentHeadPosition = {x: 0, y: 0};
  let currentTailPosition = {x: 0, y: 0};
  let tailPositions = moves.map((move) => {
    const direction = move.split(" ")[0];
    const jumpLength =  parseInt(move.split(" ")[1]);
    const positions = getNewPositions(currentHeadPosition, currentTailPosition, direction, jumpLength, knots);
    currentHeadPosition = positions.hPosition;
    currentTailPosition = positions.tPosition;
    return positions.tPositions;
  });
  return tailPositions;
}

const solve = () => {
  const moves = getMoves();

  //get coordinates of tail moves.
  const tailCords = getTailCoordinates(moves, knots).reduce((arr, curArr) => arr.concat(curArr));
  const uniqueTailCords = tailCords.filter((v,i,a) => a.findIndex(v2=>(JSON.stringify(v2) === JSON.stringify(v))) === i);
  console.log(uniqueTailCords);
  console.log(uniqueTailCords.length);
}

solve();
