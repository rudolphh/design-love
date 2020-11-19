"use strict";

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}


$(document).ready(function(){ 
    $.ajaxSetup({ cache: false });
  
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
  
    function setQuotes(a){
    
        let newQuote = $(a[0].content.rendered).text();
        let newAuthor = a[0].title.rendered;
        $("#text").html(newQuote);
        $("#author").text("- " + decodeHtml(decodeURIComponent(newAuthor)));
    
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&via=rudolphharthur&related=rudolphharthur&text=' + encodeURIComponent('"' + newQuote + '" ' + newAuthor));
        $("#quote-box").css("display", "block");
        setColors();
    }// end setQuotes
  
    function getRandomColor(){
        return 'rgb('+ (Math.floor(Math.random() * 256)) +','+ 
                         (Math.floor(Math.random() * 256)) +','+ 
                         (Math.floor(Math.random() * 256)) +')';
    }
  
    function setColors(){
        let newColor = getRandomColor();
        $("body").css({ backgroundColor: newColor });
        $(".change-background-color").css({ backgroundColor : newColor });
        $(".change-color").css({ color : newColor });
  
    }
  
    $.getJSON("https://quotesondesign.com/wp-json/wp/v2/posts?orderby=rand&posts_per_page=1&callback=", setQuotes);

    $('#new-quote').on('click', function(e) {
        e.preventDefault();
        $.getJSON("https://quotesondesign.com/wp-json/wp/v2/posts?orderby=rand&posts_per_page=1&callback=", setQuotes);
    });
    
});// end document ready
