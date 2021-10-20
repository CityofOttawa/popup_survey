// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, drupalSettings) {

  $(document).ready(function() {
    var bots = new RegExp(drupalSettings.popup_survey.botlist, "i");
    if( navigator.userAgent && bots.test(navigator.userAgent) ) {
      return;
    }

    var cookie = readCookie('ottcity_site_survey');
    if(!cookie) {
      createCookie('ottcity_site_survey','isActive', 14);
    }

    $('#popupSurveyModal').modal('show');
  });

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


})(jQuery, Drupal, this, this.document, drupalSettings);
