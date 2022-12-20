//first solution did not work on the second part. It was too slow. 
const fs = require("fs");

const getInput = () => {
  return fs.readFileSync("input.txt").toString().split("\n").map(Number);
}

const mix = (numbers) => {
  for(let i = 0; i < numbers.length; i++) {
    let item  = numbers.find(x => x.index == i);
    let index =  numbers.findIndex(x => x.index == item.index);
    let newIndex = index + item.value;

    
    if(newIndex == 0) {
      newIndex = numbers.length;
      numbers.splice(newIndex, 0, numbers.splice(index, 1)[0]);
    }else if (newIndex < 0) {
      // new index is smaller than 0;
      while(newIndex <= 0) {
        newIndex = numbers.length - 1 - Math.abs(newIndex);
      }
      numbers.splice(newIndex, 0, numbers.splice(index, 1)[0]);
    }else if(newIndex > numbers.length) {
      //new index is bigger than array length
      while(newIndex >= numbers.length) {
        newIndex = Math.abs(newIndex) - numbers.length + 1;
      }
      numbers.splice(newIndex, 0, numbers.splice(index, 1)[0]);
    }else {
      // otherwise just move 
      numbers.splice(newIndex, 0, numbers.splice(index, 1)[0]);
    }

    console.log("round inside",i,"/",numbers.length);
  }
  return numbers; 
}

const getNumber = (numbers) => {

  let zeroIndex = numbers.findIndex(x => x.value == 0);

  let first = zeroIndex;
  let second = zeroIndex;
  let third = zeroIndex;
  let oneT = 1000;
  let twoT = 2000;
  let threeT = 3000;
  //first 
  while(oneT--) {
    let newFirst = first + 1;
    if(newFirst +1  > numbers.length) {
      first = 0;
    }else {
      first = newFirst;
    }
  }


  while(twoT--) {
    let newSecond = second + 1;
    if(newSecond + 1 > numbers.length) {
      second = 0;
    }else {
      second = newSecond;
    }
  }

  while(threeT--) {
    let thirdSecond = third + 1;
    if(thirdSecond + 1 > numbers.length) {
      third = 0;
    }else {
      third = thirdSecond;
    }
  }
  return numbers[first].value + numbers[second].value + numbers[third].value;
}

const part1 = () => {
  let numbers = getInput();
  numbers = numbers.map((value, index) =>  {return {"index": index, "value": value}});
  numbers = mix(numbers);
  return getNumber(numbers);

}


//first solution was slow so I looked up how to implement it faster from other ppl.
const part2 = () => {
  let numbers = getInput().map(num => parseInt(num) * 811589153);

  let mixer = numbers.map((num, index) => {
      return { number: num, index };
  });

  for (let mixing = 0; mixing < 10; mixing++) {
      for (let i = 0; i < numbers.length; i++) {
          let index = mixer.findIndex(num => num.index == i);
          mixer.splice(index, 1);
          mixer.splice((index + numbers[i] + ((numbers[i] >= 0) ? 0 : mixer.length)) % mixer.length, 0, { number: numbers[i], index: i });
      }
  }

  let zeroIndex = mixer.findIndex(num => num.number == 0);
  return mixer[(zeroIndex + 1000) % mixer.length].number + mixer[(zeroIndex + 2000) % mixer.length].number + mixer[(zeroIndex + 3000) % mixer.length].number;
}

console.log(part1());
console.log(part2());