var $statusBar = (function() {
  var $DOM = $(''
   + '<div class="notepad-statusbar">'
    + '<div class="left-panel"></div>'
    + '<div class="right-panel">'
      + '<p class="row-col"></p>'
    + '</div>'
   + '</div>');

  var $rowCol = $DOM.find('.row-col');
  var strRowCol = '第&nbsp;x&nbsp;行，第&nbsp;y&nbsp;列';

  function show() {
    $DOM.css('display', 'block');
  }

  function hidden() {
    $DOM.css('display', 'none');
  }

  function setRowCol(r, c) {
    $rowCol.html(strRowCol.replace('x', r).replace('y', c));
  }

  function init(cfg) {
    setRowCol(cfg.row, cfg.col);
    $(np.config.appContainer).append($DOM);
  }

  return {
    init: init, 
    setRowCol: setRowCol,
    show: show,
    hidden: hidden
  };
})();
