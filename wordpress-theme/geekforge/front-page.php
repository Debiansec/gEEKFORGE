<?php
/**
 * Front page template.
 *
 * Elementor can replace this content with a saved page/template; the
 * fallback keeps the theme useful immediately after activation.
 *
 * @package GeekForge
 */

get_header();
?>
<main id="primary" class="site-main">
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : the_post(); ?>
			<div class="entry-content"><?php the_content(); ?></div>
		<?php endwhile; ?>
	<?php else : ?>
		<section class="gf-hero" aria-labelledby="gf-hero-title">
			<div class="gf-hero__inner">
				<span class="gf-eyebrow"><?php esc_html_e( 'Web • Mobile • Growth', 'geekforge' ); ?></span>
				<h1 id="gf-hero-title"><?php esc_html_e( 'We design, build and launch websites that deliver real sales.', 'geekforge' ); ?></h1>
				<p><?php esc_html_e( 'End-to-end digital solutions for South African businesses: conversion-focused WordPress websites, eCommerce stores and Android apps.', 'geekforge' ); ?></p>
				<a class="gf-button" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Start your project', 'geekforge' ); ?></a>
			</div>
		</section>

		<section class="gf-section" aria-labelledby="gf-services-title">
			<div class="gf-section__inner">
				<span class="gf-eyebrow"><?php esc_html_e( 'Core capabilities', 'geekforge' ); ?></span>
				<h2 id="gf-services-title"><?php esc_html_e( 'End-to-end digital solutions built for growth.', 'geekforge' ); ?></h2>
				<div class="gf-grid">
					<article class="gf-card">
						<h3><?php esc_html_e( 'Custom WordPress & Elementor', 'geekforge' ); ?></h3>
						<p><?php esc_html_e( 'Fast, flexible websites your team can edit and your customers enjoy using.', 'geekforge' ); ?></p>
					</article>
					<article class="gf-card">
						<h3><?php esc_html_e( 'eCommerce store development', 'geekforge' ); ?></h3>
						<p><?php esc_html_e( 'WooCommerce storefronts, local payments and a smoother path from product to checkout.', 'geekforge' ); ?></p>
					</article>
					<article class="gf-card">
						<h3><?php esc_html_e( 'Android mobile apps', 'geekforge' ); ?></h3>
						<p><?php esc_html_e( 'Branded mobile experiences that keep your customers connected to your business.', 'geekforge' ); ?></p>
					</article>
					<article class="gf-card">
						<h3><?php esc_html_e( 'Dropshipping websites', 'geekforge' ); ?></h3>
						<p><?php esc_html_e( 'Launch-ready product stores designed for discovery, trust and repeat orders.', 'geekforge' ); ?></p>
					</article>
					<article class="gf-card">
						<h3><?php esc_html_e( 'Website design & setup', 'geekforge' ); ?></h3>
						<p><?php esc_html_e( 'A polished brand presence with hosting, analytics and the essentials configured correctly.', 'geekforge' ); ?></p>
					</article>
					<article class="gf-card">
						<h3><?php esc_html_e( 'SEO optimization & growth', 'geekforge' ); ?></h3>
						<p><?php esc_html_e( 'Technical foundations and content improvements that help the right customers find you.', 'geekforge' ); ?></p>
					</article>
				</div>
			</div>
		</section>

		<section class="gf-section gf-section--muted" aria-labelledby="gf-proof-title">
			<div class="gf-section__inner">
				<span class="gf-eyebrow"><?php esc_html_e( 'Customer proof', 'geekforge' ); ?></span>
				<h2 id="gf-proof-title"><?php esc_html_e( 'Built for real businesses and real customers.', 'geekforge' ); ?></h2>
				<div class="gf-grid">
					<article class="gf-card"><h3><?php esc_html_e( 'Discover Trending Products', 'geekforge' ); ?></h3><p><?php esc_html_e( 'A mobile-first shopping experience for products customers are already searching for.', 'geekforge' ); ?></p></article>
					<article class="gf-card"><h3><?php esc_html_e( 'Fashion Express', 'geekforge' ); ?></h3><p><?php esc_html_e( 'A focused fashion storefront with a fast path from browsing to delivery.', 'geekforge' ); ?></p></article>
					<article class="gf-card"><h3><?php esc_html_e( 'MobileDirect', 'geekforge' ); ?></h3><p><?php esc_html_e( 'A clear service and accessories catalogue that helps customers get support quickly.', 'geekforge' ); ?></p></article>
				</div>
			</div>
		</section>

		<section class="gf-section gf-cta" aria-labelledby="gf-cta-title">
			<div class="gf-section__inner">
				<span class="gf-eyebrow"><?php esc_html_e( 'Ready when you are', 'geekforge' ); ?></span>
				<h2 id="gf-cta-title"><?php esc_html_e( 'Bring your business vision to life.', 'geekforge' ); ?></h2>
				<p><?php esc_html_e( 'Tell us what you are building and we will help you choose the right next step.', 'geekforge' ); ?></p>
				<a class="gf-button" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>"><?php esc_html_e( 'Get a free consultation', 'geekforge' ); ?></a>
			</div>
		</section>
	<?php endif; ?>
</main>
<?php
get_footer();
