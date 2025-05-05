// Script principal do site Inovarq
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização de todas as funcionalidades
    initScrollAnimation();
    initMobileMenu();
    initDepoimentosSlider();
    initBackToTop();
    initHeaderScroll();
    initProjectModal();
    initContactForm();
    initNewsletterForm();
    animateCounters();
});

// Animação de rolagem suave para os links de navegação
function initScrollAnimation() {
    const menuLinks = document.querySelectorAll('nav a, .logo a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Fecha o menu mobile se estiver aberto
                    document.getElementById('main-menu').classList.remove('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Botões da hero section
    document.getElementById('saiba-mais').addEventListener('click', function() {
        document.getElementById('projetos').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });

    document.getElementById('contate-nos').addEventListener('click', function() {
        document.getElementById('contato').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Menu mobile
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    menuToggle.addEventListener('click', function() {
        mainMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mainMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
        }
    });
}

// Slider de depoimentos
function initDepoimentosSlider() {
    const depoimentos = document.querySelectorAll('.depoimento');
    const dotsContainer = document.querySelector('.depoimentos-dots');
    const prevBtn = document.querySelector('.depoimento-prev');
    const nextBtn = document.querySelector('.depoimento-next');
    let currentIndex = 0;
    let interval;

    // Criar dots para navegação
    depoimentos.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
        
        dotsContainer.appendChild(dot);
    });

    // Função para ir para um slide específico
    function goToSlide(index) {
        depoimentos.forEach(depoimento => depoimento.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
        
        depoimentos[index].classList.add('active');
        document.querySelectorAll('.dot')[index].classList.add('active');
        currentIndex = index;
    }

    // Evento para botão anterior
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + depoimentos.length) % depoimentos.length;
        goToSlide(currentIndex);
        resetInterval();
    });

    // Evento para próximo botão
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % depoimentos.length;
        goToSlide(currentIndex);
        resetInterval();
    });

    // Iniciar slideshow automático
    function startInterval() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % depoimentos.length;
            goToSlide(currentIndex);
        }, 6000);
    }

    // Resetar timer do slideshow
    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    startInterval();
}

// Botão voltar ao topo
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Efeito de header ao rolar
function initHeaderScroll() {
    const header = document.getElementById('header');
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
            updateActiveNavLink();
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Atualizar link ativo no menu de navegação
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Inicializar link ativo
    updateActiveNavLink();
}

// Modal para projetos
function initProjectModal() {
    const modal = document.getElementById('projeto-modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.querySelector('.modal-close');
    const projectBtns = document.querySelectorAll('.ver-mais');
    const imgOverlays = document.querySelectorAll('.img-container .overlay');
    
    // Abrir modal ao clicar nos botões "Ver Projeto"
    projectBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            openProjectModal(index);
        });
    });
    
    // Abrir modal ao clicar na imagem
    imgOverlays.forEach((overlay, index) => {
        overlay.addEventListener('click', function() {
            openProjectModal(index);
        });
    });
    
    // Fechar modal com botão
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    function openProjectModal(index) {
        const projects = [
            {
                title: "Torre Empresarial Horizon",
                location: "São Paulo",
                description: "Um marco na arquitetura corporativa moderna, com 30 andares de design sustentável e tecnologia de ponta. Este edifício revolucionário incorpora sistemas de energia solar, captação de água da chuva e jardins verticais que melhoram a qualidade do ar e reduzem o consumo energético.",
                features: ["30 andares", "15.000m² de área construída", "Certificação LEED Platinum", "Sistema inteligente de gestão predial"],
                mainImage: "/api/placeholder/800/500",
                gallery: [
                    "/api/placeholder/600/400",
                    "/api/placeholder/600/400",
                    "/api/placeholder/600/400"
                ]
            },
            {
                title: "Residencial Eco Gardens",
                location: "Curitiba",
                description: "Conjunto residencial que integra natureza e vida urbana, com soluções sustentáveis e áreas verdes abundantes. O projeto inclui um sistema de compostagem comunitária, hortas urbanas e apartamentos que maximizam a iluminação natural e ventilação cruzada.",
                features: ["120 unidades residenciais", "8.000m² de áreas verdes", "Sistema de captação de água da chuva", "Painéis solares"],
                mainImage: "/api/placeholder/800/500",
                gallery: [
                    "/api/placeholder/600/400",
                    "/api/placeholder/600/400",
                    "/api/placeholder/600/400"
                ]
            },
            {
                title: "Centro Cultural Nexus",
                location: "Rio de Janeiro",
                description: "Espaço multiuso que combina arte, tecnologia e história em uma estrutura arquitetônica premiada. O design foi inspirado nas ondas do mar de Copacabana e incorpora elementos da cultura brasileira em sua fachada dinâmica e espaços internos fluidos.",
                features: ["Auditório para 500 pessoas", "Galerias de arte", "Estúdios multimídia", "Biblioteca digital"],
                mainImage: "/api/placeholder/800/500",
                gallery: [
                    "/api/placeholder/600/400",
                    "/api/placeholder/600/400",
                    "/api/placeholder/600/400"
                ]
            },
            {
                title: "Complexo Empresarial Green Tower",
                location: "Belo Horizonte",
                description: "Edifício comercial de última geração com certificação LEED Platinum, exemplo de sustentabilidade corporativa. Sua fachada de vidro duplo com proteção solar inteligente reduz o consumo de energia em até 40% comparado com edifícios convencionais.",
                features: ["25 andares", "Fachada inteligente", "Sistema de reuso de água", "Estações de carregamento para veículos elétricos"],
                mainImage: "/api/placeholder/800/500",
                gallery: [
                    "/api/placeholder/600/400",
                    "/api/placeholder/600/400",
                    "/api/placeholder/600/400"
                ]
            }
        ];
        
        const project = projects[index];
        
        let galleryHTML = '';
        project.gallery.forEach(img => {
            galleryHTML += `<img src="${img}" alt="${project.title}">`;
        });
        
        const content = `
            <div class="projeto-detail">
                <h2>${project.title}</h2>
                <div class="projeto-location"><i class="fas fa-map-marker-alt"></i> ${project.location}</div>
                
                <div class="projeto-main-img">
                    <img src="${project.mainImage}" alt="${project.title}">
                </div>
                
                <div class="projeto-info">
                    <div class="projeto-description">
                        <h3>Sobre o Projeto</h3>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="projeto-features">
                        <h3>Características</h3>
                        <ul>
                            ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="projeto-gallery">
                    <h3>Galeria</h3>
                    <div class="gallery-grid">
                        ${galleryHTML}
                    </div>
                </div>
            </div>
        `;
        
        modalContent.innerHTML = content;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Animação dos contadores
function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    // Verifica se o elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animar contador
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // duração em ms
        const stepTime = 30; // intervalo entre passos em ms
        const initialValue = 0;
        
        // Calcular incremento por etapa
        const increment = target / (duration / stepTime);
        let currentValue = initialValue;
        
        // Iniciar contador
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= target) {
                clearInterval(timer);
                counter.textContent = target;
            } else {
                counter.textContent = Math.floor(currentValue);
            }
        }, stepTime);
    }
    
    // Função para verificar e iniciar contadores quando visíveis
    function checkCounters() {
        counters.forEach(counter => {
            if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
                counter.classList.add('animated');
                animateCounter(counter);
            }
        });
    }
    
    // Verificar contadores no scroll
    window.addEventListener('scroll', checkCounters);
    
    // Verificar contadores no carregamento
    checkCounters();
}

// Validação e envio do formulário de contato
function initContactForm() {
    const form = document.getElementById('formulario-contato');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (!nome || !email || !mensagem) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simulação de envio
            showLoading(form);
            
            // Simular requisição de API
            setTimeout(() => {
                hideLoading(form);
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                form.reset();
            }, 1500);
        });
    }
}

// Formulário de newsletter
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            if (!email) {
                showNotification('Por favor, insira seu email.', 'error');
                return;
            }
            
            // Simulação de envio
            showLoading(form);
            
            // Simular requisição de API
            setTimeout(() => {
                hideLoading(form);
                showNotification('Inscrição realizada com sucesso!', 'success');
                form.reset();
            }, 1500);
        });
    }
}

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    // Remover notificações anteriores
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Criar nova notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Botão para fechar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-fechar após 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Função para mostrar loading
function showLoading(element) {
    // Desabilitar formulário
    const inputs = element.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
        input.setAttribute('disabled', 'disabled');
    });
    
    // Adicionar spinner ao botão
    const button = element.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.setAttribute('data-original-text', originalText);
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
}

// Função para esconder loading
function hideLoading(element) {
    // Reabilitar formulário
    const inputs = element.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
        input.removeAttribute('disabled');
    });
    
    // Restaurar texto do botão
    const button = element.querySelector('button[type="submit"]');
    const originalText = button.getAttribute('data-original-text');
    button.innerHTML = originalText;
}
