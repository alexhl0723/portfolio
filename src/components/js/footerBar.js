document.addEventListener('DOMContentLoaded', () => {
    const socialBar = document.querySelector('.social-bar');
    const icons = document.querySelectorAll('.social-icon');
    let isHovering = false;
    let currentIndex = -1;
    let animationFrameId = 1;
    let lastMouseX = 0;
    
    // Función para aplicar transformaciones con animación suave
    const applyTransformations = (index, intensity = 1.0) => {
      currentIndex = index;
      
      icons.forEach((icon, iconIndex) => {
        // Calcular distancia relativa al icono actual
        const distance = Math.abs(index - iconIndex);
        
        // Valores base para las transformaciones
        let scale = 0.9;
        let translateY = 0;
        let zIndex = 1;
        let rotation = 0;
        
        // Aplicar transformaciones según la distancia con intensidad ajustable
        if (distance === 0) {
          // Icono actual
          scale = 1.4 * intensity + 0.2; // Escala máxima 1.5, mínima 0.9 + 0.2
          translateY = -15 * intensity;
          zIndex = 10;
          icon.classList.add('active');
        } else if (distance === 1) {
          // Iconos adyacentes
          scale = 1.05 * intensity + 0.05;
          translateY = -15 * intensity;
          zIndex = 5;
          //rotation = index > iconIndex ? -2 * intensity : 0 * intensity; // Ligera rotación
          icon.classList.remove('active');
        } else if (distance === 2) {
          // Iconos a distancia 2
          scale = 1.02 * intensity + 0.03;
          translateY = -7 * intensity;
          zIndex = 2;
          icon.classList.remove('active');
        } else {
          icon.classList.remove('active');
        }
        
        
        // Aplicar transformaciones con CSS
        icon.style.transform = `scale(${scale}) translateY(${translateY}px) rotate(${rotation}deg)`;
        icon.style.zIndex = zIndex;
      });
    };
    
    // Función para resetear transformaciones gradualmente
    const resetTransformations = () => {
      isHovering = false;
      currentIndex = -1;
      
      // Animación de retorno suave
      let progress = 1.0;
      const duration = 500; // ms
      const startTime = performance.now();
      
      const animateReset = (currentTime) => {
        const elapsed = currentTime - startTime;
        progress = Math.max(0, 1 - (elapsed / duration));
        
        if (progress > 0) {
          // Aplicar transformación con intensidad decreciente
          icons.forEach(icon => {
            const scale = 0.9 + (icon._targetScale  - 0.9) * progress;
            const translateY = icon._targetTranslateY * progress;
            const rotation = icon._targetRotation * progress;
            
            icon.style.transform = `scale(${scale}) translateY(${translateY}px) rotate(${rotation}deg)`;
            
            if (progress < 0.1) {
              icon.classList.remove('active');
            }
          });
          
          animationFrameId = requestAnimationFrame(animateReset);
        } else {
          // Finalizar reset
          icons.forEach(icon => {
            icon.style.transform = 'scale(0.9) translateY(0) rotate(0deg)';
            icon.style.zIndex = 1;
            icon.classList.remove('active');
          });
          
          animationFrameId = null;
        }
      };
      
      // Guardar valores actuales para animación
      icons.forEach(icon => {
        const transform = getComputedStyle(icon).transform;
        const matrix = new DOMMatrix(transform);
        
        // Extraer valores actuales de la matriz de transformación
        icon._targetScale = matrix.m11; // scale en el eje X
        
        // Extraer translateY de la matriz
        const translateYMatch = transform.match(/translateY\(([^)]+)\)/);
        icon._targetTranslateY = translateYMatch ? parseFloat(translateYMatch[1]) : 0;
        
        // Extraer rotate de la matriz
        const rotateMatch = transform.match(/rotate\(([^)]+)\)/);
        icon._targetRotation = rotateMatch ? parseFloat(rotateMatch[1]) : 0;
      });
      
      // Iniciar animación de reset
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animateReset);
    };
    
    // Función para manejar hover con easing personalizado
    const handleIconHover = (index, mouseX = null) => {
      isHovering = true;
      
      // Si hay mouse position, aplicamos influencia de posición
      if (mouseX !== null) {
        const icon = icons[index];
        const rect = icon.getBoundingClientRect();
        const iconWidth = rect.width;
        const relativeX = mouseX - rect.left;
        const positionFactor = (relativeX / iconWidth) * 2 - 1; // -1 a 1
        
        // Aplicar suavizado
        applyTransformations(index);
        
        // Si está en los bordes, generar influencia en iconos adyacentes
        if (Math.abs(positionFactor) > 0.7) {
          const adjacentIndex = positionFactor > 0 ? 
            Math.min(icons.length - 1, index + 1) : 
            Math.max(0, index - 1);
            
          if (adjacentIndex !== index) {
            const intensity = Math.min(0.3, (Math.abs(positionFactor) - 0.7) / 0.3);
            icons[adjacentIndex].style.transform = 
              `scale(${1.05 + intensity * 0.15}) translateY(${-5 - intensity * 5}px)`;
          }
        }
      } else {
        applyTransformations(index);
      }
    };
    
    // Aplicar efecto de onda al mover el mouse
    const applyWaveEffect = (mouseX) => {
      lastMouseX = mouseX;
      
      if (currentIndex !== -1) return; // No aplicar si hay un icono con hover
      
      const barRect = socialBar.getBoundingClientRect();
      const barWidth = barRect.width;
      
      icons.forEach((icon, index) => {
        const iconRect = icon.getBoundingClientRect();
        const iconCenterX = iconRect.left + iconRect.width/2 - barRect.left;
        const distance = Math.abs(mouseX - iconCenterX);
        const maxDistance = barWidth / 3;
        
        // Calcular escala y elevación basada en la distancia al cursor
        if (distance < maxDistance) {
          const effect = Math.pow(1 - distance / maxDistance, 2); // Efecto cuadrático para suavidad
          const scale = 0.9 + 0.4 * effect;
          const translateY = -12 * effect;
          const rotation = ((mouseX > iconCenterX) ? -1 : 1) * 2 * effect;
          
          icon.style.transform = `scale(${scale}) translateY(${translateY}px) rotate(${rotation}deg)`;
          icon.style.zIndex = Math.round(effect * 10);
          
          if (effect > 0.7) {
            icon.classList.add('active');
          } else {
            icon.classList.remove('active');
          }
        } else {
          icon.style.transform = 'scale(0.9) translateY(0) rotate(0deg)';
          icon.style.zIndex = 1;
          icon.classList.remove('active');
        }
      });
    };
    
    // Optimizar el efecto de onda con requestAnimationFrame
    const optimizedWaveEffect = (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const barRect = socialBar.getBoundingClientRect();
        const mouseX = e.clientX - barRect.left;
        applyWaveEffect(mouseX);
      });
    };
    
    // Eventos para cada icono
    icons.forEach((icon, index) => {
      icon.addEventListener('mouseenter', (e) => {
        handleIconHover(index, e.clientX);
      });
      
      icon.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        handleIconHover(index, e.clientX);
      });
    });
    
    // Eventos para la barra social
    socialBar.addEventListener('mouseleave', resetTransformations);
    socialBar.addEventListener('mousemove', optimizedWaveEffect);
    
    // Limpiar animación al desmontar
    window.addEventListener('beforeunload', () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });
  });
