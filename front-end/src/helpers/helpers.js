
/*
shuffle: function to change the order in the array gameRandomOutput.
eqArrays: function to compare the player's input and the game sequence.
*/


export const shuffle = (arr) => {
  return arr.sort((a, b) => { 
    return [Math.random() - 0.5];
  });
};


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