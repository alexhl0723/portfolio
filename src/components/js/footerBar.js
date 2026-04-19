/**
 * Footer Social Bar - Advanced Interactive Effects
 * Features: Smooth magnetic hover, wave ripple, spring animations, glow effects
 */

document.addEventListener('DOMContentLoaded', () => {
  const socialBar = document.querySelector('.social-bar');
  const icons = document.querySelectorAll('.social-icon');
  
  // State management
  const state = {
    isHovering: false,
    activeIndex: -1,
    mouseX: 0,
    animationFrame: null,
    lastUpdate: 0,
    throttleDelay: 16, // ~60fps
  };

  // Configuration
  const config = {
    baseScale: 0.9,
    maxScale: 1.5,
    maxTranslateY: -18,
    rotationIntensity: 3,
    animationDuration: 600,
    springStiffness: 0.15,
    springDamping: 0.75,
    waveRadius: 120,
    glowIntensity: 0.6,
  };

  // Easing functions
  const easing = {
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeOutBack: t => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  };

  /**
   * Calculate distance-based influence factor
   */
  const getInfluence = (distance, maxDistance) => {
    const ratio = Math.max(0, 1 - distance / maxDistance);
    return Math.pow(ratio, 2.5); // Quadratic falloff for smooth transitions
  };

  /**
   * Apply magnetic hover effect to icons
   */
  const applyMagneticEffect = (index, mouseX) => {
    state.activeIndex = index;
    state.isHovering = true;

    icons.forEach((icon, i) => {
      const distance = Math.abs(index - i);
      const iconRect = icon.getBoundingClientRect();
      const iconCenterX = iconRect.left + iconRect.width / 2;
      const mouseDistance = Math.abs(mouseX - iconCenterX);
      
      let scale, translateY, rotation, glow;

      if (distance === 0) {
        // Active icon - maximum effect
        scale = config.maxScale;
        translateY = config.maxTranslateY;
        rotation = 0;
        glow = 1;
        
        // Add subtle horizontal influence based on mouse position
        const rect = icon.getBoundingClientRect();
        const relativeX = (mouseX - rect.left) / rect.width - 0.5;
        rotation = relativeX * config.rotationIntensity * 0.5;
      } else if (distance === 1) {
        // Adjacent icons - medium effect
        scale = 1.15;
        translateY = -10;
        rotation = (index > i ? -1 : 1) * 2;
        glow = 0.4;
      } else if (distance === 2) {
        // Far icons - minimal effect
        scale = 1.02;
        translateY = -4;
        rotation = 0;
        glow = 0.1;
      } else {
        scale = config.baseScale;
        translateY = 0;
        rotation = 0;
        glow = 0;
      }

      // Apply transformations with smooth CSS transitions
      icon.style.transform = `
        scale(${scale}) 
        translateY(${translateY}px) 
        rotate(${rotation}deg)
      `;
      icon.style.zIndex = Math.max(1, 10 - distance * 3);
      
      // Update glow effect
      if (glow > 0.3) {
        icon.classList.add('active');
        icon.style.filter = `brightness(${1 + config.glowIntensity * glow})`;
      } else {
        icon.classList.remove('active');
        icon.style.filter = '';
      }
    });
  };

  /**
   * Wave ripple effect when moving mouse across bar
   */
  const applyWaveEffect = (mouseX) => {
    const barRect = socialBar.getBoundingClientRect();
    
    icons.forEach((icon, index) => {
      const iconRect = icon.getBoundingClientRect();
      const iconCenterX = iconRect.left + iconRect.width / 2;
      const distance = Math.abs(mouseX - iconCenterX);
      const influence = getInfluence(distance, config.waveRadius);

      if (influence > 0.05) {
        const scale = config.baseScale + (config.maxScale - config.baseScale) * influence * 0.6;
        const translateY = config.maxTranslateY * influence * 0.7;
        const rotation = ((mouseX > iconCenterX) ? -1 : 1) * config.rotationIntensity * influence * 0.4;

        icon.style.transform = `
          scale(${scale}) 
          translateY(${translateY}px) 
          rotate(${rotation}deg)
        `;
        icon.style.zIndex = Math.round(influence * 8);
        
        if (influence > 0.5) {
          icon.classList.add('active');
        } else {
          icon.classList.remove('active');
        }
      } else {
        // Reset to default
        icon.style.transform = `scale(${config.baseScale}) translateY(0) rotate(0deg)`;
        icon.style.zIndex = 1;
        icon.classList.remove('active');
        icon.style.filter = '';
      }
    });
  };

  /**
   * Smooth spring-based reset animation
   */
  const resetWithSpring = () => {
    state.isHovering = false;
    state.activeIndex = -1;

    // Cancel any ongoing animation
    if (state.animationFrame) {
      cancelAnimationFrame(state.animationFrame);
    }

    const startTime = performance.now();
    const initialValues = [];

    // Capture current state
    icons.forEach(icon => {
      const transform = getComputedStyle(icon).transform;
      const matrix = new DOMMatrixReadOnly(transform);
      initialValues.push({
        scale: matrix.m11 || config.baseScale,
        translateY: matrix.m42 || 0,
        rotation: 0, // Extract from rotation if needed
      });
    });

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / config.animationDuration);
      const easedProgress = easing.easeOutExpo(progress);

      icons.forEach((icon, i) => {
        const initial = initialValues[i];
        
        // Interpolate back to default
        const scale = initial.scale + (config.baseScale - initial.scale) * easedProgress;
        const translateY = initial.translateY * (1 - easedProgress);
        const rotation = 0;

        icon.style.transform = `
          scale(${scale}) 
          translateY(${translateY}px) 
          rotate(${rotation}deg)
        `;
        icon.style.zIndex = 1;
        
        // Fade out glow
        if (progress > 0.7) {
          icon.classList.remove('active');
          icon.style.filter = '';
        }
      });

      if (progress < 1) {
        state.animationFrame = requestAnimationFrame(animate);
      } else {
        // Final cleanup
        icons.forEach(icon => {
          icon.style.transform = `scale(${config.baseScale}) translateY(0) rotate(0deg)`;
          icon.style.zIndex = 1;
          icon.classList.remove('active');
          icon.style.filter = '';
        });
        state.animationFrame = null;
      }
    };

    state.animationFrame = requestAnimationFrame(animate);
  };

  /**
   * Throttled event handler for better performance
   */
  const handleMouseMove = (e) => {
    const now = performance.now();
    if (now - state.lastUpdate < state.throttleDelay) return;
    state.lastUpdate = now;

    const barRect = socialBar.getBoundingClientRect();
    const mouseX = e.clientX;
    state.mouseX = mouseX;

    // Check if hovering over any icon
    let foundIcon = false;
    icons.forEach((icon, index) => {
      const rect = icon.getBoundingClientRect();
      if (mouseX >= rect.left && mouseX <= rect.right) {
        foundIcon = true;
        applyMagneticEffect(index, mouseX);
      }
    });

    // If not over an icon but still in bar, apply wave
    if (!foundIcon && state.isHovering) {
      applyWaveEffect(mouseX);
    }
  };

  // Event listeners
  icons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', (e) => {
      applyMagneticEffect(index, e.clientX);
    });

    icon.addEventListener('mousemove', (e) => {
      if (state.activeIndex === index) {
        applyMagneticEffect(index, e.clientX);
      }
    });
  });

  socialBar.addEventListener('mousemove', handleMouseMove);
  socialBar.addEventListener('mouseleave', resetWithSpring);

  // Touch support for mobile
  icons.forEach((icon, index) => {
    icon.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      applyMagneticEffect(index, touch.clientX);
    }, { passive: false });
  });

  document.addEventListener('touchend', () => {
    if (state.isHovering) {
      resetWithSpring();
    }
  });

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (state.animationFrame) {
      cancelAnimationFrame(state.animationFrame);
    }
  });

  // Accessibility: Reduce motion for users who prefer it
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Disable complex animations
    icons.forEach(icon => {
      icon.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    });
  }

  prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
      icons.forEach(icon => {
        icon.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
      });
    } else {
      icons.forEach(icon => {
        icon.style.transition = '';
      });
    }
  });
});
