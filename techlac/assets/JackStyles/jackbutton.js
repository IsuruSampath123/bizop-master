// When the user scrolls down 20px from the top of the document, show the button


window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    $('#myBtn').tooltip('hide');
    $('body,html').animate({
        scrollTop: 0
    }, 700);
    return false;
}