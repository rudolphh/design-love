"use strict";

$(document).ready(function () {
  $.ajaxSetup({ cache: false });

  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  function setQuotes(a) {

    var newQuote = $(a[0].content).text();
    var newAuthor = a[0].title;
    $("#text").html(newQuote);
    $("#author").text("- " + decodeHtml(decodeURIComponent(newAuthor)));

    $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&via=rudolphharthur&related=rudolphharthur&text=' + encodeURIComponent('"' + newQuote + '" ' + newAuthor));
    $("#quote-box").css("display", "block");
    setColors();
  } // end setQuotes

  function getRandomColor() {
    return 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
  }

  function setColors() {
    var newColor = getRandomColor();
    $("body").css({ backgroundColor: newColor });
    $(".change-background-color").css({
      backgroundColor: newColor });
    $(".change-color").css({
      color: newColor
    });
  }

  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", setQuotes);

  $('#new-quote').on('click', function (e) {
    e.preventDefault();
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", setQuotes);
  });
});