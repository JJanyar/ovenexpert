// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Smooth scroll for navigation links
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

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Create email subject and body
    const subject = `Contactaanvraag van ${name} uit ${location}`;
    const body = `Naam: ${name}
Woonplaats: ${location}
Email: ${email}
Telefoon: ${phone}

Bericht:
${message}`;
    
    // Create mailto link
    const mailtoLink = `mailto:info@ovenexpert.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  observer.observe(section);
});

// Mobile menu toggle - updated version
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navContainer = document.querySelector('nav .container');
  
  if (hamburger && navLinks) {
    // Toggle menu when clicking hamburger
    hamburger.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent clicks from bubbling up
      navLinks.classList.toggle('active');
      
      // Toggle menu-open class on container to hide logo
      navContainer.classList.toggle('menu-open');
      
      // Prevent body scroll when menu is open
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        navContainer.classList.remove('menu-open'); // Remove menu-open class
        document.body.style.overflow = '';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navLinks.contains(event.target) && !hamburger.contains(event.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        navContainer.classList.remove('menu-open'); // Remove menu-open class
        document.body.style.overflow = '';
      }
    });
  }
});

// Before/After Slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.comparison-slider');
  
  sliders.forEach(slider => {
    const afterImage = slider.querySelector('.after-image');
    const sliderHandle = slider.querySelector('.slider-handle');
    const beforeLabel = slider.querySelector('.before-label');
    const afterLabel = slider.querySelector('.after-label');
    let isSliding = false;

    if (slider && afterImage && sliderHandle) {
      function updateSlider(x) {
        const rect = slider.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        
        afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
        sliderHandle.style.left = `${percentage}%`;

        // Update label visibility based on slider position
        if (percentage > 50) {
          beforeLabel.style.opacity = '0';
          afterLabel.style.opacity = '1';
        } else {
          beforeLabel.style.opacity = '1';
          afterLabel.style.opacity = '0';
        }
      }

      // Mouse events
      sliderHandle.addEventListener('mousedown', function(e) {
        isSliding = true;
        e.preventDefault();
      });

      document.addEventListener('mousemove', function(e) {
        if (isSliding) {
          updateSlider(e.clientX);
        }
      });

      document.addEventListener('mouseup', function() {
        isSliding = false;
      });

      // Touch events for mobile
      sliderHandle.addEventListener('touchstart', function(e) {
        isSliding = true;
        e.preventDefault();
      });

      document.addEventListener('touchmove', function(e) {
        if (isSliding) {
          const touch = e.touches[0];
          updateSlider(touch.clientX);
          e.preventDefault();
        }
      });

      document.addEventListener('touchend', function() {
        isSliding = false;
      });

      // Click to slide
      slider.addEventListener('click', function(e) {
        if (!isSliding) {
          updateSlider(e.clientX);
        }
      });

      // Initialize slider position
      updateSlider(slider.getBoundingClientRect().left + (slider.getBoundingClientRect().width / 2));
    }
  });
});

