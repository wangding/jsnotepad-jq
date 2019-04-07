/* exported $dlgReplace */
var $dlgReplace = (function() {
  function show() {
    alert('hello replace dialog!');
  }

  return {show: show};
})();

$(function() {
  $dlgReplace.show();
});
