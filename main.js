document.addEventListener('DOMContentLoaded', () => {
  
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Fade-in animations with Intersection Observer
  const fadeElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => fadeObserver.observe(el));

  // Before/After Slider Interaction
  const sliders = document.querySelectorAll('.comparison-slider');
  
  sliders.forEach(slider => {
    const overlay = slider.querySelector('.slider-overlay');
    const handle = slider.querySelector('.slider-handle');

    if (slider && overlay && handle) {
      let isDragging = false;

      const onPointerMove = (e) => {
        if (!isDragging) return;
        const sliderRect = slider.getBoundingClientRect();
        
        let clientX = e.clientX || (e.touches && e.touches[0].clientX);
        if(!clientX) return;

        let x = clientX - sliderRect.left;
        if (x < 0) x = 0;
        if (x > sliderRect.width) x = sliderRect.width;

        const percent = (x / sliderRect.width) * 100;
        overlay.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        handle.style.left = `${percent}%`;
        e.preventDefault();
      };

      handle.addEventListener('mousedown', () => isDragging = true);
      slider.addEventListener('touchstart', (e) => {
          isDragging = true;
          onPointerMove(e);
      }, {passive: false});

      window.addEventListener('mouseup', () => isDragging = false);
      window.addEventListener('touchend', () => isDragging = false);
      window.addEventListener('mousemove', onPointerMove);
      window.addEventListener('touchmove', onPointerMove, {passive: false});
    }
  });

  // Tilt Effect (Optional Vanilla JS, adds 3D parallax to cards)
  const tiltElements = document.querySelectorAll('.tilt-effect');
  tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const midX = rect.width / 2;
          const midY = rect.height / 2;
          
          const tiltX = (y - midY) / 10;
          const tiltY = (midX - x) / 10;
          
          el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      el.addEventListener('mouseleave', () => {
          el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
  });

});
