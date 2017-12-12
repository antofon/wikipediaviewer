$(document).ready(function() {
  "use strict";
  console.log("DOM content loaded.");
  var searchVal = "";
  //used for the final URL
  var wikiURL = "";
  /* used to create beginning of URL. action=parse [Parses content and returns parser output], prop=text [the property you want to get is the text], page=
[parses the content of a particular page.]*/
  var prefixURL =  "https://en.wikipedia.org/w/api.php?format=json&action=parse&prop=text&page=";
  //regular expression, finds whitespace in a string. "g" means global and returns all matches in a string, not just first one. "s" is for whitespace. The (+) matches one or more occurrences of the one-char regex. Below: Find one or more occurrences of whitespace and return all matches from the string.
  var whitespaceRegex = /\s+/g;
  var totalSummary = "";
  var parsedSummary = "";
  var whitespaceSearchVal = "";

$("#search-button").click(function(){
  //grab value entered in search field
  searchVal = $("#input-value").val();

  //if input field not empty, execute code
  if(searchVal !== "") {
    //replace any whitespace in input value with an equivalent percent-encoding value of '%20', reassign it to the new var value. will be used to construct query string's URL, while original searchVal var will be injected back in HTML as the query title
    whitespaceSearchVal = searchVal.replace(whitespaceRegex,"%20");

    wikiURL = prefixURL + whitespaceSearchVal;
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

      //go in and access ALL content related to search. printing out the wikiURL var and viewing the JSON was helpful in determining how to access content
      totalSummary = response.parse.text["*"];

      //split at first p tag to capture the first paragraph of the user search
      parsedSummary = totalSummary.split("<p>");
      // console.log(totalSummary);
      $("#replaceText").html(parsedSummary[1]);
      $("#replaceTitle").addClass('capitalize').html(searchVal);
      //concatenates the English wikipedia website to the /wiki/linkName which is the suffix of the potential links that come up after a search

      $('a').attr('href', function(i, hrefVal) {
        return "https://en.wikipedia.org" + hrefVal;
      });

      //add target="_blank" to open a new tab for the link
      $('a').attr('target', "_blank");

      /*get the first b tag which is the user's search word, and replace it with an a tag whose href is the wikipedia page and the search val concatenated. also include ability to open new tab on click.*/
      $('b').first().replaceWith(function(searchLink){
    searchLink = $("<a></a>", {html: $(this).html() });
    searchLink.attr('target', "_blank");
    //return the correct a tag with the href
    return searchLink.attr("href", function () {
      //return the correct href val from user search
      return 'https://en.wikipedia.org/wiki/' + searchVal;
    })
});
      $(".query-item").click(function(){
        return "https://en.wikipedia.org" + "/" + searchVal
      });
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
