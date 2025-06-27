(function() {
    tinymce.create('tinymce.plugins.tbc_mce_button', {
        init: function(editor, url) {
            editor.addButton('tbc_mce_button', {
                text: '插入Tabs',
                icon: false,
                onclick: function() {
                    editor.windowManager.open({
                        title: '生成 Tabs 短代码',
                        body: [
                            {
                                type: 'textbox',
                                name: 'tabCount',
                                label: '标签数量',
                                value: '4'
                            }
                        ],
                        onsubmit: function(e) {
                            var count = parseInt(e.data.tabCount) || 4;
                            var shortcode = '[my_tabs]\n';
                            for (var i = 1; i <= count; i++) {
                                shortcode += '[my_tab title="标签' + i + '"]这里是标签' + i + '的内容[/my_tab]\n';
                            }
                            shortcode += '[/my_tabs]\n';
                            editor.insertContent(shortcode);
                        }
                    });
                }
            });
        }
    });
    tinymce.PluginManager.add('tbc_mce_button', tinymce.plugins.tbc_mce_button);
})();