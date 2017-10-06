/*
  Landed by HTML5 UP
  html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function($) {

  $(function() {

    // Fix: Placeholder polyfill.
      $('form').placeholder();

    // Scrolly links.
      $('.scrolly').scrolly({
        speed: 500
      });

      if (getParameterByName("inapp")) {
        $('html').addClass('inapp');
      }
  });

})(jQuery);

function getParameterByName(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}