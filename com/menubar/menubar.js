/* exported $menubar*/
var $menubar = (function() {
  function show() {
    alert('hello menubar dialog!');
  }

  return {show: show};
})();

$(function() {
  $menubar.show();
});
