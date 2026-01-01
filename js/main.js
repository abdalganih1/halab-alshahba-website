/**
 * Halab Al Shahba - Main JavaScript
 * Navigation, Interactions & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initStickyHeader();
    initScrollAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const toggle = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__menu');
    const dropdowns = document.querySelectorAll('.nav__dropdown');

    // Mobile menu toggle
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav__link:not(.nav__dropdown > .nav__link)').forEach(link => {
        link.addEventListener('click', () => {
            toggle?.classList.remove('active');
            menu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Mobile dropdown toggle
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.nav__link');

        trigger?.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && menu?.classList.contains('active')) {
            toggle?.classList.remove('active');
            menu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Sticky Header with Scroll Effect
 */
function initStickyHeader() {
    const header = document.querySelector('.header');

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction (optional)
        /*
        if (currentScroll > lastScroll && currentScroll > 100) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        */

        lastScroll = currentScroll;
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scroll to Section
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = section.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

/**
 * Phone number click handler for analytics
 */
function trackPhoneClick(phoneNumber) {
    // Add analytics tracking here if needed
    console.log('Phone clicked:', phoneNumber);
}
