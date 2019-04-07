/* exported $dlgSearch */
var $dlgSearch = (function() {
  function show() {
    alert('hello search dialog!');
  }

  return {show: show};
})();

$(function() {
  $dlgSearch.show();
});
