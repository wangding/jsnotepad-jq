/* exported $dlgGoto */
var $dlgGoto = (function() {
  var DOM = ''
        + '<div class="notepad-dlg-goto">'
          + '<div class="dialogbox">'
            + '<div class="titlebar">'
              + '<p class="title">转到指定行</p>'
              + '<span class="close-btn">✖</span>'
            + '</div>'
            + '<div class="main">'
              + '<label for="">行号(L):</label><br>'
              + '<input class="txt-line-num" type="text" autofocus><br>'
              + '<input class="btn-goto" type="button" value="转到">'
              + '<input class="btn-cancel" type="button" value="取消">'
            + '</div>'
          + '</div>'
        + '</div>';

  var $dlg = $(DOM);

  var $btnClose = $dlg.find('.close-btn'),
      $btnCancel = $dlg.find('.btn-cancel'),
      $btnGoto = $dlg.find('.btn-goto'),
      $txtLineNum = $dlg.find('.txt-line-num');

  var cfg = {
    lineNum: 1,
    totalLine: 1,
    gotoHandler: null
  };

  function destoryDlg() { $dlg.remove(); }

  function gotoHandler() {
    if(!validateLineNum()) return;

    cfg.gotoHandler(); 
    destoryDlg();
  }

  function filterKey(e) {
    if(!/[0-9]/.test(e.key)) {
      e.preventDefault();
      showErrMsg();
    }
  }

  function showErrMsg() {
    alert('show Error Message!');   // TODO: 需要改成气泡框提示错误信息
  }

  function validateLineNum() {
    var n = Number($txtLineNum.val());

    if(n === 0 || n > cfg.totalLine) {
      alert('行数超过了总行数');  // TODO：需要改成自己的对话框
      $txtLineNum.select();
      return false;
    } else {
      return true;
    }
  }

  function show(conf) {
    $.extend(cfg, conf);

    $('body').append($dlg);
    $dlg.find('.dialogbox').draggable({handle: $dlg.find('.titlebar')});

    $btnClose.click(destoryDlg);
    $btnCancel.click(destoryDlg);
    $btnGoto.click(gotoHandler);
    $txtLineNum.keypress(filterKey);

    $txtLineNum.val(cfg.lineNum);
    $txtLineNum.select();
  }

  return {show: show};
})();
