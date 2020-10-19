/* global np, Dialog: true */
/* exported $dlgSave */
let $dlgSave = new Dialog('save');

((dlg) => {
  let content = ''
    + '<p>你想将更改保存到&nbsp;<span class="file-name"></span>&nbsp;吗？</p>'
    + '<div class="bottom">'
      + '<input class="btn-save btn" type="button" value="保存(S)" autofocus>'
      + '<input class="btn-not-save btn" type="button" value="不保存(N)">'
      + '<input class="btn-cancel btn" type="button" value="取消">'
    + '</div>';

  let $dlg        = dlg.generate(content, '记事本');
  let $btnSave    = $dlg.find('.btn-save'),
      $btnNotSave = $dlg.find('.btn-not-save'),
      $btnCancel  = $dlg.find('.btn-cancel'),
      $fileName   = $dlg.find('.file-name');

  let cfg = {
    saveHandler: null,
    notSaveHandler: null
  };

  dlg.show = (conf) => {
    $.extend(cfg, conf);

    $fileName.text(np.fileName);
    $('body').append($dlg);
    dlg.init();

    $btnSave.focus();

    $btnCancel.click(dlg.destory);

    $btnSave.click(() => {
      cfg.saveHandler();
      dlg.destory();
    });

    $btnNotSave.click(() => {
      cfg.notSaveHandler();
      dlg.destory();
    });

    $dlg.click((e) => {
      $btnSave.focus();
      e.stopPropagation();
    });
  };
})($dlgSave);
