export function initNavigation() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  const links = nav.querySelectorAll<HTMLAnchorElement>('[data-nav-link]');
  const sections = document.querySelectorAll<HTMLElement>('[data-section]');
  const navHeight = nav.offsetHeight;

  // Initialize Intersection Observer for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to show the section
        entry.target.classList.remove('opacity-0', 'translate-y-4');
        
        // Update active link
        const id = entry.target.id;
        updateActiveLink(id);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: `-${navHeight}px 0px -20% 0px`
  });

  // Observe all sections
  sections.forEach(section => {
    observer.observe(section);
  });

  // Update active link based on scroll position
  function updateActiveLink(activeId: string) {
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('border-accent');
        link.classList.remove('border-transparent');
      } else {
        link.classList.remove('border-accent');
        link.classList.add('border-transparent');
      }
    });
  }

  // Initialize scroll spy
  function scrollSpy() {
    const scrollPos = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Check if we're at the bottom of the page
    if (scrollPos + windowHeight >= documentHeight - 10) {
      const lastSection = sections[sections.length - 1];
      updateActiveLink(lastSection.id);
      return;
    }

    // Find the current section
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      updateActiveLink(currentSection);
    }
  }

  // Add scroll event listener with throttling
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        scrollSpy();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Handle smooth scrolling
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (!targetId) return;
      
      const targetSection = document.querySelector<HTMLElement>(targetId);
      if (targetSection) {
        const targetPosition = targetSection.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        history.pushState(null, '', targetId);
        updateActiveLink(targetId.substring(1));
      }
    });
  });

  // Handle initial hash
  const hash = window.location.hash;
  if (hash) {
    const targetSection = document.querySelector<HTMLElement>(hash);
    if (targetSection) {
      setTimeout(() => {
        const targetPosition = targetSection.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        updateActiveLink(hash.substring(1));
      }, 100);
    }
  }

  // Initial scroll spy call
  scrollSpy();
}