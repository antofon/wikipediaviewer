$(document).ready(function() {
  "use strict";
  console.log("DOM content loaded.");
  var searchVal = "";
  //used for the final URL
  var wikiURL = "";
  // used to create beginning of URL
  var prefixURL =  "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&titles=";
  var whitespaceRegex = /\s+/g;

  // function parseQuery (wikiURL) {
  //   $.getJSON(wikiURL, {format: 'jsonp'}, function(json, textStatus) {
  //         console.log(json.query.normalized[0].from)/*optional stuff to do after success */
  //     });
  // }


  // function parseQuery(response) {
  //   console.log(response.query.normalized[0].from)
  //   }

$("#search-button").click(function(){
  //grab value entered in search field
  searchVal = $("#input-value").val();

  //if input field not empty, execute code
  if(searchVal !== "") {

    //replace any whitespace in input value with an equivalent percent-encoding value of '%20', reassign it to the search value. will be used to construct query string's URL
    searchVal = searchVal.replace(whitespaceRegex,"%20");
  // }

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
      console.log(response);
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


// $.ajax({
//   url: wikiURL,
//   type: 'GET',
//   dataType: 'jsonp'
// })
// .done(function() {
//   console.log("success");
//   $.getJSON(wikiURL, {format: 'json'}, function(json, textStatus) {
//           console.log(json.query.normalized[0].from)/*optional stuff to do after success */
//       });
// })
// .fail(function() {
//   console.log("error");
// })
// .always(function() {
//   console.log("complete");
// });
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
