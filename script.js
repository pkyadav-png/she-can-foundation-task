// --- 1. INITIALIZE LENIS SMOOTH SCROLL ---
const initLenis = () => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
};

// --- 2. CUSTOM MOUSE CURSOR ANIMATION ---
const initCustomCursor = () => {
    const cursor = document.querySelector('.custom-cursor');
    
    // Hide default cursor on desktop for custom experience if desired
    // (Optional: standard practice in luxury website clones)
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });

    // Hover Effects on Links & Buttons
    const interactiveElements = document.querySelectorAll('.nav-item, .cta-btn, .primary-btn, .secondary-btn, .pillar-card');
    
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2.5,
                backgroundColor: 'rgba(139, 92, 246, 0.1)', // var(--accent) with opacity
                borderColor: 'var(--accent)',
                duration: 0.3
            });
        });
        elem.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'var(--accent)',
                duration: 0.3
            });
        });
    });
};

// --- 3. GSAP ENTRANCE & SCROLL ANIMATIONS ---
const initAnimations = () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Entry
    gsap.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    // Hero Section Text Reveal
    gsap.from('.hero-heading .anim-line', {
        y: 100,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.from('.hero-subtext, .hero-btns', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 1
    });

    gsap.from('.hero-image-container', {
        opacity: 0,
        x: 50,
        scale: 0.95,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.8
    });

    // About Section Reveal on Scroll
    gsap.from('.about-left h2, .about-left p', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

    // Stats Dynamic Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        
        gsap.fromTo(stat, { innerText: 0 }, {
            innerText: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 }, // Steps of 1
            scrollTrigger: {
                trigger: '.about-section',
                start: 'top 70%',
            },
            onUpdate: function() {
                // Formatting suffix like + if needed
                stat.innerHTML = Math.ceil(stat.innerText) + "+";
            }
        });
    });

    // Pillars Cards Reveal
    gsap.from('.pillar-card', {
        scrollTrigger: {
            trigger: '.pillars-section',
            start: 'top 75%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
    });

    // Join Box Scale Up
    gsap.from('.join-box', {
        scrollTrigger: {
            trigger: '.join-section',
            start: 'top 80%',
        },
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
    });
};

// --- INITIALIZE ALL ON DOM LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initCustomCursor();
    initAnimations();
});