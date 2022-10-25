
/*
Helper function to change the order in the array.
*/

const arr2 = ['red', 'green', 'blue', 'yellow'];


export const shuffle = (arr2) => {
  return arr2.sort((a, b) => { 
    return [Math.random() - 0.5]; 
  });
};

//console.log(shuffle(arr2));