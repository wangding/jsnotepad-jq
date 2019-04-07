/* exported $dlgFont */
var $dlgFont= (function() {
  function show() {
    alert('hello font dialog!');
  }

  return {show: show};
})();

$(function() {
  $dlgFont.show();
});
