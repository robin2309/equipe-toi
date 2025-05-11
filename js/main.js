// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          const icon = hamburger.querySelector('i');
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
  });

  // Animate stats on scroll
  const stats = document.querySelectorAll('.stat-number');
  const statsSection = document.querySelector('.stats');
  
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const countUp = () => {
              const value = parseInt(stat.textContent);
              const time = target / 100;
              if (value < target) {
                stat.textContent = Math.ceil(value + time);
                setTimeout(countUp, 30);
              } else {
                stat.textContent = target;
                // Add + sign back for stats that had it
                if (stat.textContent.endsWith('+')) {
                  stat.textContent += '+';
                }
              }
            };
            // Store the target value and start from 0
            stat.dataset.target = stat.textContent;
            stat.textContent = '0';
            countUp();
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(statsSection);
  }
});