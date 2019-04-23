/* exported $dlgReplace */
var $dlgReplace = (function() {
  var $dlg = $(''
      + '<div class="notepad-dlg-replace">'
        + '<div class="dialogbox notepad-dlgbox">'
          + '<div class="notepad-dlg-titlebar">'
            + '<p class="title">替换</p>'
            + '<span class="close-btn" title="关闭">✖</span>'
          + '</div>'
          + '<div class="main notepad-dlg-main">'
            + '<label>查找内容(N):<input class="txt-search" type="text" autofocus><br></label>'
            + '<label>替换为(P):<input class="txt-replace" type="text"><br></label>'
            + '<label><input type="checkbox" value="capital-sense">区分大小写(C)</label>'
            + '<input class="btn-search btn" type="button" value="查找下一个(F)">'
            + '<input class="btn-replace btn" type="button" value="替换(R)">'
            + '<input class="btn-replace-all btn" type="button" value="全部替换(A)">'
            + '<input class="btn-cancel btn" type="button" value="取消">'
          + '</div>'
        + '</div>'
      + '</div>');

  var cfg = {
    searchHandler: null,
    replaceHandler: null,
    replaceAllHandler: null
  };

  var $btnClose = $dlg.find('.close-btn'),
      $btnCancel = $dlg.find('.btn-cancel'),
      $btnSearch = $dlg.find('.btn-search'),
      $btnReplace = $dlg.find('.btn-replace'),
      $btnReplaceAll = $dlg.find('.btn-replace-all'),
      $txtSearch = $dlg.find('.txt-search'),
      $txtReplace = $dlg.find('.txt-replace'),
      $titleBar = $dlg.find('.notepad-dlg-titlebar');

  function destoryDlg() { $dlg.remove(); }

  function verify() {
    if($txtSearch.val() !== '') {
      setBtnEnabled(true);
    } else {
      setBtnEnabled(false);
    }
  }

  function setBtnEnabled(enabled) {
    if(enabled) {
      $btnSearch.removeAttr('disabled');
      $btnReplace.removeAttr('disabled');
      $btnReplaceAll.removeAttr('disabled');
    } else {
      $btnSearch.attr('disabled', 'disabled');
      $btnReplace.attr('disabled', 'disabled');
      $btnReplaceAll.attr('disabled', 'disabled');
    }
  }

  function init() {
    $dlg.find('.dialogbox').draggable({handle: $titleBar});

    $txtSearch.val('');
    $txtReplace.val('');
    $txtSearch.focus();

    $dlg.find('input[value="capital-sense"]')[0].checked = false;
    setBtnEnabled(false);
  }

  function getParam() {
    return {
      search: $txtSearch.val(),
      replace: $txtReplace.val(),
      capitalSense: $dlg.find('input[type="checkbox"]:checked').val() === 'capital-sense'
    };
  }

  function searchHandler() { cfg.searchHandler(getParam()); }

  function replaceHandler() { cfg.replaceHandler(getParam()); }

  function replaceAllHandler() { cfg.replaceAllHandler(getParam()); }

  function show(conf) {
    $.extend(cfg, conf);
    $('body').append($dlg);
    init();

    $btnClose.click(destoryDlg);
    $btnCancel.click(destoryDlg);
    $txtSearch.keyup(verify);
    $btnSearch.click(searchHandler);
    $btnReplace.click(replaceHandler);
    $btnReplaceAll.click(replaceAllHandler);

    $dlg.click(function(e) {
      $txtSearch.focus();
      e.stopPropagation();
    });
  }

  return {show: show};
}());
