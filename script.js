$(document).ready(function() {
  "use strict";
  console.log("DOM content loaded.");
  var searchVal = "";
  //used for the final URL
  var wikiURL = "";
  /* used to create beginning of URL. action=parse [Parses content and returns parser output], prop=text [the property you want to get is the text], page=
[parses the content of a particular page.]*/
  var prefixURL =  "https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch=";
  //regular expression, finds whitespace in a string. "g" means global and returns all matches in a string, not just first one. "s" is for whitespace. The (+) matches one or more occurrences of the one-char regex. Below: Find one or more occurrences of whitespace and return all matches from the string.
  var whitespaceRegex = /\s+/g;
  var totalSummary = "";
  var parsedSummary = "";
  var whitespaceSearchVal = "";
  var whitespaceTitleVal = "";
  var titleVal = "";
  // total number of pages to return upon a search
  var pagesCount = 10;

$("#search-button").click(function(){
  //grab value entered in search field
  searchVal = $("#input-value").val();

  //if input field not empty, execute code
  if(searchVal !== "") {
    //replace any whitespace in input value with an equivalent percent-encoding value of '%20', reassign it to the new var value. will be used to construct query string's URL, while original searchVal var will be injected back in HTML as the query title
    whitespaceSearchVal = searchVal.replace(whitespaceRegex,"%20");

    wikiURL = prefixURL + whitespaceSearchVal;
    wikiURL + "&continue=";
    console.log("The wiki string is: " + wikiURL);
    //upon search click event/enter, construct wikiURL to make AJAX HTTP GET request. Use jsonp as dataType to get through CORS policy since the domain I'm on and the domain I'm requesting from are different.
    $.ajax({
      url: wikiURL,
      type: 'GET',
      dataType: 'jsonp'
    })
    .done(function(response) {
      console.log("success");
      //clear query results before a new one is made
      $(".query-container").html("");

      /*iterate through for loop and create 10 (default is size not specified in query URL) matches based upon user search*/
      for(var i  = 0; i < pagesCount; i++) {
        //created same element process as the search value to apply it to the title value for the (read more) link
        titleVal = response.query.search[i].title;
        whitespaceTitleVal = titleVal.replace(whitespaceRegex,"%20");
          $(".query-container").append("<div class='query-item'><h2>" + response.query.search[i].title + "</h2>" + "<p>" + response.query.search[i].snippet + " <a href=" + "https://en.wikipedia.org/wiki/" + whitespaceTitleVal + " target='_blank'>(read more)</a>" + "</p>" + "</div>");
      }
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
