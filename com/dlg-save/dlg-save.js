/* global np: true */
/* exported $dlgSave */
let $dlgSave = (() => {
  let $dlg = $(''
        + '<div class="notepad-dlg-mask notepad-dlg-save">'
          + '<div class="dialogbox notepad-dlgbox">'
            + '<div class="notepad-dlg-titlebar">'
              + '<p class="title">记事本</p>'
              + '<span class="close-btn" title="关闭">✖</span>'
            + '</div>'
            + '<div class="main notepad-dlg-main">'
              + '<p>你想将更改保存到&nbsp;<span class="file-name"></span>&nbsp;吗？</p>'
              + '<div class="bottom">'
                + '<input class="btn-save btn" type="button" value="保存(S)" autofocus>'
                + '<input class="btn-not-save btn" type="button" value="不保存(N)">'
                + '<input class="btn-cancel btn" type="button" value="取消">'
              + '</div>'
            + '</div>'
          + '</div>'
        + '</div>');

  let $btnSave    = $dlg.find('.btn-save'),
      $btnNotSave = $dlg.find('.btn-not-save'),
      $btnCancel  = $dlg.find('.btn-cancel'),
      $btnClose   = $dlg.find('.close-btn'),
      $fileName   = $dlg.find('.file-name'),
      $titleBar   = $dlg.find('.notepad-dlg-titlebar');

  let cfg = {
    saveHandler: null,
    notSaveHandler: null
  };

  function destory() { $dlg.remove(); }

  function show(conf) {
    $.extend(cfg, conf);

    $fileName.text(np.fileName);
    $('body').append($dlg);
    $dlg.find('.dialogbox').draggable({handle: $titleBar});
    $btnSave.focus();

    $btnClose.click(destory);
    $btnCancel.click(destory);

    $btnSave.click(() => {
      cfg.saveHandler();
      destory();
    });

    $btnNotSave.click(() => {
      cfg.notSaveHandler();
      destory();
    });

    $dlg.click((e) => {
      $btnSave.focus();
      e.stopPropagation();
    });
  }

  return { show };
})();
