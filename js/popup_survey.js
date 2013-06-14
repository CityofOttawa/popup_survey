
// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  $(document).ready(function() {
    centrePopup();
  
    $(window).resize(function() {
      centrePopup();  
    });
  
    $('#popup-reject').click(function(event) {
      event.preventDefault();
      $('.bean-survey-popup-message').hide();
    });
    
    $('#popup-accept').click(function(event) {
      event.preventDefault();
      surveyWindow = popUnder($(this).attr('href'));
      $('.bean-survey-popup-message').hide();
    });
    
  });

  function centrePopup() {
    var $popup = $('.bean-survey-popup-message');
    $popup.css( "margin-top", -$popup.height() / 2 + "px" );
    $popup.css( "margin-left", -$popup.width() / 2 + "px" );
  }
  
  function popUnder(url) {
    var popUnderWin;
    var nav = navigator.userAgent;
    var isGecko = /rv:[2-9]/.exec(nav);
    var hackString = nav.indexOf('Chrome') > -1 ? "scrollbar=yes" : "toolbar=1,statusbar=1,resizable=1,scrollbars=1,menubar=1,location=1,directories=0";

    popUnderWin = window.open("about:blank", "title", hackString); //+ ",height=" + height + ",width=" + width

    if (isGecko) {
      popUnderWin.window.open("about:blank").close();
    }
  
    popUnderWin.document.location.href = url;

    setTimeout(window.focus);
    window.focus();
    popUnderWin.blur();
    
    return popUnderWin;
  }
  
})(jQuery, Drupal, this, this.document);
