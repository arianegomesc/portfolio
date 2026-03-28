document.addEventListener('DOMContentLoaded', () => {
    
    // Configuração de Mudança de Tema (Light / Dark)
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        // Verifica preferência anterior no localStorage. O default já vem como light no HTML.
        const currentTheme = localStorage.getItem('portfolio_theme');
        if (currentTheme === 'dark') {
            document.body.classList.remove('light-mode');
            themeIcon.classList.replace('ph-moon', 'ph-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            let theme = 'dark';
            if (document.body.classList.contains('light-mode')) {
                theme = 'light';
                themeIcon.classList.replace('ph-sun', 'ph-moon');
            } else {
                themeIcon.classList.replace('ph-moon', 'ph-sun');
            }
            
            // Salva a escolha do usuário no navegador
            localStorage.setItem('portfolio_theme', theme);
        });
    }

    // Configuração do Menu Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Efeito de Spotlight / Cursor follow do background (estilo Brittany Chiang)
    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Função para alternar o estado do menu
    const toggleMenu = () => {
        if (!menuToggle) return;
        mainNav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    };

    // Toggle menu dropdown em mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Fecha o menu ao clicar num link (para melhorar a UX no mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Navbar Scrolled Effect via CSS class
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intercepta o envio do formulário 
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Simula um envio e feedback
            btn.innerHTML = 'Enviando... <i class="ph ph-spinner-gap"></i>';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = 'Mensagem Enviada! <i class="ph ph-check"></i>';
                btn.style.backgroundColor = 'var(--success)';
                btn.style.color = '#fff';
                
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style = '';
                    btn.disabled = false;
                }, 3000);
            }, 1200);
        });
    }

});
