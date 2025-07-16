<?php
/*
Plugin Name: 多标签内容展示（Tabs Block for Classic & Gutenberg）
Plugin URI: https://github.com/2547729123/tabs-block-classic
Description: 支持Classic经典编辑器和Gutenberg编辑器的多标签短代码插件，带两个编辑器的插入按钮，方便快速生成多标签切换内容。
Version: 1.1
Author: 码铃薯
License: GPL2+
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: tabs-block-classic
Domain Path: /languages
*/

if ( ! defined( 'ABSPATH' ) ) {
    exit; // 防止直接访问
}

// 统一版本号定义
if ( ! defined( 'TBC_VERSION' ) ) {
    define( 'TBC_VERSION', '1.1' );
}

/**
 * 注册并预注册前端样式和脚本
 */
function tbc_register_assets() {
    wp_register_style( 'tbc-tabs-style', plugin_dir_url( __FILE__ ) . 'css/tabs-style.css', array(), TBC_VERSION );
    wp_register_script( 'tbc-tabs-script', plugin_dir_url( __FILE__ ) . 'js/tabs-script.js', array( 'jquery' ), TBC_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'tbc_register_assets' );

/**
 * 按需加载前端资源（仅在含短代码页面）
 */
function tbc_enqueue_assets() {
    if ( is_singular() && has_shortcode( get_post()->post_content, 'my_tabs' ) ) {
        wp_enqueue_style( 'tbc-tabs-style' );
        wp_enqueue_script( 'tbc-tabs-script' );
    }
}
add_action( 'wp_enqueue_scripts', 'tbc_enqueue_assets' );

/**
 * 经典编辑器添加 TinyMCE 按钮
 */
function tbc_add_mce_button() {
    if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
        return;
    }
    if ( get_user_option( 'rich_editing' ) !== 'true' ) {
        return;
    }
    add_filter( 'mce_external_plugins', 'tbc_add_mce_plugin' );
    add_filter( 'mce_buttons', 'tbc_register_mce_button' );
}
add_action( 'admin_head', 'tbc_add_mce_button' );

function tbc_add_mce_plugin( $plugin_array ) {
    $plugin_array['tbc_mce_button'] = plugin_dir_url( __FILE__ ) . 'js/tabs-mce-button.js';
    return $plugin_array;
}

function tbc_register_mce_button( $buttons ) {
    array_push( $buttons, 'tbc_mce_button' );
    return $buttons;
}

/**
 * Gutenberg 编辑器加载JS注册侧边栏按钮
 */
function tbc_enqueue_block_editor_assets() {
    // 这里不使用 get_current_screen，直接判断 post 类型是否支持编辑
    $post_types = array( 'post', 'page' );
    $current_screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;

    if ( ! is_admin() ) {
        return;
    }

    if ( $current_screen && in_array( $current_screen->post_type, $post_types ) && current_user_can( 'edit_posts' ) ) {
        wp_enqueue_script(
            'tbc-gutenberg-sidebar-button',
            plugin_dir_url( __FILE__ ) . 'js/gutenberg-insert-tabs.js',
            array( 'wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-compose', 'wp-blocks' ),
            TBC_VERSION,
            true
        );
    }
}
add_action( 'enqueue_block_editor_assets', 'tbc_enqueue_block_editor_assets' );

/**
 * 多标签容器短代码
 */
function tbc_tabs_shortcode( $atts, $content = null ) {
    return '<div class="tbc-tabs-container">' . do_shortcode( $content ) . '</div>';
}
add_shortcode( 'my_tabs', 'tbc_tabs_shortcode' );

/**
 * 单个标签短代码
 */
function tbc_tab_shortcode( $atts, $content = null ) {
    $atts = shortcode_atts( array(
        'title' => __( 'Tab', 'tabs-block-classic' ),
    ), $atts, 'my_tab' );

    // 标题过滤，避免XSS
    $title = sanitize_text_field( $atts['title'] );

    // 允许子短代码，并对内容过滤不安全HTML
    $content = wp_kses_post( do_shortcode( $content ) );

    return '<div class="tbc-tab-content" data-title="' . esc_attr( $title ) . '">' . $content . '</div>';
}
add_shortcode( 'my_tab', 'tbc_tab_shortcode' );
