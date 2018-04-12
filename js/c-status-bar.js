var $statusBar = (function() {
  var $DOM = $(''
   + '<div class="notepad-statusbar">'
    + '<div class="left-panel"></div>'
    + '<div class="right-panel">'
      + '<p class="row-col">第&nbsp;1&nbsp;行，第&nbsp;1&nbsp;列</p>'
    + '</div>'
   + '</div>');

  function show() {
    $(np.config.appContainer).append($DOM);
  }

  return {show: show};
})();


