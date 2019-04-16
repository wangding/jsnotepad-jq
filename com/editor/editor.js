/* exported $editor */
var $editor = (function() {
  var $DOM = $(''
      + '<div class="notepad-editor">'
        + '<textarea spellcheck="false"></textarea>'
      + '</div>');

  var $textArea = $DOM.find('textarea');

  function resize(isBig) {
    if(isBig) {
      $DOM.css({bottom: '21px'});
    } else {
      $DOM.css({bottom: '0'});
    }
  }

  function show() {
    $('body').append($DOM);
    $textArea.trigger('focus');
  }

  return {show: show, resize: resize};
}());
