<?php
/**
 * GeekForge theme setup and integrations.
 *
 * @package GeekForge
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

function geekforge_setup() {
	load_theme_textdomain( 'geekforge', get_template_directory() . '/languages' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array( 'height' => 120, 'width' => 420, 'flex-height' => true, 'flex-width' => true ) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-background', array( 'default-color' => 'ffffff' ) );
	add_theme_support( 'responsive-embeds' );
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'geekforge' ),
		'footer'  => __( 'Footer Menu', 'geekforge' ),
	) );
}
add_action( 'after_setup_theme', 'geekforge_setup' );

function geekforge_content_width() { $GLOBALS['content_width'] = apply_filters( 'geekforge_content_width', 1180 ); }
add_action( 'after_setup_theme', 'geekforge_content_width', 0 );

function geekforge_widgets_init() {
	register_sidebar( array( 'name' => __( 'Sidebar', 'geekforge' ), 'id' => 'sidebar-1', 'description' => __( 'Widgets shown on posts and archives.', 'geekforge' ), 'before_widget' => '<section id="%1$s" class="widget %2$s">', 'after_widget' => '</section>', 'before_title' => '<h2 class="widget-title">', 'after_title' => '</h2>' ) );
	register_sidebar( array( 'name' => __( 'Footer', 'geekforge' ), 'id' => 'footer-1', 'description' => __( 'Widgets shown in the footer.', 'geekforge' ), 'before_widget' => '<section id="%1$s" class="widget %2$s">', 'after_widget' => '</section>', 'before_title' => '<h3 class="widget-title">', 'after_title' => '</h3>' ) );
}
add_action( 'widgets_init', 'geekforge_widgets_init' );

function geekforge_scripts() {
	wp_enqueue_style( 'geekforge-fonts', 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap', array(), null );
	wp_enqueue_style( 'geekforge-style', get_stylesheet_uri(), array(), '1.0.0' );
	wp_enqueue_script( 'geekforge-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'geekforge_scripts' );

function geekforge_elementor_support() {
	add_theme_support( 'elementor' );
}
add_action( 'after_setup_theme', 'geekforge_elementor_support' );

function geekforge_elementor_locations( $locations ) {
	$locations['header'] = __( 'Header', 'geekforge' );
	$locations['footer'] = __( 'Footer', 'geekforge' );
	$locations['single'] = __( 'Single Post', 'geekforge' );
	$locations['archive'] = __( 'Archive', 'geekforge' );
	return $locations;
}
add_filter( 'elementor/theme/register_locations', 'geekforge_elementor_locations' );

function geekforge_customize_register( $wp_customize ) {
	$wp_customize->add_section( 'geekforge_contact', array( 'title' => __( 'GeekForge Contact', 'geekforge' ), 'priority' => 30 ) );
	$wp_customize->add_setting( 'geekforge_phone', array( 'default' => '+27 50 058 6175', 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'geekforge_phone', array( 'label' => __( 'Phone', 'geekforge' ), 'section' => 'geekforge_contact', 'type' => 'text' ) );
	$wp_customize->add_setting( 'geekforge_email', array( 'default' => 'admin@geekforge.co.za', 'sanitize_callback' => 'sanitize_email' ) );
	$wp_customize->add_control( 'geekforge_email', array( 'label' => __( 'Email', 'geekforge' ), 'section' => 'geekforge_contact', 'type' => 'email' ) );
}
add_action( 'customize_register', 'geekforge_customize_register' );

function geekforge_body_classes( $classes ) {
	if ( is_front_page() ) { $classes[] = 'geekforge-front-page'; }
	return $classes;
}
add_filter( 'body_class', 'geekforge_body_classes' );
