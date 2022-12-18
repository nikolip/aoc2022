const fs = require("fs");

const cubeToStr = cube => `${cube.x}-${cube.y}-${cube.z}`;

const cubeFromStr = (cube) => {return {"x": cube.split("-")[0], "y": cube.split("-")[1], "z":  cube.split("-")[2]}};

const cubeDist = (c1, c2) => c1.reduce((a, v, i) => a+Math.abs(v-c2[i]), 0);

cubeToArray = (cube) => [Number(cube.x), Number(cube.y), Number(cube.z)];


const dirs = [
  {x: 1, y: 0, z: 0}, {x: -1, y: 0, z: 0},
  {x: 0, y: 1, z: 0}, {x: 0, y: -1, z: 0},
  {x: 0, y: 0, z: 1}, {x: 0, y: 0, z: -1}
];

const checkX = (cube1, cube2) => {
  if(Math.abs(cube1.x - cube2.x) == 1) {
    return true;
  }
  return false;
}

const checkY = (cube1, cube2) => {
  if(Math.abs(cube1.y - cube2.y) == 1) {
    return true;
  }
  return false;
}

const checkZ = (cube1, cube2) => {
  if(Math.abs(cube1.z - cube2.z) == 1) {
    return true;
  }
  return false;
}

const minAr = [-1,-1,-1];
const maxAr = [20,20,20];

const isInRage = cube => cube.every((v, i) => v >= minAr[i] && v <= maxAr[i]);

const countOpenSides = (cube, cubes) => {
  let x = 2;
  let y = 2;
  let z = 2;
  let cube1 = cubeFromStr(cube);

  cubes.forEach((cube3)  => {
    let cube2 = cubeFromStr(cube3);

    if(cube1.x == cube2.x && cube1.y == cube2.y && cube1.z == cube2.z) {
      return;
    }

    if(cube1.y == cube2.y && cube1.z == cube2.z && checkX(cube1, cube2)) {
      x--;
    }


    if(cube1.x == cube2.x && cube1.z == cube2.z && checkY(cube1, cube2)) {
  
      y--;
    }


    if(cube1.y == cube2.y && cube1.x == cube2.x && checkZ(cube1, cube2)) {
      z--;
    }
  })
  
  return x+y+z;
}



let cubes = new Set(new fs.readFileSync("input.txt").toString().split("\n").map((cube) =>{
  let x = Number(cube.split(",")[0]);
  let y = Number(cube.split(",")[1]);
  let z = Number(cube.split(",")[2]);

  let cubeobj =  {x,y,z};
  return cubeToStr(cubeobj);
}));

let water = [];
let visited = new Set();

const spreadWater = cube => {
    if(visited.has(cubeToStr(cube))) {
      return;
    }
    visited.add(cubeToStr(cube));
    water.push(cube);
    
    for(let i = 0; i < dirs.length; i++) {
      let dir = dirs[i];
      let newCube = {x: dir.x + cube.x, y: dir.y + cube.y, z: dir.z + cube.z};
      if(isInRage(cubeToArray(newCube)) && !cubes.has(cubeToStr(newCube))) {
        spreadWater(newCube);
      }
    }
}


const solve = (cubes) => {
  let openSides = 0;

  cubes.forEach(cube => {
    openSides += countOpenSides(cube, cubes);
  })

  console.log(openSides);
}


const solveSecond = (cubes) => {
  
spreadWater({x:minAr[0], y: minAr[1], z: minAr[2]});
console.log(water.length);
 let sides = water.reduce((acc, c1) => acc+[...cubes].filter((c2) => {
    return cubeDist(cubeToArray(c1), cubeToArray(cubeFromStr(c2))) == 1}
  ).length, 0);


  console.log(sides);
 
}



//solve(cubes);
solveSecond(cubes);