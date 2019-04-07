/* exported $dlgAbout */
var $dlgAbout = (function() {
  function show() {
    alert('hello about dialog!');
  }

  return {show: show};
})();

$(function() {
  $dlgAbout.show();
});
