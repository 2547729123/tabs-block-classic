(function (wp) {
  // 确保 wp.i18n 已加载
  if (!wp || !wp.i18n) {
    console.warn('wp.i18n 未加载，国际化功能可能无法正常工作。');
    return;
  }

  var __ = wp.i18n.__;

  tinymce.create('tinymce.plugins.tbc_mce_button', {
    init: function (editor, url) {
      editor.addButton('tbc_mce_button', {
        text: __('插入Tabs', 'your-text-domain'), // 国际化
        icon: false,
        onclick: function () {
          editor.windowManager.open({
            title: __('生成 Tabs 短代码', 'your-text-domain'),
            body: [
              {
                type: 'textbox',
                name: 'tabCount',
                label: __('标签数量', 'your-text-domain'),
                value: '4',
              },
            ],
            onsubmit: function (e) {
              // 解析输入，转成整数
              var count = parseInt(e.data.tabCount, 10);
              // 严格判断：必须是1~20之间的数字，否则默认4
              if (isNaN(count) || count < 1 || count > 20) {
                count = 4;
              }

              // 生成短代码字符串，注意这里只拼接数字，避免注入风险
              var shortcode = '[my_tabs]\n';
              for (var i = 1; i <= count; i++) {
                shortcode +=
                  '[my_tab title="标签' +
                  i +
                  '"]这里是标签' +
                  i +
                  '的内容[/my_tab]\n';
              }
              shortcode += '[/my_tabs]\n';

              // 插入短代码
              editor.insertContent(shortcode);
            },
          });
        },
      });
    },
  });

  // 注册插件
  tinymce.PluginManager.add('tbc_mce_button', tinymce.plugins.tbc_mce_button);
})(window.wp || {});