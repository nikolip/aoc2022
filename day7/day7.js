const fs = require('fs');

const getInput = () => {
  return fs.readFileSync('input.txt').toString();
}

const parseInput = (input) => {
  return input.split('\n');
}
const getPath = (files ,count) => {
  let path = "";
  for(let k = 0; k <= count; k++) {
    path +=  files[k];
    if(k != 0) {
      path += "/";
  }
  }
  return path;
}

const getSizes = (lines) => {
  //{dir: "abs": size: 3000}
  const sizes = [];
  const files = [];
  for(let i = 0; i < lines.length; i++) {   
    if(lines[i].includes("$") && lines[i].includes("cd ") && !lines[i].includes("cd ..")) {
      files.push(lines[i].replace("$ cd ", ""));
    }

    if(lines[i].includes("$") && lines[i].includes("cd ..")) {
      files.pop();
    }

    if(!isNaN(lines[i][0])) { 
      const size = lines[i].split(" ")[0];
      for(let k = 0; k < files.length; k++) {
        const path = getPath(files, k);
        sizes.push({"dir": path, "size": parseInt(size)})
      }
    }
  }
  console.log(sizes);
  const totalSizes = {};
  for(let i = 0; i < sizes.length; i++) {
    if(totalSizes[sizes[i].dir] != null){
      totalSizes[sizes[i].dir] += sizes[i].size;
    }  else {
      totalSizes[sizes[i].dir] = sizes[i].size
    }
  }

  return totalSizes;
}


const sumOfFilesUnder= (maxSize, files) => {
  return  Object.values(files)
    .filter((fileSize) => fileSize <= maxSize)
    .reduce((sum, size) => sum + size)
}

const getSmallesEnoughDirectory = (requiredSize, files) => {    
 return Math.min(
    ...Object.values(files).filter((fileSize) => fileSize >= files['/'] - 40000000)
  );
}

const solve = () => {
  const input = getInput();
  const lines = parseInput(input);

  const sizes = getSizes(lines);
  const sum = sumOfFilesUnder(100000, sizes);
  const closest = getSmallesEnoughDirectory(40000000, sizes);

  console.log("first answer: " + sum);
  console.log("second answer: " + closest);

}
solve();
