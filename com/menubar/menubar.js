/* exported $menubar*/
let $menubar = (() => {
  let $bar = $('<div class="notepad-menubar"></div>');

  let menuData,           // 所有菜单数据
      menus = [];         // 存放五个下拉菜单的 DOM 对象

  /* 下拉菜单是否展开，没有展开为：-1
   * 展开为：n，n 代表展开的是第几个菜单
   * 0 是文件菜单，1 是编辑菜单，2 是格式菜单
   * 3 是查看菜单，4 是帮助菜单 */
  let active = -1;

  function createMenuTitle() {
    let $titles = $('<ul class="menu-title"></ul>');

    for(let i=0; i<menuData.length; i++) {
      let $title = $('<li class="title"></li>');

      $title.html(menuData[i].title);
      $title.attr('data-id', i);
      $titles.append($title);

      $title.click((e) => {
        let i = Number(e.target.dataset.id);

        if(active === -1) {
          menus[i].css({ display: 'inline-block' });
          active = i;
        } else if(active !== i) {
          menus[active].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          active = i;
        } else {
          menus[active].css({ display: 'none' });
          active = -1;
        }

        e.stopPropagation();
      });

      $title.hover((e) => {
        if(active !== -1) {
          let i = Number(e.target.dataset.id);

          menus[active].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          active = i;
        }
      });
    }

    $bar.append($titles);
  }

  function createMenus() {
    for(let i=0; i<menuData.length; i++) {
      let $menus = $('<ul class="menus"></ul>'),
          items = menuData[i].menuItems;

      for(let j=0; j<items.length; j++) {
        if(items[j].title === 'hr') {
          let $hr = $('<li class="menu-hr"></li>');
          $menus.append($hr);
          continue;
        }

        let $menu = $('<li class="menu-item"></li>');

        $menu.html(items[j].title);
        $menu.attr('data-x', i);
        $menu.attr('data-y', j);

        if(items[j].shortcut !== '') {
          let $shorcut = $('<span class="shortcut"></span>');

          $shorcut.html(items[j].shortcut);
          $menu.append($shorcut);
        }

        if(!items[j].enabled) $menu.addClass('disabled');

        $menus.append($menu);

        $menu.click((e) => {
          e.stopPropagation();

          if($(e.target).hasClass('disabled')) return;

          let i = e.target.dataset.x, j = e.target.dataset.y;

          menus[i].css({display: 'none'});
          active = -1;

          menuData[i].menuItems[j].handler();
        });
      }

      $menus.css({
        width: menuData[i].width,
        left: menuData[i].left,
        display: 'none'
      });

      $bar.append($menus);
      menus.push($menus);
    }
  }

  /**
   * 设置菜单项是否为勾选状态
   *
   * @param row [0-4] 代表文件、编辑、格式、查看、帮助五个菜单栏
   * @param col 代表第几个下拉菜单项
   * @param isEnabled true 为勾选，false 为取消勾选
   */
  function checked(row, col, isChecked) {
    let menuItem = menus[row].find('.menu-item')[col];

    if(isChecked) {
      $(menuItem).prepend($('<span class="checked">✓</span>')[0]);
    } else {
      $(menuItem).find('.checked').remove();
    }
  }

  /**
   * 设置菜单项为启用或禁用状态
   *
   * @param row [0-4] 代表文件、编辑、格式、查看、帮助五个菜单栏
   * @param col 代表第几个下拉菜单项
   * @param isEnabled true 为启用，false 为禁用
   */
  function enabled(row, col, isEnabled) {
    let menuItem = menus[row].find('.menu-item')[col];

    if(isEnabled) {
      $(menuItem).removeClass('disabled');
    } else {
      $(menuItem).addClass('disabled');
    }
  }

  function hideMenu() {
    if(active === -1) return;

    menus[active].css({display: 'none'});
    active = -1;
  }

  function show(data) {
    menuData = data;
    createMenuTitle();
    createMenus();

    $('body').append($bar);
  }

  return {
    show,
    checked,
    enabled,
    hideMenu
  };
})();
