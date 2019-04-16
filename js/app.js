/*
 * Notepad 主程序
 * wangding 408542507@qq.com 2018 
 */

var np = {};                // Notepad 主程序对象

np.config = {
  'appContainer': '.notepad-app'
};

np.bShowStatusBar = false;   // 是否显示状态栏
np.bLineWrap = false;        // 是否换行

/* global $menubar $editor $statusbar: true */
/*
$(function() {
  $menubar.show();
  $editor.show();
  //$statusbar.init({'row': 1, 'col': 1});
  $statusbar.show();
});
*/
