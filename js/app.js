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

np.fileName       = '无标题';// 默认文件名
np.hasChanged     = false;   // 文档是否发生变化

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
