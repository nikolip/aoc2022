const fs = require('fs');

const getInput = () => {
  return fs.readFileSync('input.txt').toString().split('\n');
}

const isVisibleFromTop = (i,k,input, height) => {
  for(var j = i - 1; j >= 0; j--) {
    if(height <= parseInt(input[j][k])) {
      return false;
    }
  }
  return true;
}

const isVisibleFromLeft = (i,k,input, height) => {
  for(var j = k - 1; j >= 0; j--) {
    if(height <= parseInt(input[i][j])) {
 
      return false;
    }
  }
  return true;
}

const isVisibleFromRight = (i,k,input, height) => {
  for(var j = k + 1; j <= input[i].length - 1; j++) {
    if(height <= parseInt(input[i][j])) {
      return false;
    }
  }

  return true;
}

const isVisibleFromBottom = (i,k,input, height) => {
  for(var j = i + 1; j <= input.length - 1; j++) {
    if(height <= parseInt(input[j][k])) {
      return false;
    }
  }

  return true;
}

const isVisible = (i,k,input) => {
  let height = parseInt(input[i][k]);
  if(isVisibleFromTop(i,k,input,height)) {
    return true;
  }
  if(isVisibleFromLeft(i,k,input,height)) {
    return true;
  }
  if(isVisibleFromRight(i,k,input,height)) {

    return true;
  }
  if(isVisibleFromBottom(i,k,input,height)) {
    return true;
  }
  return false;
}

const getVisibleCount = (input) => {
  let isVisibleCount = 0;

  for(let i = 0; i < input.length; i++) {
    // take the top and bottom row out
    if(i == 0 || i == input[i].length -1) {
      isVisibleCount += input[i].length;
      continue;
    }

    for(let k= 0; k < input[i].length; k++) {
      //take the left and right columns out
      if(k == 0 || k == input[i].length -1) {
        isVisibleCount++;
        continue;
      }
      const height = parseInt(input[i][k]);
      if(isVisible(i,k,input)) {
        isVisibleCount++;
      }
    }
  }

  return isVisibleCount;
}

const scoreFromTop =(i,k,input, height) => {
  let score = 0;
  for(var j = i - 1; j >= 0; j--) {
    if(height <= parseInt(input[j][k])) {
      score++;
      return score;
    }
    score++;
  }

  return score
}

const scoreFromBottom =(i,k,input,height) => {
  let score = 0;
  for(var j = i + 1; j <= input.length - 1; j++) {
    if(height <= parseInt(input[j][k])) {
      score++;
      return score;
    }
    score++;
  }

  return score
}

const scoreFromLeft =(i,k,input,height) => {
  let score = 0;
  for(var j = k - 1; j >= 0; j--) {
    if(height <= parseInt(input[i][j])) {
      score++;
      return score;
    }
    score++;
  }
  return score;
}

const scoreFromRight =(i,k,input,height) => {
  let score = 0;
  for(var j = k + 1; j <= input[i].length - 1; j++) {
    if(height <= parseInt(input[i][j])) {
      score++;
      return score;
    }
    score++;
  }
  return score;
}

const getScenicScore = (i,k, input) => {
  let height = parseInt(input[i][k]);
  let topScore = scoreFromTop(i,k,input,height);
  let bottomScore = scoreFromBottom(i,k,input,height);
  let leftScore = scoreFromLeft(i,k,input,height);
  let rightScore = scoreFromRight(i,k,input,height);

  return topScore * bottomScore * leftScore * rightScore; 
}

const getScenicScores = (input) => {
  
  const scores = [];
  for(let i = 0; i < input.length; i++) {
    // take the top and bottom row out
    if(i == 0 || i == input[i].length -1) {
      continue;
    }

    for(let k= 0; k < input[i].length; k++) {
      //take the left and right columns out
      if(k == 0 || k == input[i].length -1) {
        continue;
      }
      scores.push(getScenicScore(i,k,input));
    }
  }

  return scores;
}

const solveFirst = () => {
  const input = getInput();
  const visibleCount = getVisibleCount(input);
  console.log(visibleCount);
}

const solveSecond = () => {
  const input = getInput();
  const scenicScores = getScenicScores(input);
  console.log(Math.max(...scenicScores));
}


solveFirst();
solveSecond();