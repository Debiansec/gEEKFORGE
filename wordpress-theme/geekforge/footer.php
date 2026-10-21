<?php if ( ! defined( 'ABSPATH' ) ) { exit; } ?>
<?php if ( function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( 'footer' ) ) : ?>
<?php else : ?>
<footer class="site-footer">
	<div class="site-footer__inner">
		<div class="site-footer__grid">
			<div><h2><?php bloginfo( 'name' ); ?></h2><p><?php esc_html_e( 'High-performance websites, eCommerce stores and Android apps for ambitious South African businesses.', 'geekforge' ); ?></p></div>
			<div><h3><?php esc_html_e( 'Explore', 'geekforge' ); ?></h3><?php wp_nav_menu( array( 'theme_location' => 'footer', 'fallback_cb' => false ) ); ?></div>
			<div><?php if ( is_active_sidebar( 'footer-1' ) ) { dynamic_sidebar( 'footer-1' ); } else { ?><h3><?php esc_html_e( 'Start a project', 'geekforge' ); ?></h3><p><a href="mailto:<?php echo esc_attr( get_theme_mod( 'geekforge_email', 'admin@geekforge.co.za' ) ); ?>"><?php echo esc_html( get_theme_mod( 'geekforge_email', 'admin@geekforge.co.za' ) ); ?></a></p><p><?php echo esc_html( get_theme_mod( 'geekforge_phone', '+27 50 058 6175' ) ); ?></p><?php } ?></div>
		</div>
		<div class="site-footer__bottom"><?php printf( esc_html__( '© %1$s %2$s. All rights reserved.', 'geekforge' ), esc_html( gmdate( 'Y' ) ), esc_html( get_bloginfo( 'name' ) ) ); ?></div>
	</div>
</footer>
<?php endif; ?>
<?php wp_footer(); ?></body></html>
