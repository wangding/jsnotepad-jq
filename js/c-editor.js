var $editor = (function() {
  var $DOM = $(''
      + '<div class="notepad-editor">'
        + '<textarea></textarea>'
      + '</div>');
  
  var $textArea = $DOM.find('textarea');
    
  function show() {
    $(np.config.appContainer).append($DOM);
    $textArea.trigger('focus');
  }

  return {show: show};
})();
