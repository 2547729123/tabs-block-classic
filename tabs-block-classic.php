<?php
/*
Plugin Name: 多标签内容展示（Tabs Block for Classic & Gutenberg）
Plugin URI: https://tudoucode.cn
Description: 支持Classic经典编辑器和Gutenberg编辑器的多标签短代码插件，带两个编辑器的插入按钮，方便快速生成多标签切换内容。
Version: 1.1
Author: 码铃薯
Author URI: https://tudoucode.cn
License: GPL2+
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: tabs-block-classic
Domain Path: /languages
*/


if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// 前端加载CSS和JS
function tbc_enqueue_assets() {
    wp_enqueue_style( 'tbc-tabs-style', plugin_dir_url( __FILE__ ) . 'css/tabs-style.css', array(), '1.1' );
    wp_enqueue_script( 'tbc-tabs-script', plugin_dir_url( __FILE__ ) . 'js/tabs-script.js', array('jquery'), '1.1', true );
}
add_action( 'wp_enqueue_scripts', 'tbc_enqueue_assets' );

// 经典编辑器 TinyMCE 按钮注册
function tbc_add_mce_button() {
    if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) return;
    if ( get_user_option( 'rich_editing' ) !== 'true' ) return;

    add_filter( 'mce_external_plugins', 'tbc_add_mce_plugin' );
    add_filter( 'mce_buttons', 'tbc_register_mce_button' );
}
add_action( 'admin_head', 'tbc_add_mce_button' );

function tbc_add_mce_plugin( $plugin_array ) {
    $plugin_array['tbc_mce_button'] = plugin_dir_url( __FILE__ ) . 'admin/tabs-mce-button.js';
    return $plugin_array;
}

function tbc_register_mce_button( $buttons ) {
    array_push( $buttons, 'tbc_mce_button' );
    return $buttons;
}

// Gutenberg 编辑器加载JS注册侧边栏按钮
function tbc_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'tbc-gutenberg-sidebar-button',
        plugin_dir_url( __FILE__ ) . 'admin/gutenberg-insert-tabs.js',
        array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-compose', 'wp-blocks' ),
        '1.1',
        true
    );
}
add_action( 'enqueue_block_editor_assets', 'tbc_enqueue_block_editor_assets' );

// 短代码定义
function tbc_tabs_shortcode( $atts, $content = null ) {
    $output = '<div class="tbc-tabs-container">' . do_shortcode( $content ) . '</div>';
    return $output;
}
add_shortcode( 'my_tabs', 'tbc_tabs_shortcode' );

function tbc_tab_shortcode( $atts, $content = null ) {
    $atts = shortcode_atts( array(
        'title' => 'Tab',
    ), $atts, 'my_tab' );

    $title = esc_html( $atts['title'] );
    $content = do_shortcode( $content );

    return '<div class="tbc-tab-content" data-title="' . $title . '">' . $content . '</div>';
}
add_shortcode( 'my_tab', 'tbc_tab_shortcode' );
