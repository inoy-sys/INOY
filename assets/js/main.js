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

/* INOY 프리로더 — 리소스 로딩 대기 + 최대 대기 시간 */
const preloader = document.querySelector('#preloader');

if (preloader) {
  const loaderStartedAt = performance.now();
  const minimumDisplayTime = 800;
  const maximumDisplayTime = 5000;

  let isHiding = false;

  const hidePreloader = () => {
    if (isHiding) return;
    isHiding = true;

    const elapsed = performance.now() - loaderStartedAt;
    const wait = Math.max(0, minimumDisplayTime - elapsed);

    window.setTimeout(() => {
      preloader.classList.add('is-leaving');

      window.setTimeout(() => {
        preloader.remove();
      }, 620);
    }, wait);
  };

  // 이미지 등 페이지 리소스 로딩 완료 후 닫기
  if (document.readyState === 'complete') {
    hidePreloader();
  } else {
    window.addEventListener('load', hidePreloader, { once: true });
  }

  // 일부 리소스가 늦어져도 최대 5초 후에는 닫기
  window.setTimeout(hidePreloader, maximumDisplayTime);
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
  const slides = Array.from(modalEl.querySelectorAll('.project-preview-slide'));
  const prevBtn = modalEl.querySelector('.project-swiper-prev');
  const nextBtn = modalEl.querySelector('.project-swiper-next');
  const pagination = modalEl.querySelector('.project-swiper-pagination');
  let requestedIndex = 0;
  let activeIndex = 0;

  const renderDesignSlide = (index, direction = 'next') => {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === activeIndex;
      slide.classList.remove('is-design-active', 'from-prev');
      if (active) {
        if (direction === 'prev') slide.classList.add('from-prev');
        void slide.offsetWidth;
        slide.classList.add('is-design-active');
      }
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    if (pagination) pagination.textContent = `${activeIndex + 1} / ${slides.length}`;
  };

  document.querySelectorAll('.project-modal-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      requestedIndex = Number(link.dataset.projectIndex || 0);
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    });
  });

  prevBtn?.addEventListener('click', () => renderDesignSlide(activeIndex - 1, 'prev'));
  nextBtn?.addEventListener('click', () => renderDesignSlide(activeIndex + 1, 'next'));

  modalEl.addEventListener('keydown', e => {
    if (detailView.classList.contains('is-active')) return;
    if (e.key === 'ArrowLeft') renderDesignSlide(activeIndex - 1, 'prev');
    if (e.key === 'ArrowRight') renderDesignSlide(activeIndex + 1, 'next');
  });

  modalEl.addEventListener('shown.bs.modal', () => renderDesignSlide(requestedIndex));

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
    renderDesignSlide(activeIndex);
  }));

  modalEl.addEventListener('hidden.bs.modal', () => {
    detailView.classList.remove('is-active');
    detailView.setAttribute('aria-hidden','true');
    previewView.classList.remove('is-hidden');
    detailPages.forEach(page => page.classList.remove('is-current'));
  });

  renderDesignSlide(0);
});


/* INOY VIDEO showcase */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('videoShowcaseModal');
  if (!modalEl) return;
  const slides = Array.from(modalEl.querySelectorAll('.video-project-slide'));
  const prevBtn = modalEl.querySelector('.video-swiper-prev');
  const nextBtn = modalEl.querySelector('.video-swiper-next');
  const pagination = modalEl.querySelector('.video-swiper-pagination');
  let activeIndex = 0;

  const stopAllVideos = () => modalEl.querySelectorAll('video').forEach(video => video.pause());

  const renderSlide = (index, direction = 'next') => {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;
    stopAllVideos();

    slides.forEach((slide, i) => {
      const active = i === activeIndex;
      slide.classList.remove('is-video-active', 'from-prev');
      if (active) {
        if (direction === 'prev') slide.classList.add('from-prev');
        void slide.offsetWidth;
        slide.classList.add('is-video-active');
      }
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    if (pagination) pagination.textContent = `${activeIndex + 1} / ${slides.length}`;
  };

  const openVideoModal = (event) => {
    event?.preventDefault();
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  };

  document.querySelectorAll('.video-modal-link').forEach(link => link.addEventListener('click', openVideoModal));
  const videoCard = document.querySelector('.portfolio-item.filter-product .portfolio-category-card');
  if (videoCard) videoCard.addEventListener('click', e => {
    if (!e.target.closest('.video-modal-link')) openVideoModal(e);
  });

  prevBtn?.addEventListener('click', () => renderSlide(activeIndex - 1, 'prev'));
  nextBtn?.addEventListener('click', () => renderSlide(activeIndex + 1, 'next'));

  modalEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') renderSlide(activeIndex - 1, 'prev');
    if (e.key === 'ArrowRight') renderSlide(activeIndex + 1, 'next');
  });

  modalEl.addEventListener('shown.bs.modal', () => renderSlide(activeIndex));
  modalEl.addEventListener('hidden.bs.modal', stopAllVideos);
  renderSlide(0);
});


/* INOY WEB showcase */
document.addEventListener('DOMContentLoaded', () => {
  const modalEl = document.getElementById('webShowcaseModal');
  const card = document.querySelector('.web-modal-link');
  if (!modalEl || !card) return;

  const slides = Array.from(modalEl.querySelectorAll('.web-project-slide'));
  const prevBtn = modalEl.querySelector('.web-swiper-prev');
  const nextBtn = modalEl.querySelector('.web-swiper-next');
  const pagination = modalEl.querySelector('.web-swiper-pagination');
  let activeIndex = 0;

  const renderWebSlide = (index, direction = 'next') => {
    if (!slides.length) return;
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === activeIndex;
      slide.classList.remove('is-web-active', 'from-prev');
      if (active) {
        if (direction === 'prev') slide.classList.add('from-prev');
        void slide.offsetWidth;
        slide.classList.add('is-web-active');
      }
      slide.setAttribute('aria-hidden', active ? 'false' : 'true');
    });

    if (pagination) pagination.textContent = `${activeIndex + 1} / ${slides.length}`;
  };

  const openWeb = (e) => {
    e?.preventDefault();
    activeIndex = 0;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  };

  card.addEventListener('click', openWeb);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openWeb(e);
  });

  prevBtn?.addEventListener('click', () => renderWebSlide(activeIndex - 1, 'prev'));
  nextBtn?.addEventListener('click', () => renderWebSlide(activeIndex + 1, 'next'));

  modalEl.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') renderWebSlide(activeIndex - 1, 'prev');
    if (e.key === 'ArrowRight') renderWebSlide(activeIndex + 1, 'next');
  });

  modalEl.addEventListener('shown.bs.modal', () => renderWebSlide(activeIndex));
  renderWebSlide(0);
});

/* INOY DESIGN direct card click */
document.addEventListener('DOMContentLoaded', () => {
  const directDesignCard = document.querySelector('.portfolio-direct-design');
  const modal = document.getElementById('projectShowcaseModal');
  if (!directDesignCard || !modal) return;

  directDesignCard.style.cursor = 'pointer';
  directDesignCard.addEventListener('click', (event) => {
    // 내부의 개별 작품 링크(.project-modal-link)를 눌렀을 때는
    // 위의 DESIGN 슬라이드 코드가 data-project-index를 처리하도록 그대로 둔다.
    if (event.target.closest('.project-modal-link')) return;

    event.preventDefault();
    bootstrap.Modal.getOrCreateInstance(modal).show();
  });
});
