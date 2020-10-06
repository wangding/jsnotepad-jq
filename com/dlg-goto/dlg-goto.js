/* exported $dlgGoto */
let $dlgGoto = (() => {
  let $dlg = $(''
        + '<div class="notepad-dlg-mask notepad-dlg-goto">'
          + '<div class="dialogbox notepad-dlgbox">'
            + '<div class="notepad-dlg-titlebar">'
              + '<p class="title">转到指定行</p>'
              + '<span class="close-btn" title="关闭">✖</span>'
            + '</div>'
            + '<div class="main notepad-dlg-main">'
              + '<label for="">行号(L):</label><br>'
              + '<input class="txt-line-num" type="text" autofocus><br>'
              + '<input class="btn-goto btn" type="button" value="转到">'
              + '<input class="btn-cancel btn" type="button" value="取消">'
            + '</div>'
          + '</div>'
        + '</div>');

  let $btnClose   = $dlg.find('.close-btn'),
      $btnCancel  = $dlg.find('.btn-cancel'),
      $btnGoto    = $dlg.find('.btn-goto'),
      $txtLineNum = $dlg.find('.txt-line-num'),
      $titleBar   = $dlg.find('.notepad-dlg-titlebar');

  let $errMsg = $('<div class="err-msg"></div>');

  let cfg = {
    lineNum: 1,
    totalLine: 1,
    gotoHandler: null
  };

  function destoryDlg() { $dlg.remove(); }

  function gotoHandler() {
    if(!validate()) return;

    cfg.gotoHandler($txtLineNum.val()); 
    destoryDlg();
  }

  function filterKey(e) {
    if(!/[0-9]/.test(e.key)) {
      e.preventDefault();
      showErrMsg('你只能在此输入数字!');
    }
  }

  function showErrMsg(msg) {
    $errMsg.html(msg);

    $($btnGoto.parent()).append($errMsg);
    setTimeout(() => {
      $errMsg.remove();
      $txtLineNum.select();
    }, 3000);
  }

  function validate() {
    if($txtLineNum.val() === '') {
      showErrMsg('行号不能为空！');
      return false;
    }

    let n = Number($txtLineNum.val());

    if(isNaN(n)) {
      showErrMsg('行号不是数字！');
      return false;
    }

    if(n === 0) {
      showErrMsg('行号不能小于 1！');
      $txtLineNum.select();
      return false;
    }

    if(n > cfg.totalLine) {
      showErrMsg('行号超过了总行数！');
      return false;
    }

    return true;
  }

  function show(conf) {
    $.extend(cfg, conf);

    $txtLineNum.focus();
    $txtLineNum.select();

    $('body').append($dlg);
    $dlg.find('.dialogbox').draggable({handle: $titleBar});

    $btnClose.click(destoryDlg);
    $btnCancel.click(destoryDlg);
    $btnGoto.click(gotoHandler);
    $txtLineNum.keypress(filterKey);

    $dlg.click((e) => {
      $txtLineNum.focus();
      $txtLineNum.select();
      e.stopPropagation();
    });

    $txtLineNum.val(cfg.lineNum);
    $txtLineNum.select();
  }

  return { show };
})();
