// ============================================
// EFEITO DE DIGITAÇÃO - HOME
// ============================================
const textElement = document.querySelector('.txt_home');
const text = "Olá, meu nome é Raphael Silva!";
const typingSpeed = 100;

let index = 0;

function typeText() {
    if (index < text.length) {
        textElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, typingSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    typeText();
});

// ============================================
// NAVEGAÇÃO SUAVE
// ============================================
document.querySelectorAll('.navbar-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove classe active de todos os links
        document.querySelectorAll('.navbar-links a').forEach(a => a.classList.remove('active'));
        
        // Adiciona classe active ao link clicado
        link.classList.add('active');
    });
});

// ============================================
// EFEITO HOVER NOS ÍCONES DE HABILIDADES
// ============================================
const skillIcons = document.querySelectorAll('.icon_habilidades');

skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        // Adiciona efeito de escala e rotação
        const iconElement = this.querySelector('i');
        if (iconElement) {
            iconElement.style.transform = 'scale(1.2) rotate(360deg)';
        }
    });

    icon.addEventListener('mouseleave', function() {
        const iconElement = this.querySelector('i');
        if (iconElement) {
            iconElement.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ============================================
// EFEITO HOVER NOS ÍCONES SOCIAIS
// ============================================
const socialIcons = document.querySelectorAll('.icons_home i, .icons_sobre_mim i, .icons_footer .icons i');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) translateY(-8px)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ============================================
// EFEITO ARROW CERTIFICADOS
// ============================================
let arrowContainers = document.querySelectorAll('.arrow_certificado');
let arrows = document.querySelectorAll('.arrow_certifiction');
let texts = document.querySelectorAll('.text_certificado');

arrowContainers.forEach((arrowContainer, index) => {
    let arrow = arrows[index];
    let txt = texts[index];

    let originalArrowPosition = arrow.style.left;
    let originalArrowContainerWidth = arrowContainer.style.width;

    arrowContainer.addEventListener('mouseover', function() {
        arrow.style.position = 'relative';
        arrow.style.left = '90%';

        this.style.width = '93%';
        this.style.transition = 'all ease .5s';

        txt.style.display = 'flex';
    });

    arrowContainer.addEventListener('mouseout', function() {
        arrow.style.position = '';
        arrow.style.left = originalArrowPosition;

        this.style.width = originalArrowContainerWidth;
        this.style.transition = 'all ease .5s';

        txt.style.display = 'none';
    });
});

// ============================================
// MODAL CERTIFICADOS
// ============================================
function abrirModal(pdfUrl) {
    var modal = document.getElementById("myModal");
    var iframe = document.getElementById("pdfFrame");
    iframe.src = pdfUrl;
    modal.style.display = "block";
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.style.overflow = 'auto';
}

// Fecha o modal se o usuário clicar fora do conteúdo
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        fecharModal();
    }
}

// Fecha modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
    }
});

// ============================================
// CAROUSEL CERTIFICADOS MELHORADO
// ============================================
let currentIndexCert = 0;
const cardsCert = document.querySelectorAll('.card_carousel');
const totalCardsCert = cardsCert.length;
const cardsPerView = 2;

function showCardCert(index) {
    cardsCert.forEach((card, i) => {
        if (i >= index && i < index + cardsPerView) {
            card.style.display = 'flex';
            card.style.animation = 'slideIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function navigateCarouselCert(step) {
    currentIndexCert = (currentIndexCert + step + totalCardsCert) % totalCardsCert;
    showCardCert(currentIndexCert);
}

const arrowLeftCert = document.getElementById('arrow_left');
const arrowRightCert = document.getElementById('arrow_right');

if (arrowLeftCert) {
    arrowLeftCert.addEventListener('click', function() {
        navigateCarouselCert(-1);
    });
}

if (arrowRightCert) {
    arrowRightCert.addEventListener('click', function() {
        navigateCarouselCert(1);
    });
}

// Inicialização
showCardCert(currentIndexCert);

// Animação de entrada
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// CAROUSEL PROJETOS MELHORADO
// ============================================
const slides = document.querySelectorAll('input[name="slider"]');
const slidesContainer = document.getElementById('slides');

slides.forEach((slide, index) => {
    slide.addEventListener('change', function() {
        if (this.checked) {
            // Adiciona animação suave
            slidesContainer.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });
});

// Navegação por teclado nos projetos
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const activeSlide = document.querySelector('input[name="slider"]:checked');
        if (activeSlide) {
            const currentIndex = Array.from(slides).indexOf(activeSlide);
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            slides[prevIndex].checked = true;
        }
    } else if (e.key === 'ArrowRight') {
        const activeSlide = document.querySelector('input[name="slider"]:checked');
        if (activeSlide) {
            const currentIndex = Array.from(slides).indexOf(activeSlide);
            const nextIndex = (currentIndex + 1) % slides.length;
            slides[nextIndex].checked = true;
        }
    }
});

// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const arrowTopo = document.querySelector('.container_arrow_topo');
    const showArrowOffset = 300;

    function checkScroll() {
        if (window.pageYOffset > showArrowOffset) {
            arrowTopo.classList.add('show');
        } else {
            arrowTopo.classList.remove('show');
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', checkScroll);
    if (arrowTopo) {
        arrowTopo.addEventListener('click', scrollToTop);
    }

    checkScroll();
});

// ============================================
// ANIMAÇÃO DE SCROLL PARA ELEMENTOS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa elementos com animação
document.querySelectorAll('.card_prj, .card_carousel, .icon_habilidades').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// EFEITO PARALLAX NOS CÍRCULOS FLUTUANTES
// ============================================
const circles = document.querySelectorAll('.circle');

window.addEventListener('scroll', () => {
    circles.forEach((circle, index) => {
        const scrollPosition = window.pageYOffset;
        const speed = (index + 1) * 0.5;
        circle.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ============================================
// EFEITO HOVER NOS BOTÕES
// ============================================
const buttons = document.querySelectorAll('.btn_home, .btn_prj');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// INTERAÇÃO COM CARDS DE PROJETOS
// ============================================
const cardsPrj = document.querySelectorAll('.card_prj');

cardsPrj.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// EFEITO NOS CARDS DE CERTIFICADOS
// ============================================
const cardsCertificados = document.querySelectorAll('.card_carousel');

cardsCertificados.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// ANIMAÇÃO DE ENTRADA NA PÁGINA
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// SUPORTE A TOQUE EM DISPOSITIVOS MÓVEIS
// ============================================
let touchStartX = 0;
let touchEndX = 0;

const slider = document.getElementById('slider');

if (slider) {
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const activeSlide = document.querySelector('input[name="slider"]:checked');
        if (activeSlide) {
            const currentIndex = Array.from(slides).indexOf(activeSlide);
            
            if (touchEndX < touchStartX - 50) {
                // Deslizou para esquerda
                const nextIndex = (currentIndex + 1) % slides.length;
                slides[nextIndex].checked = true;
            } else if (touchEndX > touchStartX + 50) {
                // Deslizou para direita
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                slides[prevIndex].checked = true;
            }
        }
    }
}

// ============================================
// EFEITO DE LINK ATIVO NA NAVBAR
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('main, .container_sobre_mim, .habilidades, .container_certificados, .container_prj, .container_ctt');
    const navLinks = document.querySelectorAll('.navbar-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id') || section.className.split(' ')[0];
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// INICIALIZAÇÃO
// ============================================
console.log('✨ Portfólio carregado com sucesso!');
