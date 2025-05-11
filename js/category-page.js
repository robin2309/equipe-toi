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

  // Product Scroll Navigation
  const scrollContainer = document.querySelector('.products-scroll');
  const prevBtn = document.querySelector('.scroll-btn.prev');
  const nextBtn = document.querySelector('.scroll-btn.next');
  const productCards = document.querySelectorAll('.product-card');
  const cardWidth = productCards[0].offsetWidth + 24; // Card width + gap
  
  // Check scroll position on load and scroll events
  function checkScrollPosition() {
    const scrollLeft = scrollContainer.scrollLeft;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    
    // Enable/disable prev button based on scroll position
    if (scrollLeft <= 0) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }
    
    // Enable/disable next button based on scroll position
    if (scrollLeft >= scrollWidth - clientWidth - 10) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }
  
  // Initial check
  checkScrollPosition();
  
  // Check on scroll
  scrollContainer.addEventListener('scroll', checkScrollPosition);
  
  // Scroll left on prev button click
  prevBtn.addEventListener('click', function() {
    scrollContainer.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
  });
  
  // Scroll right on next button click
  nextBtn.addEventListener('click', function() {
    scrollContainer.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});