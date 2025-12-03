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



})(jQuery); // End of use strict

// Typewriter Effect for Rich Text
document.addEventListener('DOMContentLoaded', function() {
  const elementId = 'typewriter-text';
  const element = document.getElementById(elementId);
  if (!element) return;

  // 1. Pre-process the DOM to wrap words for non-breaking behavior
  const tempDiv = document.createElement('div');
  // Normalize whitespace and handle entities, then parse into a DOM structure
  tempDiv.innerHTML = element.innerHTML.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

  const fragment = document.createDocumentFragment();
  Array.from(tempDiv.childNodes).forEach(node => {
    if (node.nodeType === 3) { // Text node
      const words = node.textContent.split(' ');
      words.forEach((word, index) => {
        if (word) {
          const wordSpan = document.createElement('span');
          wordSpan.style.display = 'inline-block';
          wordSpan.textContent = word;
          fragment.appendChild(wordSpan);
        }
        // Add a space back between words from the same text node
        if (index < words.length - 1) {
          fragment.appendChild(document.createTextNode(' '));
        }
      });
    } else if (node.nodeType === 1) { // Element node (e.g., <b>)
      // Wrap element nodes in a non-breaking span
      const wordSpan = document.createElement('span');
      wordSpan.style.display = 'inline-block';
      wordSpan.appendChild(node.cloneNode(true));
      fragment.appendChild(wordSpan);
    }
  });

  // Replace original content with the new, robustly-spaced structure
  element.innerHTML = '';
  element.appendChild(fragment);

  // 2. Now, wrap characters for the animation
  function wrapCharacters(node) {
    if (node.nodeType === 3) { // Text nodes (the spaces between word-spans)
      const text = node.nodeValue;
      const charFragment = document.createDocumentFragment();
      for (let char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.className = 'typewriter-char';
        charFragment.appendChild(span);
      }
      if (node.parentNode) {
        node.parentNode.replaceChild(charFragment, node);
      }
    } else if (node.nodeType === 1) { // Element nodes (our word-spans)
      Array.from(node.childNodes).forEach(wrapCharacters);
    }
  }

  wrapCharacters(element);
  element.style.visibility = 'visible';

  // 3. Animation logic (same as before)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const chars = element.querySelectorAll('.typewriter-char');
        chars.forEach((char, index) => {
          setTimeout(() => {
            char.style.opacity = '1';
          }, index * 15);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });

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
