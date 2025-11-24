// ===========================
// Greeting Banner Close
// ===========================
const greetingBanner = document.getElementById('greetingBanner');
const greetingClose = document.getElementById('greetingClose');

if (greetingClose && greetingBanner) {
    greetingClose.addEventListener('click', () => {
        greetingBanner.classList.add('hidden');
        setTimeout(() => {
            greetingBanner.style.display = 'none';
        }, 300);
    });
}

// ===========================
// Smooth Scroll Navigation
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// ===========================
// Mobile Navigation Toggle
// ===========================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// ===========================
// Scroll-Triggered Animations
// ===========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a slight delay based on the element's delay attribute
            const delay = entry.target.dataset.aosDelay || 0;
            setTimeout(() => {
                entry.target.classList.add('aos-animate');
            }, delay);
        } else {
            // Optional: Remove animation when scrolling back up for re-animation
            // entry.target.classList.remove('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ===========================
// Enhanced Timeline Animations
// ===========================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger the animation of timeline items - faster
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
            }, index * 80); // 80ms delay between each item (was 150ms)
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe timeline items separately for enhanced effect
document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// ===========================
// Navbar Background on Scroll
// ===========================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove shadow based on scroll position
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===========================
// Active Navigation Link
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Typing Effect for Hero (Optional Enhancement)
// ===========================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ===========================
// Skill Tag Hover Effects
// ===========================
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-4px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Project Card Interactions
// ===========================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        // Add subtle rotation effect
        this.style.transform = 'translateY(-8px) rotateX(2deg)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// ===========================
// Timeline Item Expand/Collapse (Optional)
// ===========================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
    const content = item.querySelector('.timeline-content');
    const details = item.querySelector('.timeline-details');

    // Initially show all details (can be modified for collapse functionality)
    if (details) {
        details.style.maxHeight = details.scrollHeight + 'px';
    }

    // Optional: Add click to expand/collapse
    content.addEventListener('click', function () {
        if (details) {
            if (details.style.maxHeight === '0px') {
                details.style.maxHeight = details.scrollHeight + 'px';
                details.style.opacity = '1';
            } else {
                details.style.maxHeight = '0px';
                details.style.opacity = '0';
            }
        }
    });
});

// ===========================
// Parallax Effect for Hero Background
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// Lazy Loading for Performance
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Copy Email to Clipboard
// ===========================
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', function (e) {
        e.preventDefault();
        const email = this.textContent;

        navigator.clipboard.writeText(email).then(() => {
            // Show temporary notification
            const notification = document.createElement('div');
            notification.textContent = 'Email copied to clipboard!';
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: linear-gradient(135deg, #00d9ff 0%, #00a8cc 100%);
                color: #0a0e27;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                font-weight: 600;
                box-shadow: 0 4px 16px rgba(0, 217, 255, 0.3);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        });

        // Still open email client
        window.location.href = this.href;
    });
}

// ===========================
// Add CSS for Notifications
// ===========================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--color-primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===========================
// Performance Optimization
// ===========================
// Debounce scroll events for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===========================
// Console Easter Egg
// ===========================
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
console.log('%cInterested in how this was built?', 'font-size: 14px; color: #cbd5e1;');
console.log('%cThis interactive CV showcases modern web development with vanilla JavaScript, CSS animations, and responsive design.', 'font-size: 12px; color: #94a3b8;');
console.log('%cFeel free to reach out: ademenezes1@worldbank.org', 'font-size: 12px; color: #00d9ff;');
