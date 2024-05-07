// dynValue.js
//   Illustrates dynamic values
     
var helpers = ["Bob 1234 Bangkok", "Mary 4321 Phitsunulok","Susan 2143 Phuket"];

// *********************************************************** 
// The event handler function to change the value of the 
//  textarea
//Add your code here

function messages(adviceNum) {
    document.querySelector("#adviceBox").value = helpers[adviceNum];
}