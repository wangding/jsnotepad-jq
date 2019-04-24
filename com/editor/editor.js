/* exported $editor */
var $editor = (function() {
  var $DOM = $(''
      + '<div class="notepad-editor">'
        + '<textarea spellcheck="false" auto-size="none"></textarea>'
      + '</div>');

  var $textArea = $DOM.find('textarea');

  var cfg = {
    keyupHandler: null,
    wrap: false
  };

  var bSelect = false;

  function resize(isBig) {
    if(isBig) {
      $DOM.css({bottom: '21px'});
    } else {
      $DOM.css({bottom: '0'});
    }
  }

  function focus() {
    $textArea.focus();
  }

  $textArea.keyup(function() {
    cfg.keyupHandler(getRow(), getCol());
  });

  $textArea.keypress(function() {
    cfg.keyupHandler(getRow(), getCol());
  });

  $textArea.mousedown(function() { bSelect = true; });

  $textArea.mouseup(function() { bSelect = false; });

  $textArea.mousemove(function() {
    if(bSelect) cfg.keyupHandler(getRow(), getCol());
  });

  $textArea.click(function() {
    cfg.keyupHandler(getRow(), getCol());
  });

  function getCol() {
    var sub = $textArea.val().substr(0, $textArea[0].selectionStart);
    var subs = sub.split('\n');

    return subs[subs.length-1].length + 1;
  }

  function getRow() {
    var sub = $textArea.val().substr(0, $textArea[0].selectionStart);
    return sub.split('\n').length;
  }

  function getTotalLn() {
    return $textArea.val().split('\n').length;
  }

  function setWrap(bWrap) {
    if(bWrap) {
      $textArea.attr('wrap', 'soft');
      $textArea.css({'overflow-x': 'hidden'});
    } else {
      $textArea.attr('wrap', 'off');
      $textArea.css({'overflow-x': 'scroll'});
    }
  }

  function setFont(e) {
    $textArea.css({'font-family': e.family, 'font-size': e.size + 'pt'});

    if(e.style === '斜体') {
      $textArea.css({'font-style': 'italic'});
      return;
    }

    if(e.style === '粗体') {
      $textArea.css({'font-weight': 'bold'});
      return;
    }

    if(e.style === '粗偏斜体') {
      $textArea.css({'font-weight': 'bold', 'font-style': 'italic'});
      return;
    }
  }

  function selectAll() {
    var n = $textArea.val().length;

    $textArea[0].selectionStart = 0;
    $textArea[0].selectionEnd = n;

    $textArea.select();
  }

  function insertDataTime() {
    var str = $textArea.val();

    var strLeft = str.substring(0, $textArea[0].selectionStart),
        strRight = str.substring($textArea[0].selectionEnd, str.length);

    str = strLeft + new Date().toLocaleString() + strRight;

    $textArea.val(str);
    $textArea.focus();
    cfg.keyupHandler(getRow(), getCol());
  }

  function gotoLn(num) {
    var str = $textArea.val(),
        m = 0;

    var aryStr = str.split('\n');
    for(var i=0; i<num-1; i++) {
      m += aryStr[i].length + 1;
    }

    $textArea[0].selectionStart = m;
    $textArea[0].selectionEnd = m;
    $textArea.focus();
  }

  function show(conf) {
    $.extend(cfg, conf);

    $('body').append($DOM);
    $textArea.trigger('focus');
    setWrap(cfg.wrap);
  }

  return {
    show: show,
    resize: resize,
    focus: focus,
    getTotalLn: getTotalLn,
    getRow: getRow,
    getCol: getCol,
    setWrap: setWrap,
    selectAll: selectAll,
    insertDataTime: insertDataTime,
    gotoLn: gotoLn,
    setFont: setFont
  };
}());
