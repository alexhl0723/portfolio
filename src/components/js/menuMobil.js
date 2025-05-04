// JavaScript para controlar el menú móvil
  document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');

    if (menuToggle && closeMenu && mobileMenu) {
      // Abrir menú
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Prevenir scroll
      });

      // Cerrar menú
      closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('flex');
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = ''; // Restaurar scroll
      });

      // Cerrar menú al hacer clic en links
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('flex');
          mobileMenu.classList.add('hidden');
          document.body.style.overflow = '';
        });
      });
    }

    // Efecto de animación para los selectores de idioma
    const languageSwitchers = document.querySelectorAll('.language-switcher, .language-switcher-mobile, .language-switcher-menu');
    
    languageSwitchers.forEach(switcher => {
      switcher.addEventListener('mouseenter', () => {
        switcher.classList.add('pulse');
      });
      
      switcher.addEventListener('mouseleave', () => {
        switcher.classList.remove('pulse');
        setTimeout(() => {
          switcher.classList.remove('pulse-end');
        }, 300);
      });
    });
  });
