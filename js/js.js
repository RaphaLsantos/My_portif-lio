// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initSidebar();
    initScrollAnimations();
    initSmoothScroll();
    initMagneticButtons();
    initParallax();
    initScrollReveal();
});

// ============================================
// CURSOR CUSTOMIZADO
// ============================================
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorBlur = document.querySelector('.cursor-blur');
    const body = document.body;

    if (window.innerWidth > 768) {
        body.classList.add('cursor-enabled');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorBlur.style.left = e.clientX + 'px';
            cursorBlur.style.top = e.clientY + 'px';
        });

        const interactiveElements = document.querySelectorAll('a, button, .social-link, .skill-item, .project-card, .contact-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'var(--accent-light)';
                cursorBlur.style.opacity = '0.8';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--accent)';
                cursorBlur.style.opacity = '0.5';
            });
        });
    }
}

// ============================================
// SIDEBAR NAVIGATION
// ============================================
function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // Toggle sidebar no mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Fechar sidebar ao clicar em um link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    });

    // Atualizar nav item ativo ao scrollar
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });
    });

    // Fechar sidebar ao clicar fora dela no mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// ============================================
// SCROLL SUAVE
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// SISTEMA AVANÇADO DE SCROLL REVEAL
// ============================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = index * 0.1;
                entry.target.style.animationDelay = delay + 's';
                entry.target.style.opacity = '1';
                entry.target.style.animation = entry.target.classList.contains('reveal-scale') 
                    ? 'revealScale 0.8s ease-out forwards' 
                    : 'revealText 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .reveal-scale, .project-card, .skill-category, .certificate-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// ANIMAÇÕES DE SCROLL
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-card, .skill-category, .certificate-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;

            if (distance < maxDistance) {
                const moveX = (x / distance) * (maxDistance - distance) * 0.3;
                const moveY = (y / distance) * (maxDistance - distance) * 0.3;

                button.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// PARALLAX
// ============================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-img, .about-img, .image-frame');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const distance = scrollPosition - elementPosition;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.transform = `translateY(${distance * 0.5}px)`;
            }
        });
    });
}

// ============================================
// ANIMAÇÃO DE NÚMEROS (STATS)
// ============================================
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = finalValue / 50;

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + (target.textContent.includes('+') ? '+' : target.textContent.includes('%') ? '%' : '');
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue) + (target.textContent.includes('+') ? '+' : '');
                    }
                }, 30);

                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

window.addEventListener('load', animateCounters);

// ============================================
// EFEITO DE DIGITAÇÃO
// ============================================
function typeEffect() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        const text = word.getAttribute('data-word');
        word.textContent = '';
        let charIndex = 0;

        const type = () => {
            if (charIndex < text.length) {
                word.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 80);
            }
        };

        setTimeout(type, index * 200);
    });
}

window.addEventListener('load', typeEffect);

// ============================================
// RIPPLE EFFECT
// ============================================
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .social-link, .social-icon');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
}

window.addEventListener('load', initRippleEffect);

// ============================================
// SCROLL INDICATOR
// ============================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// CARD HOVER EFFECT
// ============================================
function initCardHoverEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .certificate-card, .about-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

window.addEventListener('load', initCardHoverEffect);

// ============================================
// DEBOUNCE
// ============================================
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

// ============================================
// RESPONSIVIDADE
// ============================================
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
}, 250));

// ============================================
// SCROLL SUAVE NAVBAR
// ============================================
window.addEventListener('scroll', () => {
    const sidebar = document.querySelector('.sidebar');
    if (window.pageYOffset > 50) {
        sidebar.style.background = 'linear-gradient(180deg, rgba(17, 22, 51, 0.98) 0%, rgba(10, 14, 39, 0.95) 100%)';
    } else {
        sidebar.style.background = 'linear-gradient(180deg, rgba(17, 22, 51, 0.95) 0%, rgba(10, 14, 39, 0.95) 100%)';
    }
});

// ============================================
// DETECÇÃO DE TEMA
// ============================================
function initTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-mode');
    }
}

initTheme();

// ============================================
// LAZY LOADING
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log(
    '%c🚀 Bem-vindo ao portfólio de Raphael Silva!',
    'color: #6366f1; font-size: 16px; font-weight: bold;'
);
console.log(
    '%cDesenvolvido com HTML, CSS e JavaScript puro - Com Sidebar Lateral!',
    'color: #818cf8; font-size: 12px;'
);

// ============================================
// STAGGER REVEAL
// ============================================
function initStaggerReveal() {
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-scale');
    
    revealElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = 'none';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = entry.target.classList.contains('reveal-scale')
                            ? 'revealScale 0.8s ease-out forwards'
                            : 'revealText 0.8s ease-out forwards';
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);
    });
}

window.addEventListener('load', initStaggerReveal);

// ============================================
// PRELOAD IMAGES
// ============================================
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.src;
    });
}

window.addEventListener('load', preloadImages);
