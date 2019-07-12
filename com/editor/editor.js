/* exported $editor */
var $editor = (function() {
  var $DOM = $(''
      + '<div class="notepad-editor">'
        + '<textarea spellcheck="false" auto-size="none"></textarea>'
      + '</div>');

  var $textArea = $DOM.find('textarea');

  var cfg = {
    posHandler: null,
    contentHandler: null,
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
    cfg.posHandler(getRow(), getCol());
    cfg.contentHandler($textArea.val() !== '');
  });

  $textArea.keypress(function() {
    cfg.posHandler(getRow(), getCol());
  });

  $textArea.mousedown(function() { bSelect = true; });

  $textArea.mouseup(function() { bSelect = false; });

  $textArea.mousemove(function() {
    if(bSelect) cfg.posHandler(getRow(), getCol());
  });

  $textArea.click(function() {
    cfg.posHandler(getRow(), getCol());
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
    cfg.posHandler(getRow(), getCol());
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
    cfg.posHandler(getRow(), getCol());
  }

  function bingSearch() {
    var start = $textArea[0].selectionStart,
        end   = $textArea[0].selectionEnd;

    if(start === end) {
      window.open('https://cn.bing.com/', '_blank');
    } else {
      var subStr = $textArea.val().substring(start, end);
      window.open('https://cn.bing.com/search?q=' + subStr, '_blank');
    }
  }

  function search(srch) {
    var content  = $textArea.val(),
        srchCtnt = srch.content;

    if(!srch.capitalSense) { // 不区分大小写，把所有字符串都转换成小写
      content  = content.toLowerCase();
      srchCtnt = srchCtnt.toLowerCase();
    }

    var start = $textArea[0].selectionEnd;
    var result;

    if(srch.direction === 'down') { // 查找方向，向下
      result = content.indexOf(srchCtnt, start);
    } else { // srch.direction === 'up'，查找方向，向上
      var subStr = content.substr(0, $textArea[0].selectionStart);
      result = subStr.lastIndexOf(srchCtnt);
    }

    if(result === -1) {
      alert('找不到 "' + srch.content + '"');
      return;
    }

    $textArea[0].selectionStart = result;
    $textArea[0].selectionEnd = result + srchCtnt.length;

    cfg.posHandler(getRow(), getCol());
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
    bingSearch: bingSearch,
    search: search,
    setFont: setFont
  };
}());
