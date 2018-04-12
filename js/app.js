/*
 * Notepad 主程序
 * wangding 408542507@qq.com 2018 
 */

var np = {};                // Notepad 主程序对象

np.config = {
  'appContainer': '.notepad-app'
};

np.bShowStatusBar = true;   // 是否显示状态栏
np.bLineWrap = false;       // 是否换行

$(function() {
  $menuBar.show();
  $editor.show();
  $statusBar.show();
});
