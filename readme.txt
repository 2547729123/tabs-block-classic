=== 多标签内容展示（Tabs Block for Classic & Gutenberg） ===
贡献者: 码铃薯
插件作者主页: https://tudoucode.cn
标签: 多标签, tabs, 经典编辑器, Gutenberg, 短代码, 内容切换
需要的最低版本: 5.0
测试版本: 6.3
稳定版本: 1.1
许可证: GPLv2 或更高
许可证 URI: https://www.gnu.org/licenses/gpl-2.0.html

多标签内容展示（Tabs Block for Classic & Gutenberg）是一款支持 WordPress 经典编辑器和 Gutenberg 编辑器的多标签短代码插件，提供插入按钮，方便快速生成多标签切换内容。

== 描述 ==

多标签内容展示插件（Tabs Block for Classic & Gutenberg）为你的文章内容提供简洁优雅的多标签页展示功能。它支持：

* 经典编辑器工具栏“插入Tabs”按钮，弹窗生成多标签短代码  
* Gutenberg 编辑器“更多菜单”侧边栏插入Tabs短代码按钮  
* 简单灵活的短代码格式，兼容主流主题，响应式设计  
* 前端自动生成可点击切换的多标签内容区，提升内容展示效果  

使用短代码格式示例：

    [my_tabs]
    [my_tab title="标签1"]这里是标签1内容[/my_tab]
    [my_tab title="标签2"]这里是标签2内容[/my_tab]
    [/my_tabs]

== 安装 ==

1. 上传插件文件夹到 `/wp-content/plugins/` 目录，或直接通过后台上传 ZIP 安装  
2. 在 WordPress 后台激活插件  
3. 经典编辑器会出现“插入Tabs”按钮，Gutenberg 编辑器“更多菜单”侧边栏出现插入按钮  
4. 在编辑器内点击按钮，根据提示输入标签数量，自动生成短代码  
5. 保存文章并查看多标签切换效果  

== 常见问题 ==

= 插件支持哪些编辑器？ =  
支持 WordPress 经典编辑器和 Gutenberg 编辑器。经典编辑器有工具栏按钮，Gutenberg 编辑器通过侧边栏菜单插入短代码。

= 短代码格式是什么？ =  
使用 `[my_tabs]` 包裹所有 `[my_tab title="标签名"]内容[/my_tab]`，例：

    [my_tabs]
    [my_tab title="标签1"]内容[/my_tab]
    [/my_tabs]

= 插件能否自定义样式？ =  
可以通过主题或自定义 CSS 调整 `.tbc-tabs-container` 及相关类名的样式。

= 单个标签也需要用 `[my_tabs]` 包裹吗？ =  
是的，为保证前端JS正常工作，哪怕只有一个标签，也需用 `[my_tabs]` 包裹。

== 更新日志 ==

= 1.1 =  
* 新增 Gutenberg 编辑器侧边栏插入短代码按钮  
* 优化经典编辑器插入按钮弹窗交互  
* 修复部分小问题，提升兼容性  

= 1.0 =  
* 发布首个支持经典编辑器多标签短代码插件版本  
* 支持前端多标签切换显示功能  

== 版权和许可 ==

本插件遵循 GPL v2 或更高版本开源协议。

---

开发者：码铃薯  
官网：https://tudoucode.cn