// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - http://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, drupalSettings) {
  // Get the settings provided by Drupal.
  const { frequency, botlist } = drupalSettings.popup_survey;
  // Generate a random number between 1 and the set frequency.
  const frequencyCheck = Math.random() * (frequency - 1) + 1;
  // Create the RegEx for the botlist.
  const bots = new RegExp(botlist, "i");
  // Get the ottcity_site_survey cookie.
  const cookie = readCookie("ottcity_site_survey");

  $(document).ready(function () {
    // If the frequency check isn't 1, return.
    if (frequencyCheck !== 1) {
      return;
    }

    // If the user agent matches a bot, return.
    if (navigator.userAgent && bots.test(navigator.userAgent)) {
      return;
    }

    // If the cookie already exists, return.
    if (cookie === null) {
      return;
    }

    // Create a new cookie and show the popup survey.
    createCookie("ottcity_site_survey", "isActive", 14);
    $("#popupSurveyModal").modal("show");
  });

  // Close the popup survey when the accept button is clicked.
  $("#popupSurveyAccept").on("click", () => {
    $("#popupSurveyModal").modal("hide");
  });

  /**
   * Creates a cookie with an optional expiry (in days).
   *
   * @param {string} name   - The name of the cookie.
   * @param {string} value  - The value of the cookie.
   * @param {number} [days] - The number of days the cookie will be valid for.
   */
  function createCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();

      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toGMTString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  }

  /**
   * Finds a cookie by name.
   *
   * Will return null if no cookie exists.
   *
   * @param {string} name - The name of the cookie to search for.
   * @returns {string|null} - The value of the cookie.
   */
  function readCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");

    // Loop through the cookies until the desired one is found.
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
})(jQuery, Drupal, this, this.document, drupalSettings);
