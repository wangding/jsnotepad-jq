/* global np: true */
/* exported $editor */
let $editor = (() => {
  let $DOM = $(''
      + '<div class="notepad-editor">'
        + '<textarea spellcheck="false" auto-size="none"></textarea>'
      + '</div>');

  let $textArea = $DOM.find('textarea');

  let cfg = {
    posHandler: null,
    contentHandler: null,
    wrap: false
  };

  let bSelect = false;

  function resize(isBig) {
    if(isBig) {
      $DOM.css({bottom: '21px'});
    } else {
      $DOM.css({bottom: '0'});
    }
  }

  function focus() { $textArea.focus(); }

  $textArea.keyup(() => {
    cfg.posHandler(getRow(), getCol());
    cfg.contentHandler($textArea.val() !== '');
  });

  $textArea.keypress(() => {
    let title = $('title').html();

    if(title[0] !== '*') {
      $('title').text('*' + title);
    }

    np.hasChanged = true;

    cfg.posHandler(getRow(), getCol());
  });

  $textArea.mousedown(() => bSelect = true);

  $textArea.mouseup(() => bSelect = false);

  $textArea.mousemove(() => {
    if(bSelect) cfg.posHandler(getRow(), getCol());
  });

  $textArea.click(() => cfg.posHandler(getRow(), getCol()));

  function getCol() {
    let sub = $textArea.val().substr(0, $textArea[0].selectionStart);
    let subs = sub.split('\n');

    return subs[subs.length-1].length + 1;
  }

  function getRow() {
    let sub = $textArea.val().substr(0, $textArea[0].selectionStart);
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
    np.setFontStyle($textArea, e.style);
  }

  function selectAll() {
    let n = $textArea.val().length;

    $textArea[0].selectionStart = 0;
    $textArea[0].selectionEnd = n;

    $textArea.select();
  }

  function insertDataTime() {
    let str = $textArea.val();

    let strLeft = str.substring(0, $textArea[0].selectionStart),
        strRight = str.substring($textArea[0].selectionEnd, str.length);

    str = strLeft + new Date().toLocaleString() + strRight;

    $textArea.val(str);
    $textArea.focus();
    cfg.posHandler(getRow(), getCol());
  }

  function gotoLn(num) {
    let str = $textArea.val(),
        m = 0;

    let aryStr = str.split('\n');
    for(let i=0; i<num-1; i++) {
      m += aryStr[i].length + 1;
    }

    $textArea[0].selectionStart = m;
    $textArea[0].selectionEnd = m;
    $textArea.focus();
    cfg.posHandler(getRow(), getCol());
  }

  function bingSearch() {
    let start = $textArea[0].selectionStart,
        end   = $textArea[0].selectionEnd;

    if(start === end) {
      window.open('https://cn.bing.com/', '_blank');
    } else {
      let subStr = $textArea.val().substring(start, end);
      window.open('https://cn.bing.com/search?q=' + subStr, '_blank');
    }
  }

  function search(srch) {
    let content  = $textArea.val(),
        srchCtnt = srch.content;

    if(!srch.capitalSense) { // 不区分大小写，把所有字符串都转换成小写
      content  = content.toLowerCase();
      srchCtnt = srchCtnt.toLowerCase();
    }

    let start = $textArea[0].selectionEnd;
    let result;

    if(srch.direction === 'down') { // 查找方向，向下
      result = content.indexOf(srchCtnt, start);
    } else { // srch.direction === 'up'，查找方向，向上
      let subStr = content.substr(0, $textArea[0].selectionStart);
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

  function getContent() { return $textArea.val(); }

  function setContent(data) { $textArea.val(data); }

  function newFile() { $textArea.val(''); }

  function show(conf) {
    $.extend(cfg, conf);

    $('body').append($DOM);
    $textArea.trigger('focus');
    setWrap(cfg.wrap);
  }

  return {
    show,
    resize,
    focus,
    getTotalLn,
    getRow,
    getCol,
    getContent,
    setContent,
    setWrap,
    newFile,
    selectAll,
    insertDataTime,
    gotoLn,
    bingSearch,
    search,
    setFont
  };
})();
