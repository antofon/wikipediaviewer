$(document).ready(function() {
  "use strict";
  console.log("DOM content loaded.");
  var searchVal = "";
  //used for the final URL
  var wikiURL = "";
  // used to create beginning of URL
  var prefixURL =  "https://en.wikipedia.org/w/api.php?format=json&action=parse&prop=text&page=";
  var whitespaceRegex = /\s+/g;
  var summary = "";

$("#search-button").click(function(){
  //grab value entered in search field
  searchVal = $("#input-value").val();

  //if input field not empty, execute code
  if(searchVal !== "") {
    //replace any whitespace in input value with an equivalent percent-encoding value of '%20', reassign it to the search value. will be used to construct query string's URL
    searchVal = searchVal.replace(whitespaceRegex,"%20");

    wikiURL = prefixURL + searchVal;
    console.log("The wiki string is: " + wikiURL);
    //upon search click event/enter, construct wikiURL to make AJAX HTTP GET request. Use jsonp as dataType to get through CORS policy since the domain I'm on and the domain I'm requesting from are different.
    $.ajax({
      url: wikiURL,
      type: 'GET',
      dataType: 'jsonp'
    })
    .done(function(response) {
      console.log("success");
      //print query data upon successful AJAX request.
      //since the numbers (really pageid) are arbitrary with each new seach, use for in statement to iterate over object's properties.
      for(var key in response.parse.text){
      console.log(key);
      //go in and access ALL content related to search. printing out the wikiURL var and viewing the JSON was helpful in determining how to access content
      summary = response.parse.text["*"];

      }

        // console.log(summary);
      summary.split("hello");

      console.log(summary[0] + ".");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }

  //else, print to console. may go back and alter to print to screen for user
  else {
    console.log("Search value empty.");
  }
});

//keypress event used to allow users to search by pressing 'Enter key'
$('#input-value').keypress(function(event) {
  if(event.which === 13) {
    $("#search-button").click();
  }
});

});
