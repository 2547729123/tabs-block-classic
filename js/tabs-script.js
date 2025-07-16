jQuery(document).ready(function($) {
    $('.tbc-tabs-container').each(function() {
        var $container = $(this);
        var $tabs = $container.find('.tbc-tab-content');
        var $titlesWrapper = $('<div class="tbc-tab-titles"></div>');

        $tabs.each(function(index) {
            var $tab = $(this);
            // 安全获取标题，避免XSS
            var title = $tab.data('title') || 'Tab ' + (index + 1);
            var $title = $('<div class="tbc-tab-title"></div>').text(title);

            $title.on('click', function() {
                // 缓存DOM查询，提升性能
                var $allTitles = $container.find('.tbc-tab-title');
                var $allContents = $container.find('.tbc-tab-content');

                $allTitles.removeClass('active');
                $allContents.removeClass('active');

                $title.addClass('active');
                $tab.addClass('active');
            });

            $titlesWrapper.append($title);
        });

        // 把标题容器插入到tab内容之前
        $container.prepend($titlesWrapper);

        // 默认激活第一个tab和标题
        $tabs.first().addClass('active');
        $titlesWrapper.children().first().addClass('active');
    });
});
