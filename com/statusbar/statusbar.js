/* exported $statusBar */
var $statusBar = (function() {
  var $stBar = $(''
   + '<div class="notepad-statusbar">'
    + '<div class="left-panel"></div>'
    + '<div class="right-panel">'
      + '<p class="row-col"></p>'
    + '</div>'
   + '</div>');

  var $rowCol = $stBar.find('.row-col'),
      strRowCol = '第&nbsp;x&nbsp;行，第&nbsp;y&nbsp;列',
      cfg = {row: 1, col: 1};

  function display(isVisable) {
    if(isVisable) {
      $stBar.css('display', 'block');
    } else {
      $stBar.css('display', 'none');
    }
  }

  function setRowCol(r, c) {
    $rowCol.html(strRowCol.replace('x', r).replace('y', c));
  }

  function init(conf) {
    $.extend(cfg, conf);
    setRowCol(cfg.row, cfg.col);
    $('body').append($stBar);
  }

  return {
    init: init, 
    setRowCol: setRowCol,
    display: display
  };
}());
