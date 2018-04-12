var $editor = (function() {
  function show() {
    $(np.config.appContainer).append('<div class="notepad-editor">编辑窗口</div>');
  }

  return {show: show};
})();
