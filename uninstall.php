<?php
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

// tabs-block-classic 插件目前不存储任何数据库选项或自定义数据表，
// 所以卸载时不需要额外清理操作。

// 如果未来版本增加了数据库或选项存储，请在这里删除。
