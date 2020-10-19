/* exported $dlgFont */
/* global comList, np, Dialog: true */
/* eslint no-console: ["error", { allow: ["log"]   }] */
let $dlgFont = new Dialog('font');

((dlg) => {
  let content = ''
    + '<div class="font-family"><p>字体(F):</p></div>'
    + '<div class="font-style"><p>字形(Y):</p></div>'
    + '<div class="font-size"><p>大小(S):</p></div>'
    + '<fieldset class="sample">'
      + '<legend>示例</legend>'
      + '<p class="sample-txt">AaBbYyZz</p>'
    + '</fieldset>'
    + '<div class="script">'
      + '<label>'
        + '脚本(R):<br>'
        + '<select>'
          + '<option value="西欧语言">西欧语言</option>'
          + '<option value="中文 GB2312">中文 GB2312</option>'
        + '</select>'
      + '</label>'
    + '</div>'
    + '<input class="btn-ok btn" type="button" value="确定">'
    + '<input class="btn-cancel btn" type="button" value="取消">';

  let $dlg       = dlg.generate(content, '字体');

  let $btnOk     = $dlg.find('.btn-ok'),
      $btnCancel = $dlg.find('.btn-cancel'),
      $sample    = $dlg.find('.sample-txt');

  let fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', 'Bauhaus 93', 'Bell MT', 'Berlin Sans FB', 'Bernard MT', 'BlackAdder ITC'],
      styles = ['常规', '斜体', '粗体', '粗斜体'],
      sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

  let cfg = {
    family: 'Arial',
    style: '常规',
    size: '16',
    okHandler: null
  };

  function sample() {
    $sample.css({ 'font-family': cfg.family, 'font-size': cfg.size + 'pt' });
    np.setFontStyle($sample, cfg.style);
  }

  function initList() {
    let lstFamily = new comList();
    lstFamily.show({
      container: '.notepad-dlg-font .font-family',
      width: '176px',
      list: fonts,
      select: fonts.indexOf(cfg.family),
      isFont: true,
      selectHandler: (e) => {
        cfg.family = fonts[e];
        sample();
      }
    });

    let lstStyle = new comList();
    lstStyle.show({
      container: '.notepad-dlg-font .font-style',
      width: '132px',
      list: styles,
      select: styles.indexOf(cfg.style),
      isFontStyle: true,
      selectHandler: (e) => {
        cfg.style = styles[e];
        sample();
      }
    });

    let lstSize = new comList();
    lstSize.show({
      container: '.notepad-dlg-font .font-size',
      width: '64px',
      list: sizes,
      select: sizes.indexOf(cfg.size),
      selectHandler: (e) => {
        cfg.size = sizes[e];
        sample();
      }
    });

    sample();
  }

  dlg.show = (conf) => {
    $.extend(cfg, conf);

    $('body').append($dlg);
    dlg.init();
    initList();

    $btnCancel.click(dlg.destory);
    $btnOk.click(() => {
      cfg.okHandler({
        family: cfg.family,
        style:  cfg.style,
        size:   cfg.size
      });

      dlg.destory();
    });

    $dlg.click((e) => e.stopPropagation());
  };
})($dlgFont);
