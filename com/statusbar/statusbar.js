/* exported $statusbar */
var $statusbar = (function() {
  function show() {
    alert('hello statusbar dialog!');
  }

  return {show: show};
})();

$(function() {
  $statusbar.show();
});
