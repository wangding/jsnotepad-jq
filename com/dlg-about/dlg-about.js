/* global Dialog: true */
/* exported $dlgAbout */
let $dlgAbout = new Dialog('about');

((dlg) => {
  const reposURL = 'https://github.com/wangding/jsnotepad/';
  let content = `
    <h1 class="slogan">JSNotepad</h1>
    <hr>
    <img class="app-logo" src="../../images/notepad-icon-32.png" alt="JSNotepad">
    <div class="info">
      <p>作者：王顶</p>
      <p>QQ：408542507</p>
      <p>仓库地址：<a href="${reposURL}" target="_blank">${reposURL}</a></p>
    </div>
    <input class="btn-ok btn" type="button" value="确定" autofocus>`;

  let $dlg   = dlg.generate(content, '关于“记事本”');
  let $btnOk = $dlg.find('.btn-ok');

  dlg.show = () => {
    $('body').append($dlg);
    dlg.init();
    $btnOk.focus();

    $btnOk.click(dlg.destory);

    $dlg.click((e) => {
      $btnOk.focus();
      e.stopPropagation();
    });
  };
})($dlgAbout);
