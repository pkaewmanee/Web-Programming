// nochange.js
//   This script illustrates using the focus event
//   to prevent the user from changing a text field

// The event handler function to compute the cost

function computeCost() {
//add your code here

// Compute the cost

  var french = 3.49 * document.getElementById("french").value
  var hazel = 3.95 * document.getElementById("hazel").value
  var colum = 4.59 * document.getElementById("colum").value

  if(document.getElementById("french").value < 0 
  || document.getElementById("hazel").value < 0 
  || document.getElementById("colum").value < 0){
    alert("Why are you gae?")
  } else {
    document.getElementById("cost").value = 
    totalCost = french + hazel + colum;
  }

}  //* end of computeCost
