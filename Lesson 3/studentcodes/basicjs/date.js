// date.html 
//   Illustrates the use of the Date object by 
//   displaying the parts of a current date and
//   using two Date objects to time a calculation
    
// Get the current date

      var today = new Date();

// Fetch the various parts of the date

      var dateString = today.toLocaleString();
      var day = today.getDay();
      var date = today.getDate();
      var month = today.getMonth();
      var year = today.getFullYear();
      var time = today.toLocaleTimeString();

      var AWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"]
      var AMonth = ['January', "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

// Display the parts

      document.write(
            "Date: " + dateString + "<br />",
            "Day: " + day + "<br />",
            "Today: " + AWeek[day] + " " + date + " " + AMonth[month] + ", " + year + " " + time + "<br /"
      )
