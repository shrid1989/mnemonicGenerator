const keyPadMatrix = [
  ["0"],
  ["1"],
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
  ["j", "k", "l"],
  ["m", "n", "o"],
  ["p", "q", "r", "s"],
  ["t", "u", "v"],
  ["w", "x", "y", "z"]
];
let arrOuterTemp = [];
let arrInnerTemp = [];
let arrSaveInnerTemp = [];
let arrDialedNumber = '';

// function is use to collect all the enter keys associate values
function collectKeys(int) {
  if (arrInnerTemp.length == arrDialedNumber.length - 1) {
      arrSaveInnerTemp = arrInnerTemp.slice(0);
      arrSaveInnerTemp.push(int);
      arrOuterTemp.push(arrSaveInnerTemp);
  } else {
    arrInnerTemp.push(int);
  }
}

function removeLastFromInnerTemp() {
  arrInnerTemp.pop(arrInnerTemp.length - 1);
}

// this is recursive function to map over all the input numbers
function generator(myList) {
  if (myList.length <= 1) {
      for (let i = 0; i < keyPadMatrix[myList[0]].length; i++) {
        collectKeys(keyPadMatrix[myList[0]][i]);
      } 
  } else {
      for (let j = 0; j < keyPadMatrix[myList[0]].length; j++){
        collectKeys(keyPadMatrix[myList[0]][j]);
          generator(myList.slice(1));
      }
  }
  removeLastFromInnerTemp();
}

async function generateMnemonics(data){
  arrOuterTemp = []
  arrDialedNumber = data;
 await generator(data);
 return arrOuterTemp;
}
export default generateMnemonics;