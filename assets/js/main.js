/**
* Template Name: Laura
* Template URL: https://bootstrapmade.com/laura-free-creative-bootstrap-theme/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/* INOY portfolio preview carousel + in-modal long detail */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('projectShowcaseModal');
  if (!modalEl) return;
  const previewView = modalEl.querySelector('.project-preview-view');
  const detailView = modalEl.querySelector('.project-detail-view');
  const backBtns = modalEl.querySelectorAll('.project-detail-back');
  const detailPages = modalEl.querySelectorAll('.project-detail-page');
  let requestedIndex = 0;
  let projectSwiper;

  document.querySelectorAll('.project-modal-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      requestedIndex = Number(link.dataset.projectIndex || 0);
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    });
  });

  modalEl.addEventListener('shown.bs.modal', () => {
    if (!projectSwiper) {
      projectSwiper = new Swiper('.project-preview-swiper', {
        speed: 520,
        grabCursor: true,
        keyboard: { enabled: true },
        navigation: { nextEl: '.project-swiper-next', prevEl: '.project-swiper-prev' },
        pagination: { el: '.project-swiper-pagination', type: 'fraction' }
      });
    }
    projectSwiper.slideTo(requestedIndex, 0);
  });

  modalEl.querySelectorAll('.project-preview-media.is-clickable').forEach(media => {
    media.addEventListener('click', () => {
      const detailKey = media.closest('.project-preview-slide')?.dataset.detail;
      detailPages.forEach(page => page.classList.toggle('is-current', page.dataset.detailPage === detailKey));
      previewView.classList.add('is-hidden');
      detailView.classList.add('is-active');
      detailView.setAttribute('aria-hidden','false');
      detailView.scrollTop = 0;
    });
  });

  backBtns.forEach(backBtn => backBtn.addEventListener('click', () => {
    detailView.classList.remove('is-active');
    detailView.setAttribute('aria-hidden','true');
    detailPages.forEach(page => page.classList.remove('is-current'));
    previewView.classList.remove('is-hidden');
    projectSwiper?.update();
  }));

  modalEl.addEventListener('hidden.bs.modal', () => {
    detailView.classList.remove('is-active');
    detailView.setAttribute('aria-hidden','true');
    previewView.classList.remove('is-hidden');
    detailPages.forEach(page => page.classList.remove('is-current'));
  });
});

/* INOY VIDEO showcase */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('videoShowcaseModal');
  if (!modalEl) return;
  let videoSwiper;
  const stopAllVideos = () => modalEl.querySelectorAll('video').forEach(video => { video.pause(); });
  const openVideoModal = (event) => {
    event?.preventDefault();
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  };
  document.querySelectorAll('.video-modal-link').forEach(link => link.addEventListener('click', openVideoModal));
  const videoCard = document.querySelector('.portfolio-item.filter-product .portfolio-category-card');
  if (videoCard) videoCard.addEventListener('click', e => { if (!e.target.closest('.video-modal-link')) openVideoModal(e); });
  modalEl.addEventListener('shown.bs.modal', () => {
    if (!videoSwiper) {
      videoSwiper = new Swiper('.video-project-swiper', {
        speed: 520,
        grabCursor: true,
        loop: true,
        keyboard: { enabled: true },
        navigation: { nextEl: modalEl.querySelector('.video-swiper-next'), prevEl: modalEl.querySelector('.video-swiper-prev') },
        pagination: { el: modalEl.querySelector('.video-swiper-pagination'), type: 'fraction' },
        on: { slideChangeTransitionStart: stopAllVideos }
      });
    }
    videoSwiper.update();
  });
  modalEl.addEventListener('hidden.bs.modal', stopAllVideos);
});


/* INOY WEB showcase */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('webShowcaseModal');
  const card = document.querySelector('.web-modal-link');
  if (!modalEl || !card) return;
  const openWeb = (e) => { e?.preventDefault(); bootstrap.Modal.getOrCreateInstance(modalEl).show(); };
  card.addEventListener('click', openWeb);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openWeb(e); });

});

/* INOY DESIGN direct card click */
document.addEventListener('DOMContentLoaded', () => {
  const directDesignCard = document.querySelector('.portfolio-direct-design');
  const modal = document.getElementById('projectShowcaseModal');
  if (!directDesignCard || !modal) return;

  directDesignCard.style.cursor = 'pointer';
  directDesignCard.addEventListener('click', (event) => {
    event.preventDefault();
    bootstrap.Modal.getOrCreateInstance(modal).show();
  });
});
