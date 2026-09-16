/* =========================
   MOBILE MENU
========================= */

const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");

if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");

    /* 햄버거 버튼 활성화 */
    toggle.classList.toggle("active", open);

    /* 접근성 상태 */
    toggle.setAttribute("aria-expanded", String(open));
  });

  /* 모바일 메뉴 클릭하면 메뉴 닫기 */
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* =========================
   메인 원페이지 상단 메뉴
========================= */

const mainPage = document.body.classList.contains("main-page");

const mainNavLinks = document.querySelectorAll(
  ".main-page .desktop-nav a[data-section], .main-page .mobile-nav a[data-section]"
);

const sections = ["menu", "brand", "event", "store"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

let isMenuClick = false;
let clickedTarget = "";
let unlockTimer;


/* 현재 메뉴 활성화 */
function setActive(targetId) {
  mainNavLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${targetId}`
    );
  });
}


if (mainPage) {

  /* 메뉴 클릭 */
  mainNavLinks.forEach((link) => {
    link.addEventListener("click", (event) => {

      const targetId = link.dataset.section;
      const target = document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      isMenuClick = true;
      clickedTarget = targetId;

      clearTimeout(unlockTimer);

      /* 현재 메뉴 활성화 */
      setActive(targetId);

      /* 헤더 높이 계산 */
      const header = document.querySelector(".site-header");
      const headerHeight = header
        ? header.offsetHeight
        : 92;

      /* 이동 위치 */
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      /* 부드러운 스크롤 */
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });

      /* 모바일 메뉴 닫기 */
      if (mobileNav) {
        mobileNav.classList.remove("open");
      }

      /* 햄버거 활성화 해제 */
      if (toggle) {
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      }

      unlockTimer = setTimeout(() => {
        isMenuClick = false;
        setActive(clickedTarget);
      }, 900);

    });
  });


  /* =========================
     스크롤 위치에 따라
     메뉴 자동 활성화
  ========================= */

  function updateActiveMenu() {

    if (isMenuClick) return;

    const header = document.querySelector(".site-header");

    const headerHeight = header
      ? header.offsetHeight
      : 92;

    const position =
      window.scrollY +
      headerHeight +
      120;

    let current = "";

    sections.forEach((section) => {
      if (position >= section.offsetTop) {
        current = section.id;
      }
    });

    if (current) {
      setActive(current);
    } else {
      mainNavLinks.forEach((link) => {
        link.classList.remove("active");
      });
    }
  }


  window.addEventListener(
    "scroll",
    updateActiveMenu,
    { passive: true }
  );

  window.addEventListener(
    "load",
    updateActiveMenu
  );
}


/* =========================
   스크롤 등장 효과
========================= */

const revealElements =
  document.querySelectorAll(".reveal");

if (
  "IntersectionObserver" in window &&
  revealElements.length > 0
) {

  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            entry.target.classList.add("show");

            /* 한 번 등장하면 관찰 종료 */
            revealObserver.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.14,
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

} else {

  /* 구형 브라우저 대비 */
  revealElements.forEach((element) => {
    element.classList.add("show");
  });

}


/* =========================
   메뉴 상세페이지 필터
========================= */

const filterButtons =
  document.querySelectorAll("[data-filter]");

const catalogItems =
  document.querySelectorAll("[data-category]");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    /* 기존 활성 버튼 해제 */
    filterButtons.forEach((item) => {
      item.classList.remove("active");
    });

    /* 클릭한 버튼 활성화 */
    button.classList.add("active");

    const filter = button.dataset.filter;

    catalogItems.forEach((item) => {

      if (
        filter === "all" ||
        item.dataset.category === filter
      ) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }

    });

  });

});


/* =========================
   HERO DENY CHARACTER ACTION
========================= */

const heroMascot = document.querySelector(".hero-mascot");
const heroDrinkHitbox = document.querySelector(".hero-drink-hitbox");
const heroBreadHitbox = document.querySelector(".hero-bread-hitbox");

if (heroMascot) {

  const denyNormalSrc = "./assets/deny-hero.png";
  const denyBlinkSrc = "./assets/deny-hero-blink.png";

  /* 커피 */
  const denyDrinkStep1Src = "./assets/deny-drink-step1.png";
  const denyDrinkStep2Src = "./assets/deny-drink-step2.png";
  const denyDrinkFinalSrc = "./assets/deny-drink-01.png";

  /* 빵 */
  const denyBreadStep1Src = "./assets/deny-bread-step1.png";
  const denyBreadStep2Src = "./assets/deny-bread-step2.png";
  const denyBreadFinalSrc = "./assets/deny-bread-02.png";

  let isActing = false;
  let blinkTimer = null;


  /* 이미지 미리 불러오기 */
  [
    denyBlinkSrc,

    denyDrinkStep1Src,
    denyDrinkStep2Src,
    denyDrinkFinalSrc,

    denyBreadStep1Src,
    denyBreadStep2Src,
    denyBreadFinalSrc
  ].forEach((src) => {

    const image = new Image();
    image.src = src;

  });


  /* =========================
     눈 깜빡임
  ========================= */

  function blinkDeny() {

    if (isActing) return;

    heroMascot.src = denyBlinkSrc;

    setTimeout(() => {

      if (!isActing) {
        heroMascot.src = denyNormalSrc;
      }

    }, 160);
  }


  function scheduleDenyBlink() {

    clearTimeout(blinkTimer);

    const delay = 4500 + Math.random() * 5000;

    blinkTimer = setTimeout(() => {

      if (!isActing) {

        blinkDeny();

        if (Math.random() < 0.25) {

          setTimeout(() => {
            blinkDeny();
          }, 230);

        }
      }

      scheduleDenyBlink();

    }, delay);
  }


  function finishDenyAction() {

    heroMascot.src = denyNormalSrc;
    isActing = false;

    scheduleDenyBlink();
  }


  scheduleDenyBlink();


  /* =========================
     커피 클릭
     기본 → step1 → step2 → 실제 마시기 → 기본
  ========================= */

  if (heroDrinkHitbox) {

    heroDrinkHitbox.addEventListener("click", (event) => {

      event.stopPropagation();

      if (isActing) return;

      isActing = true;
      clearTimeout(blinkTimer);


      /* STEP 1 */
      heroMascot.src = denyDrinkStep1Src;


      setTimeout(() => {

        /* STEP 2 */
        heroMascot.src = denyDrinkStep2Src;


        setTimeout(() => {

          /* 실제로 빨대 물고 마시기 */
          heroMascot.src = denyDrinkFinalSrc;


          setTimeout(() => {

            finishDenyAction();

          }, 950);

        }, 500);

      }, 450);

    });
  }


  /* =========================
     빵 클릭
     기본 → step1 → step2 → 꺼억 → 기본
  ========================= */

  if (heroBreadHitbox) {

    heroBreadHitbox.addEventListener("click", (event) => {

      event.stopPropagation();

      if (isActing) return;

      isActing = true;
      clearTimeout(blinkTimer);


      /* STEP 1 */
      heroMascot.src = denyBreadStep1Src;


      setTimeout(() => {

        /* STEP 2 */
        heroMascot.src = denyBreadStep2Src;


        setTimeout(() => {

          /* 다 먹고 꺼억 */
          heroMascot.src = denyBreadFinalSrc;


          setTimeout(() => {

            finishDenyAction();

          }, 1200);

        }, 550);

      }, 450);

    });
  }


  /* =========================
     데니 몸 클릭
  ========================= */

  heroMascot.addEventListener("click", () => {

    if (isActing) return;

    heroMascot.animate(
      [
        {
          transform: "translateY(0) rotate(0deg) scale(1)"
        },
        {
          transform: "translateY(-28px) rotate(-6deg) scale(1.06)",
          offset: 0.25
        },
        {
          transform: "translateY(-12px) rotate(6deg) scale(1.03)",
          offset: 0.5
        },
        {
          transform: "translateY(-18px) rotate(-3deg) scale(1.04)",
          offset: 0.7
        },
        {
          transform: "translateY(0) rotate(0deg) scale(1)"
        }
      ],
      {
        duration: 700,
        easing: "ease-out"
      }
    );

  });

}

/* ==================================================
   MENU CATEGORY TABS
================================================== */

const menuTabs =
  document.querySelectorAll("[data-menu-tab]");

const menuPanels =
  document.querySelectorAll("[data-menu-panel]");


menuTabs.forEach((tab) => {

  tab.addEventListener("click", () => {

    const target =
      tab.dataset.menuTab;


    /* 모든 버튼 활성화 해제 */

    menuTabs.forEach((item) => {
      item.classList.remove("active");
    });


    /* 클릭한 버튼 활성화 */

    tab.classList.add("active");


    /* 모든 메뉴 패널 숨김 */

    menuPanels.forEach((panel) => {
      panel.classList.remove("active");
    });


    /* 선택한 메뉴만 표시 */

    const targetPanel =
      document.querySelector(
        `[data-menu-panel="${target}"]`
      );


    if (targetPanel) {

      targetPanel.classList.add("active");


      /* 해당 메뉴의 슬라이더를 처음 위치로 */

      const slider =
        targetPanel.querySelector(
          ".menu-slider-track"
        );

      if (slider) {
        slider.scrollLeft = 0;
      }

    }

  });

});


/* ==================================================
   MENU CARD SLIDER
================================================== */

document
  .querySelectorAll(".menu-panel")
  .forEach((panel) => {

    const slider =
      panel.querySelector(
        ".menu-slider-track"
      );

    const prevButton =
      panel.querySelector(
        ".menu-slider-prev"
      );

    const nextButton =
      panel.querySelector(
        ".menu-slider-next"
      );


    if (
      !slider ||
      !prevButton ||
      !nextButton
    ) {
      return;
    }


    function getScrollAmount() {

      const card =
        slider.querySelector(
          ".menu-book-card"
        );


      if (!card) {
        return 300;
      }


      return card.offsetWidth + 20;

    }


    nextButton.addEventListener(
      "click",
      () => {

        slider.scrollBy({
          left: getScrollAmount(),
          behavior: "smooth"
        });

      }
    );


    prevButton.addEventListener(
      "click",
      () => {

        slider.scrollBy({
          left: -getScrollAmount(),
          behavior: "smooth"
        });

      }
    );

  });


/* ==================================================
   STORE MAP - OpenStreetMap / Free Drag
================================================== */

(function initAdenStoreMap() {

  const mapElement = document.getElementById("naver-map");

  if (!mapElement || typeof L === "undefined") return;


  const adenPosition = [
    35.172452639308,
    129.1311359262
  ];


  const map = L.map(mapElement, {

    center: adenPosition,
    zoom: 17,

    dragging: true,
    scrollWheelZoom: true,
    touchZoom: true,
    doubleClickZoom: true,
    boxZoom: true,
    keyboard: true,
    zoomControl: true,
    attributionControl: true

  });


  L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {

      maxZoom: 19,
      tileSize: 256,

      attribution:
        "&copy; OpenStreetMap contributors"

    }
  ).addTo(map);


  const marker = L.marker(
    adenPosition,
    {

      title:
        "ADEN Boulangerie Centum SH",

      keyboard: true

    }
  ).addTo(map);


  marker.bindPopup(`
    <a
      class="aden-map-link"
      href="https://map.naver.com/p/entry/place/1490400702"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="네이버지도에서 아덴블랑제리 센텀SH밸리점 보기"
    >
      <strong>ADEN Boulangerie Centum SH</strong>
      <span>부산광역시 해운대구 센텀동로 35</span>
      <em>네이버지도에서 보기 →</em>
    </a>
  `, {

    closeButton: true,
    autoClose: false,
    closeOnClick: false,
    offset: [0, -2]

  });


  /* 처음부터 매장 카드 표시 */
  marker.openPopup();


  /* 마커 클릭 → 카드 다시 열기 */
  marker.on("click", () => {
    marker.openPopup();
  });


  /* 지도 크기 보정 */
  requestAnimationFrame(() => {
    map.invalidateSize(false);
  });


  setTimeout(() => {
    map.invalidateSize(false);
  }, 200);


  window.addEventListener(
    "resize",
    () => {
      map.invalidateSize(false);
    }
  );

})();