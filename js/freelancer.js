(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

  // FAQ Accordion
  $('#faq .faq-question').on('click', function() {
    var item = $(this).closest('.faq-item');
    item.toggleClass('active');
    var answer = item.find('.faq-answer');
    answer.slideToggle();
  });

})(jQuery); // End of use strict

// Typewriter Effect for Rich Text
document.addEventListener('DOMContentLoaded', function() {
  const elementId = 'typewriter-text';
  const element = document.getElementById(elementId);
  
  if (!element) return;

  // Get the HTML content and normalize whitespace
  const originalHTML = element.innerHTML;
  
  // Store the original content
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = originalHTML;
  
  // Normalize text content while preserving HTML tags
  function normalizeWhitespace(html) {
    // Replace multiple spaces/newlines with single space
    return html.replace(/\s+/g, ' ').trim();
  }
  
  const normalizedHTML = normalizeWhitespace(originalHTML);
  element.innerHTML = normalizedHTML;
  
  // Helper to wrap characters in spans
  function wrapCharacters(node) {
    if (node.nodeType === 3) { // Text node
      const text = node.nodeValue;
      
      const fragment = document.createDocumentFragment();
      for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.className = 'typewriter-char';
        fragment.appendChild(span);
      }
      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === 1) { // Element node (like <b>)
      Array.from(node.childNodes).forEach(wrapCharacters);
    }
  }

  // Initial setup: wrap all characters
  wrapCharacters(element);
  
  // Ensure the container is visible
  element.style.visibility = 'visible';

  // Intersection Observer to trigger animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const chars = element.querySelectorAll('.typewriter-char');
        chars.forEach((char, index) => {
          setTimeout(() => {
            char.style.opacity = '1';
          }, index *15); // 20ms typing speed
        });
        observer.disconnect(); // Run once
      }
    });
  }, { threshold: 0.1 }); // Start when 10% is visible

  observer.observe(element);
});

// Partners Cards Entrance Animation
document.addEventListener('DOMContentLoaded', function() {
  const partnerItems = document.querySelectorAll('#partners .partners-item');
  
  if (partnerItems.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = Array.from(partnerItems);
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 100); // 100ms stagger delay
        });
        observer.disconnect(); // Run once
      }
    });
  }, { threshold: 0.1 });

  // Observe the partners section
  const partnersSection = document.getElementById('partners');
  if (partnersSection) {
    observer.observe(partnersSection);
  }
});

// Section Transition Animations
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  
  if (sections.length === 0) return;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      }
    });
  }, { 
    threshold: 0.15, // Trigger when 15% of section is visible
    rootMargin: '0px 0px -50px 0px' // Start slightly before entering viewport
  });

  // Observe all sections
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});
