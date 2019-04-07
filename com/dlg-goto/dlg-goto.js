/* exported $dlgGoto */
var $dlgGoto = (function() {
  function show() {
    alert('hello goto dialog!');
  }

  return {show: show};
})();

$(function() {
  $dlgGoto.show();
});
