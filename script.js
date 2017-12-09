$(document).ready(function() {
  "use strict";
  console.log("DOM content loaded.");
  var searchVal = "";
  //used for the final URL
  var wikiURL = "";
  // used to create beginning of URL
  var prefixURL =  "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&titles=";
  var whitespaceRegex = /\s+/g;

  function parseQuery (wikiURL) {
    $.getJSON(wikiURL, {format: 'json'}, function(json, textStatus) {
          console.log(json.query.normalized[0].from)/*optional stuff to do after success */
      });
  }


$("#search-button").click(function(){
  //grab value entered in search field
  searchVal = $("#input-value").val();

  if(searchVal !== "") {

    //replace any whitespace in input value with an equivalent percent-encoding value of '%20', reassign it to the search value. will be used to construct query string's URL
    searchVal = searchVal.replace(whitespaceRegex,"%20");
  // }

    wikiURL = prefixURL + searchVal;
    console.log("The wiki string is: " + wikiURL);
    parseQuery(wikiURL);
  }

  else {
    console.log("Search value empty.");
  }

});

$('#input-value').keypress(function(event) {
  if(event.which === 13) {
    $("#search-button").click();
  }
});

//CORS HELP
// https://www.mediawiki.org/wiki/API:Cross-site_requests



// $.ajax({
//   url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&json=?&titles=' + searchVal,
//   type: 'GET',
//   dataType: 'json',
//
// })
// .done(function() {
//   console.log("success");
//   $.getJSON(wikiURL, function(json, textStatus) {
//       console.log(json.query)/*optional stuff to do after success */
//   });
// })
// .fail(function() {
//   console.log("error");
// })
// .always(function() {
//   console.log("complete");
// });




// $.ajax({
//   url: wikiURL,
//   type: 'GET',
//   dataType: 'json',
// })
// .done(function(json) {
//   console.log("success");
//   console.log(json);
// })
// .fail(function() {
//   console.log("error");
// })
// .always(function() {
//   console.log("complete");
// });

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
