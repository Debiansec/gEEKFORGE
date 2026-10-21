<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
?><!doctype html>
<html <?php language_attributes(); ?>>
<head><meta charset="<?php bloginfo( 'charset' ); ?>"><meta name="viewport" content="width=device-width, initial-scale=1"><?php wp_head(); ?></head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'geekforge' ); ?></a>
<?php if ( function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( 'header' ) ) : ?>
<?php else : ?>
<header class="site-header">
	<div class="site-header__inner">
		<div class="site-branding">
			<?php if ( has_custom_logo() ) : the_custom_logo(); else : ?><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><span class="site-title"><?php bloginfo( 'name' ); ?></span></a><?php endif; ?>
		</div>
		<button class="menu-toggle" type="button" aria-controls="primary-menu" aria-expanded="false"><span class="screen-reader-text"><?php esc_html_e( 'Toggle navigation', 'geekforge' ); ?></span>☰</button>
		<nav class="main-navigation" aria-label="<?php esc_attr_e( 'Primary navigation', 'geekforge' ); ?>">
			<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu', 'fallback_cb' => 'wp_page_menu' ) ); ?>
		</nav>
	</div>
</header>
<?php endif; ?>
