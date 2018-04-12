var $menuBar = (function() {
  function show() {
    $(np.config.appContainer).append('<div class="notepad-menubar">菜单栏</div>');
  }

  return {show: show};
})();

