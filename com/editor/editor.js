/* exported $editor */
var $editor = (function() {
  function show() {
    alert('hello editor dialog!');
  }

  return {show: show};
})();

$(function() {
  $editor.show();
});
