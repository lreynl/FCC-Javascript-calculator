/*The current result is stored in the digits div. The input string since
  equals was last pushed is stored in the input div. The last operator
  entered is stored in #sign.
  Two copies of the current input are stored: the one in #input and the
  one stored in toEval. The second one is not displayed. The reason for having
  two copies is so that the 'times' and 'division' symbols could be used.
  This could probably be simplified by setting the id of those divs to '*'
  and '/'.
  When a button is pushed, the innerHTML is sent to a switch statement
  for the appropriate action.

  The exponential notation feature is unfinished.
*/
var lastChar = "";
var decPoint = false;
var operator = false;
var answer = false;
var clear = true;
var num = /[0-9]/;
var ops = ["+", "-", "×", "÷"];
var toEval = ""; //This is what is sent to eval().
var temp = 0.0;
var isExp = false;

$(".btn").click(function () {
  lastChar = event.target.innerHTML;
  switch (lastChar) {
    case "0":
      if(document.getElementById("digits").innerHTML == "0") return;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      if(isExp) CLEAR();
      if(testLen() && !operator) return;
      if(answer) CLEAR();
      if(operator) document.getElementById("digits").innerHTML = "";
      document.getElementById("digits").innerHTML += lastChar;
      document.getElementById("input").innerHTML += lastChar;
      toEval += lastChar;
      operator = false;
      clear = false;
      answer = false;
      break;

    case "BKSP":
      if(isExp) CLEAR();
      if(answer) {
        document.getElementById("digits").innerHTML = "";
        answer = false;
        return;
      }
      if(document.getElementById("digits").innerHTML.length > 0) {
        document.getElementById("digits").innerHTML =
          document.getElementById("digits").innerHTML.slice(0, -1);
          document.getElementById("input").innerHTML = document.getElementById("input").innerHTML.slice(0, -1);
          toEval = toEval.slice(0, -1);
      } else {
        //if(document.getElementById("sign").innerHTML != "") {
        //if(ops.test(toEval.slice(-1))) {

        //}
        if(ops.includes(document.getElementById("input").innerHTML.slice(-1))) {
          operator = false;
          document.getElementById("sign").innerHTML = "";
        }
        document.getElementById("input").innerHTML =
          document.getElementById("input").innerHTML.slice(0, -1);
        toEval = toEval.slice(0, -1);

      }
      if(!document.getElementById("digits").innerHTML.includes(".")) {
        decPoint = false;
      }
      break;

    case ".":
      if((decPoint || testLen()) && !answer) return;
      if(isExp) CLEAR();
      if(answer) {
        CLEAR();
      }
      if(operator) {
        document.getElementById("digits").innerHTML = "";
      }
      document.getElementById("digits").innerHTML += lastChar;
      document.getElementById("input").innerHTML += lastChar;
      toEval += ".";
      operator = false;
      decPoint = true;
      break;

    case "C":
      CLEAR();
      break;

    case "×":
    case "÷":
    case "+":
    case "-":
      //need for backspace
      if(ops.includes(document.getElementById("input").innerHTML.slice(-1))) return;
      if(operator) return;
      //todo
      if(isExp) CLEAR();
      if(!(/[0-9]/.test(document.getElementById("digits").innerHTML)) && document.getElementById("input").innerHTML == "") return;
      if(answer) {
        document.getElementById("input").innerHTML = temp;
        answer = false;
      }
      document.getElementById("sign").innerHTML = lastChar;
      document.getElementById("input").innerHTML += lastChar;
      if(lastChar == "×") {
        toEval += "*";
      } else if(lastChar == "÷") {
        toEval += "/";
      } else {
        toEval += lastChar;
      }
      operator = true;
      clear = false;
      decPoint = false;
      break;

    case "=":
      if(clear || operator) return;
      if(ops.includes(document.getElementById("input").innerHTML.slice(-1))) return;
      document.getElementById("sign").innerHTML = lastChar;
      temp = String(eval(toEval));
      if(!temp.includes(".") && temp.length > 9) {
        temp = toSci(temp);
      } else {
        temp = temp.slice(0, 9);
      }
        document.getElementById("digits").innerHTML = temp;
      answer = true;
      decPoint = false;
      break;
  }
});

function CLEAR() {
  document.getElementById("digits").innerHTML = "";
  document.getElementById("sign").innerHTML = "";
  document.getElementById("input").innerHTML = "";
  toEval = "";
  decPoint = false;
  operator = false;
  answer = false;
  clear = true;
  temp = 0.0;
  isExp = false;
}

//only goes one-way right now
function toSci(big) {
  isExp = true;
  if(big[0] == ".") {
    //todo
  }
  return big[0] + "." + big.slice(1, 3) + "×10^" + (big.length - 1);
}

function testLen() {
  //console.log(lastChar);
  if(document.getElementById("digits").innerHTML.length >= 9) return true;
  if(document.getElementById("input").innerHTML.length >= 33) return true;
  return false;
}
