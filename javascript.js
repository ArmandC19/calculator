const div = '÷';
const mult = '×';
const ad = '+';
const sub = '-';

const add = (x,y) => x + y;

const subtract = (x,y) => x - y;

const multiply = (x,y) => x * y;

const divide = (x,y) => x / y;

let currentDisplay = '';

//Used to note if the last thing the user entered was a number(0) or an operator(1)
let indicator = 0;

//Adds a number to current display than updates the display
//If the last thing enter was a number just tack it on
//If it wasn't add a space first
function addToDisplayNum (e){
  if (indicator == 0) {
    currentDisplay = currentDisplay + e.target.textContent;
  } else {
    currentDisplay = currentDisplay + " " + e.target.textContent;
  }
  updateIndicator();
  updateDisplay();
}

//Adds a operator to current display than updates the display
//If the last thing enter was a number add it with a space in front
//If the last thing was an operator or there aren't any number do nothing
function addToDisplayOp (e){
  if (indicator == 0 && currentDisplay != '') {
    currentDisplay = currentDisplay + " " + e.target.textContent;
  } else {
    return;
  }
  updateIndicator();
  updateDisplay();
}

function isNumeric(num){
  return !isNaN(num);
}

function changeStringsToNumber (array){
  array = array.map((num) => {
      return isNumeric(num) ? Number(num) : num;
  });
  
  return array;
}

//check what the last thing entered was and set the indicator accordingly
//0 for number 1 for operator
function updateIndicator () {

  if (currentDisplay == "") {
    indicator = 0;
  } else if (isNumeric(currentDisplay[currentDisplay.length -1])) {
    indicator = 0;
  } else {
    indicator = 1;
  }
}

function findAllIndexsOf (array, val){
  let indices = [];
  let lastIndex = 0;

  while (true) {
    let index = array.indexOf(val, lastIndex);
    if(index == -1 || lastIndex > array.length){
      return indices;
    }

    indices.push(index);
    lastIndex = index + 1;
  }
}

//Check how many operators are in the array
function checkNumOperators(array){
  numOps = 0;
  for (let i = 0; i < array.length; i++) {
    !isNumeric(array[i]) ? numOps++ : numOps;
  }
  return numOps;
}

function evaluate () {
  //change the string equation into an array of numbers and string operators
  let eq = changeStringsToNumber(currentDisplay.split(' '));

  //0 is divison, 1 is mulitplication, 2 is addition, and 3 is subtraction
  let bedmas = 0;

  //check that their is an equation to evaluate
  if (indicator == 1 || eq.length == 1) {return};

  let index = -1;
  numOps = checkNumOperators(eq);

  //Goes through the array and finds operators in order of bedmas
  //It caculates the operation and then splices the array to remove the three elements 
  ////that make up the equation with the answer
  //eq will be an array the final answer as the element when the loop finishes
  for (let i = 0; i < numOps; i++) {
    switch(bedmas){
      case 0:
        index = eq.indexOf(div);
        if (index == -1){
          bedmas++;
          i--;
        }else{
          eq.splice(index - 1, index + 2, operate(div, eq[index - 1], eq[index + 1]))
        }
        break;
      case 1:
        index = eq.indexOf(mult);
        if (index == -1){
            bedmas++;
            i--;
        }else{
          eq.splice(index - 1, index + 2, operate(mult, eq[index - 1], eq[index + 1]))
        }
        break;
      case 2:
        index = eq.indexOf(ad);
        if (index == -1){
          bedmas++;
          i--;
        }else{
          eq.splice(index - 1, index + 2, operate(ad, eq[index - 1], eq[index + 1]))
        }
        break;
      case 3:
        index = eq.indexOf(sub);
        if (index == -1){
          bedmas++;
        }else{
          eq.splice(index - 1, index + 2, operate(sub, eq[index - 1], eq[index + 1]))
        }
        break;
    }
  }

  currentDisplay = String(eq[0]);
  updateDisplay();
  updateIndicator();
}

function clear () {
  currentDisplay = "";
  updateIndicator();
  updateDisplay();
}

// function backspace () {
//   if (currentDisplay.length > 1){
//     currentDisplay = currentDisplay.substring(0, currentDisplay.length - 2);
//   } else {
//     currentDisplay = "";
//   }
//   updateIndicator();
//   updateDisplay();
// }

//updates the display to whatever is in currentDisplay
function updateDisplay (){
  let display = document.querySelector('.display');
  display.textContent = currentDisplay;
}

//takes a mathmatical operator(a char) and applies to to x and y
function operate (op, x ,y) {
  switch(op){
    case ad:
      return add(x,y);
      break;
    case sub: 
      return subtract(x,y);
      break;
    case mult:
      return multiply(x,y);
      break;
    case div:
      return divide(x,y);
      break;
  }
}

let nums = document.querySelectorAll('.number');
let ops = document.querySelectorAll('.operator');
// let augmentors = document.querySelectorAll('augmentor');

nums.forEach((num) => {
  num.addEventListener('click', addToDisplayNum);
});

ops.forEach((op) => {
  op.addEventListener('click', addToDisplayOp);
});

// augmentors.forEach((aug) => {
//   aug.addEventListener('click', addToDisplayAug);
// });

let eq = document.querySelector('#equal').addEventListener('click', evaluate);
document.querySelector('#clear').addEventListener('click', clear);
// document.querySelector('#backspace').addEventListener('click', backspace);




