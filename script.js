$(document).ready(function() {
  "use strict";
  console.log("DOM content loaded.");
  var searchVal = "";
  //used for the final URL
  var wikiURL = "";
  // used to create beginning of URL
  var prefixURL =  "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&titles=";
  var whitespaceRegex = /\s+/g;

$("#search-button").on("click", function(){
  //grab value entered in search field
  searchVal = $("#input-value").val();

  if(searchVal !== "") {

    //replace any whitespace in input value with an equivalent percent-encoding value of '%20', reassign it to the search value. will be used to construct query string's URL
    searchVal = searchVal.replace(whitespaceRegex,"%20");
  // }

    wikiURL = prefixURL + searchVal;
    console.log("The wiki string is: " + wikiURL);
  }

  else {
    console.log("Search value empty.");
  }

});



$.ajax({
  url: wikiURL,
  type: 'GET',
  dataType: 'json',
})
.done(function(json) {
  console.log("success");
  console.log(json);
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});

// $.ajax({
//   url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&',
//   type: 'GET',
//   dataType: 'json'
// })
// .done(function(json, textStatus) {
//   console.log("success");
// })
// .fail(function() {
//   console.log("error");
// })
// .always(function() {
//   console.log("complete");
// });


});
