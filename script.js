// FotoBoom Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
  initGlobalSlider();
  initFAQAccordion();
  initSmoothScroll();
});

// Global Before/After Slider
function initGlobalSlider() {
  const slider = document.getElementById('globalSlider');
  const sliderFill = document.getElementById('sliderFill');
  const showcaseAfters = document.querySelectorAll('.showcase-after');

  if (!slider) return;

  function updateSlider(value) {
    // Update the clip-path for all after images
    // value 0 = show all "before" (after is clipped to nothing)
    // value 100 = show all "after" (after covers everything)
    const clipPercent = 100 - value;

    showcaseAfters.forEach(afterEl => {
      afterEl.style.clipPath = `inset(0 ${clipPercent}% 0 0)`;
    });

    // Update slider fill
    if (sliderFill) {
      sliderFill.style.width = `calc(${value}% - 8px)`;
    }
  }

  // Initialize with default value
  updateSlider(slider.value);

  // Mouse/touch events
  slider.addEventListener('input', function() {
    updateSlider(this.value);
  });

  // Touch support for mobile
  slider.addEventListener('touchmove', function(e) {
    e.stopPropagation();
  }, { passive: true });
}

// FAQ Accordion
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
      question.addEventListener('click', function() {
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });

        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Intersection Observer for animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .faq-item').forEach(el => {
    observer.observe(el);
  });
}

// Pause carousel on hover
function initCarouselHover() {
  const track = document.getElementById('showcaseTrack');

  if (track) {
    track.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }
}

// Initialize carousel hover
document.addEventListener('DOMContentLoaded', initCarouselHover);
