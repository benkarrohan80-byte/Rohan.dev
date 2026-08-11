// Vanilla JavaScript for Rohan.dev Portfolio

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // 2. Active Section Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('text-white', 'bg-slate-800/80');
            link.classList.remove('text-slate-300');
          } else {
            link.classList.remove('text-white', 'bg-slate-800/80');
            link.classList.add('text-slate-300');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-900', 'border', 'border-slate-800', 'text-slate-300');
      });

      btn.classList.remove('bg-slate-900', 'border', 'border-slate-800', 'text-slate-300');
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-md');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Interactive Inquiry Form Submission
  const inquiryForm = document.getElementById('inquiry-form');
  const successAlert = document.getElementById('contact-success');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (successAlert) {
        successAlert.classList.remove('hidden');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      inquiryForm.reset();

      setTimeout(() => {
        if (successAlert) {
          successAlert.classList.add('hidden');
        }
      }, 8000);
    });
  }

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100');
      } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});