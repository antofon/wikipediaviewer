$(document).ready(function() {
  "use strict";
  console.log("DOM content loaded.")


$.ajax({
  url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&',
  type: 'GET',
  dataType: 'json'
})
.done(function(json, textStatus) {
  console.log("success");
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});


});
