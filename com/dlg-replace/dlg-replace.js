/* global Dialog: true */
/* exported $dlgReplace */
let $dlgReplace = new Dialog('replace', false);

((dlg) => {
  let content = `
    <label>查找内容(N):<input class="txt-search" type="text" autofocus><br></label>
    <label>替换为(P):<input class="txt-replace" type="text"><br></label>
    <label><input type="checkbox" value="capital-sense">区分大小写(C)</label>
    <input class="btn-search btn" type="button" value="查找下一个(F)">
    <input class="btn-replace btn" type="button" value="替换(R)">
    <input class="btn-replace-all btn" type="button" value="全部替换(A)">
    <input class="btn-cancel btn" type="button" value="取消">`;

  let cfg = {
    searchHandler:     null,
    replaceHandler:    null,
    replaceAllHandler: null
  };

  let $dlg           = dlg.generate(content, '替换');
  let $btnCancel     = $dlg.find('.btn-cancel'),
      $btnSearch     = $dlg.find('.btn-search'),
      $btnReplace    = $dlg.find('.btn-replace'),
      $btnReplaceAll = $dlg.find('.btn-replace-all'),
      $txtSearch     = $dlg.find('.txt-search'),
      $txtReplace    = $dlg.find('.txt-replace');

  let verify = () => setBtnEnabled($txtSearch.val() !== '');

  let setBtnEnabled = (enabled) => {
    if(enabled) {
      $btnSearch.removeAttr('disabled');
      $btnReplace.removeAttr('disabled');
      $btnReplaceAll.removeAttr('disabled');
    } else {
      $btnSearch.attr('disabled', 'disabled');
      $btnReplace.attr('disabled', 'disabled');
      $btnReplaceAll.attr('disabled', 'disabled');
    }
  };

  let initState = () => {
    $txtSearch.val('');
    $txtReplace.val('');
    $txtSearch.focus();

    $dlg.find('input[value="capital-sense"]')[0].checked = false;
    setBtnEnabled(false);
  };

  let getParam = () => {
    return {
      search: $txtSearch.val(),
      replace: $txtReplace.val(),
      capitalSense: $dlg.find('input[type="checkbox"]:checked').val() === 'capital-sense'
    };
  };

  let searchHandler     = () => cfg.searchHandler(getParam());
  let replaceHandler    = () => cfg.replaceHandler(getParam());
  let replaceAllHandler = () => cfg.replaceAllHandler(getParam());

  dlg.show = (conf) => {
    $.extend(cfg, conf);
    $('body').append($dlg);
    dlg.init();
    initState();

    $btnCancel.click(dlg.destory);
    $txtSearch.keyup(verify);
    $btnSearch.click(searchHandler);
    $btnReplace.click(replaceHandler);
    $btnReplaceAll.click(replaceAllHandler);

    $dlg.click((e) => {
      $txtSearch.focus();
      e.stopPropagation();
    });
  };
})($dlgReplace);
