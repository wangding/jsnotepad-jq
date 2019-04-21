/*
 * Notepad 主程序
 * wangding 408542507@qq.com 2018 
 */

var np = {};                // Notepad 主程序对象

np.config = {
  'appContainer': '.notepad-app'
};

np.bShowStatusBar = false;   // 是否显示状态栏
np.bWrap = false;            // 是否换行

/* global $menubar $editor $statusBar: true */
$(function() {
  $menubar.show(np.menuData);
  $editor.show({
    keyupHandler: function(row, col) {
      $statusBar.setRowCol(row, col);
    }
  });
  $statusBar.init();
  $statusBar.display(false);

  var $app = $('body');

  $app.click(function() {
    $menubar.hideMenu();
    $editor.focus();
  });
});
