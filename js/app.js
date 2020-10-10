/*
 * Notepad 主程序
 * wangding 408542507@qq.com 2018
 */

let np = {};                // Notepad 主程序对象

np.config = {
  'appContainer': '.notepad-app'
};

np.bShowStatusBar = localStorage.getItem('bShowStatusBar') || false;   // 是否显示状态栏
np.bWrap          = localStorage.getItem('bWrap') || false;            // 是否换行
np.fontFamily     = localStorage.getItem('fontFamily') || 'Arial';     // 默认字体
np.fontStyle      = localStorage.getItem('fontStyle') || '常规';       // 默认字体样式
np.fontSize       = localStorage.getItem('fontSize') || '16';          // 默认字体大小：16pt

np.fileName       = '无标题';   // 默认文件名
np.hasChanged     = false;      // 文档是否发生变化

np.saveFile = () => {
  const a = document.createElement('a'),
        c = $editor.getContent(),
        b = new Blob([c], { type: 'plain/text' });

  a.href = URL.createObjectURL(b);
  a.download = np.fileName + '.txt';
  a.click();
  URL.revokeObjectURL(a.href);
};

np.openFile = () => {
  const dom = document.createElement('input');
  dom.type = 'file';
  dom.accept = '.txt';
  dom.click();

  dom.onchange = () => {
    let reader = new FileReader();
    reader.readAsText(dom.files[0]);

    let fileName = dom.files[0].name.split('.')[0];
    $('title').text(fileName + ' - 记事本');
    np.fileName = fileName;

    reader.onloadend = (e) => $editor.setContent(e.currentTarget.result);
  };
};

np.newFile = () => {
  $editor.newFile();
  $('title').text('无标题 - 记事本');
  np.hasChanged = false;
};

np.setFontStyle = (item, style) => {
  let conf = {
    '常规':   {'font-weight': 'normal', 'font-style': 'normal'},
    '斜体':   {'font-weight': 'normal', 'font-style': 'italic'},
    '粗体':   {'font-weight': 'bold',   'font-style': 'normal'},
    '粗斜体': {'font-weight': 'bold',   'font-style': 'italic'}
  };

  item.css(conf[style]);
};

np.fontHandler = (e) => {
  np.fontFamily = e.family;
  np.fontStyle  = e.style;
  np.fontSize   = e.size;

  localStorage.setItem('fontFamily', np.fontFamily);
  localStorage.setItem('fontStyle',  np.fontStyle);
  localStorage.setItem('fontSize',   np.fontSize);

  $editor.setFont(e);
};

/* global $menubar $editor $statusBar: true */
$(() => {
  $menubar.show(np.menuData);
  $editor.show({
    posHandler: (row, col) => {
      $statusBar.setRowCol(row, col);
    },
    contentHandler: (isEmpty) => {
      $menubar.enabled(1, 6, isEmpty);
    }
  });

  $editor.setFont({
    family: np.fontFamily,
    style:  np.fontStyle,
    size:   np.fontSize
  });

  $statusBar.init();
  $statusBar.display(np.bShowStatusBar === 'true');
  $statusBar.display(np.bWrap === 'false');

  $menubar.checked(2, 0, np.bWrap === 'true');
  $menubar.checked(3, 0, np.bShowStatusBar === 'true');
  $menubar.enabled(3, 0, np.bWrap === 'false');

  let $app = $('body');

  $app.click(() => {
    $menubar.hideMenu();
    $editor.focus();
  });
});
