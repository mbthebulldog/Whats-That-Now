$(document).ready(function() {

  $('#bar').keypress(function(key) {
    term = $('#bar').val().replace(/\s+/g, '%20');
    if (key.which === 13) {
      var link = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&exintro&exlimit=max&inprop=url&generator=search&gsroffset=&format=json&formatversion=2&callback=?&gsrsearch=' + term;
      wikipedia(link);
      key.preventDefault();
    }
  });

  function wikipedia(link) {
    $(".results").html("");
    $(".results").append("<br>");
    $.getJSON(link, function(results) {
      if (results.query == undefined) {
        alert("Come on. That's not even a real thing.");
      } else {
        for (var j = 0; j < results.query.pages.length; j++) {
          $(".results").append("<div class='resultsContainer thumbnail' style='background-color: #460309; color: #888;'><span style='font-weight:bold; font-size:150%; margin-bottom:100px; font-family: Arvo, monospace;'><a href=" + results.query.pages[j].fullurl + ">" + results.query.pages[j].title + "</a></span><br></br>" + results.query.pages[j].extract + "</div>");
          $(".results").append("<br>");
        }
      }
    });
  }
});
