// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

  $(document).ready(function() {
    centrePopup();
    focusOnPopup();

    var cookie = readCookie('ottcity_site_survey');

    if (!cookie) {
      createCookie('ottcity_site_survey','isActive', 14);
      $('.popup-greyout').addClass('cover');
    }
    else {
      $('.bean-survey-popup-message').hide();
      $('.popup-greyout').hide();
    }

    $(window).resize(function() {
      centrePopup();
    });

    $('#popup-reject').click(function(event) {
      event.preventDefault();
      $('.bean-survey-popup-message').hide();
      $('.popup-greyout').hide();
    });

    $('#popup-accept').click(function(event) {
      event.preventDefault();
      surveyWindow = popUnder($(this).attr('href'));
      $('.bean-survey-popup-message').hide();
      $('.popup-greyout').hide();
    });
    
  });

  function focusOnPopup() {
    var $popup = $('.bean-survey-popup-message');
    var $accept = $('#popup-accept');
    if(1 <= $popup.length && 1 <= $accept.length) {
      $popup.attr('tabindex', -1);
      $popup.focus();
      // Modal Trap
      // Tabbing past the accept button takes you to the top of the modal.
      $accept.on('keydown', function (e) {
        if ((e.which === 9 && !e.shiftKey)) {
          e.preventDefault();
          $popup.focus();
        }
      });
      // Shift tabbing back past the modal takes you to the accept button of the modal.
      $popup.on('keydown', function (e) {
        if ((e.which === 9 && e.shiftKey)) {
          e.preventDefault();
          $accept.focus();
        }
      });

    }
  }

  function centrePopup() {
    var $popup = $('.bean-survey-popup-message');
    if(1 <= $popup.length) {
      $popup.css("margin-top", -$popup.height() / 2 + "px");
      $popup.css("margin-left", -$popup.width() / 2 + "px");
      $popup.css("visibility", "visible");
    }
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
  
  function createCookie(name,value,days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  
})(jQuery, Drupal, this, this.document);
