jQuery(document).ready(function($) {
    $('.tbc-tabs-container').each(function() {
        var $container = $(this);
        var $tabs = $container.find('.tbc-tab-content');
        var $titlesWrapper = $('<div class="tbc-tab-titles"></div>');

        $tabs.each(function(index) {
            var $tab = $(this);
            var title = $tab.data('title') || 'Tab ' + (index + 1);
            var $title = $('<div class="tbc-tab-title">' + title + '</div>');

            $title.on('click', function() {
                $container.find('.tbc-tab-title').removeClass('active');
                $container.find('.tbc-tab-content').removeClass('active');
                $title.addClass('active');
                $tab.addClass('active');
            });

            $titlesWrapper.append($title);
        });

        $container.prepend($titlesWrapper);
        $tabs.first().addClass('active');
        $titlesWrapper.children().first().addClass('active');
    });
});
