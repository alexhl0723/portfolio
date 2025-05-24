// Función para cerrar el menú móvil
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.remove('flex');
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = ''; // Restaurar scroll
  }
}

// Función para manejar el cambio de tamaño de la ventana
function handleResize() {
  // Si el ancho de la ventana es mayor a 768px (tamaño md de Tailwind)
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
}

// JavaScript para controlar el menú móvil
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const closeMenu = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('#mobile-menu a');

  // Agregar event listener para cambios de tamaño de ventana
  window.addEventListener('resize', handleResize);

  if (menuToggle && closeMenu && mobileMenu) {
    // Abrir menú
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      mobileMenu.classList.add('flex');
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    });

    // Cerrar menú
    closeMenu.addEventListener('click', closeMobileMenu);

    // Cerrar menú al hacer clic en links
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
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

  // Verificar el tamaño de la pantalla al cargar la página
  handleResize();
  });
