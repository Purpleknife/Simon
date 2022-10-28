
/*
shuffle: function to change the order in the array gameRandomOutput.
complexShuffle: function to change game sequence complexity depending on the level.
eqArrays: function to compare the player's input and the game sequence.
*/


export const shuffle = (arr) => {
  return arr.sort((a, b) => { 
    return [Math.random() - 0.5];
  });
};


export const complexShuffle = (shuffledArr, condition) => {
  if (condition === 'lvl 1 to 5') {
    const newItems = [shuffledArr[(Math.floor(Math.random()*4))]]
    let arr1 = [...shuffledArr];
    arr1.push(...newItems);
    return arr1;
  }
  if (condition === 'lvl 5 to 10') {
    const newItems1 = [shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))]];
    let arr2 = [...shuffledArr];
    arr2.push(...newItems1);
    return arr2;
  }
  if (condition === 'lvl 10 to 15') {
    const newItems2 = [shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))]];
    let arr3 = [...shuffledArr];
    arr3.push(...newItems2);
    return arr3;
  }
  if (condition === 'lvl 15 to 20') {
    const newItems3 = [shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))], shuffledArr[(Math.floor(Math.random()*4))]];
    let arr4 = [...shuffledArr];
    arr4.push(...newItems3);
    return arr4;
  }  
};

export const decideOutput = (level, random) => { //=> Maybe the error comes from here!!! It runs 2 times instead of 1.
  let arr = shuffle(random);

  if (level >= 0 && level <= 5) {
    return complexShuffle(arr, 'lvl 1 to 5');
  }
  if (level >= 6 && level <= 10) {
    return complexShuffle(arr, 'lvl 5 to 10');
  }
  if (level >= 11 && level <= 15) {
    return complexShuffle(arr, 'lvl 10 to 15');
  }
  if (level >= 16 && level <= 20) {
    return complexShuffle(arr, 'lvl 15 to 20');
  }
}

export const eqArrays = function(arr1, arr2) { //Compare both arrays and if they're a perfect match, return true.
  if (arr1.length !== arr2.length) { //Compare length first, if it doesn't match, exit function and return false.
    return false;
  }
  for (let i = 0; i < arr1.length; i++) { //Compare each element one by one if length matches.
    if (arr1[i] !== arr2[i] && (!Array.isArray(arr1[i]) || !Array.isArray(arr2[i]))) {
      return false;
    }
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) { // Added this condition (recursion) to handle nested arrays.
      if (!eqArrays(arr1[i], arr2[i])) {
        return false;
      }
    }
  }
  return true; //If length and all the elements are a perfect match, return true.
};


// const arr = ['red', 'green', 'blue', 'yellow'];
// const newArr = shuffle(arr);
// console.log('lvl 1 to 5', complexShuffle(newArr, 'lvl 1 to 5'));
// console.log('lvl 5 to 10', complexShuffle(newArr, 'lvl 5 to 10'));
// console.log('lvl 10 to 15', complexShuffle(newArr, 'lvl 10 to 15'));
// console.log('lvl 15 to 20', complexShuffle(newArr, 'lvl 15 to 20'));