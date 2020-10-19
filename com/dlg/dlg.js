/* exported Dialog */
function Dialog(name, model = true) {
  let $dlg = $(''
    + '<div class="notepad-dlg-mask">'
      + '<div class="dialogbox notepad-dlgbox">'
        + '<div class="notepad-dlg-titlebar">'
          + '<p class="title"></p>'
          + '<span class="close-btn" title="关闭">✖</span>'
        + '</div>'
        + '<div class="main notepad-dlg-main">'
        + '</div>'
      + '</div>'
    + '</div>');

  let $btnClose = $dlg.find('.close-btn'),
      $titleBar = $dlg.find('.notepad-dlg-titlebar'),
      clsName   = 'notepad-dlg-' + name;

  this.destory = () => $dlg.remove();

  this.generate = (content, title) => {
    let $content = $dlg.find('.main'),
        $title   = $dlg.find('.title');

    $content.html(content);
    $title.html(title);
    $dlg.addClass(clsName);

    if(!model) $dlg.removeClass('notepad-dlg-mask');

    return $dlg;
  };

  this.init = () => {
    $dlg.find('.dialogbox').draggable({handle: $titleBar});
    $btnClose.click(this.destory);
  };
}
