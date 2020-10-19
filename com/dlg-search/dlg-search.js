/* global Dialog: true */
/* exported $dlgSearch */
let $dlgSearch = new Dialog('search', false);

((dlg) => {
  let content = ''
    + '<label>查找内容(N): <input class="txt-content" type="text" autofocus></label><br>'
    + '<label><input type="checkbox" value="capital-sense">区分大小写(C)</label>'
    + '<fieldset class="search-direction">'
      + '<legend>方向</legend>'
      + '<label><input type="radio" name="direction" value="up">向上(U)</label>'
      + '<label><input type="radio" name="direction" value="down" checked>向下(D)</label>'
    + '</fieldset>'
    + '<input class="btn-search btn" type="button" value="查找下一个(F)" disabled>'
    + '<input class="btn-cancel btn" type="button" value="取消">';

  let $dlg        = dlg.generate(content, '查找');
  let $btnCancel  = $dlg.find('.btn-cancel'),
      $btnSearch  = $dlg.find('.btn-search'),
      $txtContent = $dlg.find('.txt-content');

  function verify() {
    if($txtContent.val() !== '') {
      $btnSearch.removeAttr('disabled');
    } else {
      $btnSearch.attr('disabled', 'disabled');
    }
  }

  function initState() {
    $dlg.find('input[value="up"]').removeAttr('checked');
    $dlg.find('input[value="down"]')[0].checked = true;
    $dlg.find('input[type="checkbox"]').removeAttr('checked');
    $btnSearch.attr('disabled', 'disabled');
    $txtContent.val('');
    $txtContent.focus();
  }

  dlg.show = (searchHandler) => {
    $('body').append($dlg);
    dlg.init();
    initState();

    $btnCancel.click(dlg.destory);
    $txtContent.keyup(verify);
    $btnSearch.click(() => searchHandler({
      content: $txtContent.val(),
      capitalSense: $dlg.find('input[type="checkbox"]:checked').val() === 'capital-sense',
      direction: $dlg.find('input[name="direction"]:checked').val()
    }));

    $txtContent.click((e) => e.stopPropagation());
  };
})($dlgSearch);
