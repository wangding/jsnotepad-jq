/* global Dialog: true */
/* exported $dlgGoto */
let $dlgGoto = new Dialog('goto');

((dlg) => {
  let content = `
    <label for="">行号(L):</label><br>
    <input class="txt-line-num" type="text" autofocus><br>
    <input class="btn-goto btn" type="button" value="转到">
    <input class="btn-cancel btn" type="button" value="取消">`;

  let $dlg        = dlg.generate(content, '转到指定行');
  let $btnCancel  = $dlg.find('.btn-cancel'),
      $btnGoto    = $dlg.find('.btn-goto'),
      $txtLineNum = $dlg.find('.txt-line-num');

  let $errMsg = $('<div class="err-msg"></div>');

  let cfg = {
    lineNum:     1,
    totalLine:   1,
    gotoHandler: null
  };

  let gotoHandler = () => {
    if(!validate()) return;

    cfg.gotoHandler($txtLineNum.val()); 
    dlg.destory();
  };

  let filterKey = (e) => {
    if(!/[0-9]/.test(e.key)) {
      e.preventDefault();
      showErrMsg('你只能在此输入数字!');
    }
  };

  let showErrMsg = (msg) => {
    $errMsg.html(msg);

    $($btnGoto.parent()).append($errMsg);
    setTimeout(() => {
      $errMsg.remove();
      $txtLineNum.select();
    }, 3000);
  };

  let validate = () => {
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
  };

  dlg.show = (conf) => {
    $.extend(cfg, conf);

    $txtLineNum.focus();
    $txtLineNum.select();

    $('body').append($dlg);
    dlg.init();

    $btnCancel.click(dlg.destory);
    $btnGoto.click(gotoHandler);
    $txtLineNum.keypress(filterKey);

    $dlg.click((e) => {
      $txtLineNum.focus();
      $txtLineNum.select();
      e.stopPropagation();
    });

    $txtLineNum.val(cfg.lineNum);
    $txtLineNum.select();
  };
})($dlgGoto);
