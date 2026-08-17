const projects = [
  {
    number: "01",
    id: "flavor",
    category: "flavor",
    title: "风味与餐桌",
    titleEn: "Flavor & Table Stories",
    description:
      "从海鲜、便当到秋日热食，以食物质感和季节气息建立画面温度，让产品卖点转化为可感知的味觉想象。",
    tags: ["餐饮视觉", "食品传播", "场景叙事"],
    items: [
      { slug: "work-01", title: "海风入席", type: "portrait" },
      { slug: "work-05", title: "把春天撕开", type: "portrait" },
      { slug: "work-06", title: "一锅入秋", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-10", title: "一器一席", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-19", title: "脆到暂停一秒", type: "portrait", size: "third", mobileHalf: true },
    ],
  },
  {
    number: "02",
    id: "product",
    category: "product",
    title: "产品与新鲜感",
    titleEn: "Product & Fresh Energy",
    description:
      "以冷暖光感、果味色彩与轻科技氛围塑造产品性格，在第一视觉中同步传递功能、口感与使用场景。",
    tags: ["产品海报", "饮品传播", "电商视觉"],
    items: [
      { slug: "work-03", title: "一夜复位", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-04", title: "醒得更有柚", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-08", title: "青梅醒夏", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-14", title: "把选择交给时间", type: "portrait" },
      { slug: "work-17", title: "早餐就位", type: "portrait" },
    ],
  },
  {
    number: "03",
    id: "travel",
    category: "travel",
    title: "目的地叙事",
    titleEn: "Destination Stories",
    description:
      "用自然光、路径与地域色彩组织旅行想象，让每一张海报既是目的地介绍，也是一次即刻出发的情绪邀请。",
    tags: ["旅行海报", "目的地营销", "氛围视觉"],
    items: [
      { slug: "work-02", title: "风从梯田来", type: "portrait" },
      { slug: "work-07", title: "沿风走到海的转角", type: "portrait" },
      { slug: "work-11", title: "把公路开进银河", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-12", title: "慢慢抵达", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-13", title: "山城晚霞", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-15", title: "把颜色走成地图", type: "portrait" },
      { slug: "work-18", title: "芦苇回声", type: "portrait" },
    ],
  },
  {
    number: "04",
    id: "lifestyle",
    category: "lifestyle",
    title: "运动与能量",
    titleEn: "Active Lifestyle",
    description:
      "将攀登、夜骑与球场瞬间转化为高张力版面，以速度感构图和强对比色彩强化行动召唤。",
    tags: ["运动传播", "生活方式", "活动海报"],
    items: [
      { slug: "work-09", title: "向上没有捷径", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-16", title: "绕城一圈", type: "portrait", size: "third", mobileHalf: true },
      { slug: "work-20", title: "18:30 · 生活换一局", type: "portrait", size: "third", mobileHalf: true },
    ],
  },
];

const projectList = document.querySelector("[data-project-list]");
const allItems = projects.flatMap((project) =>
  project.items.map((item) => ({ ...item, projectTitle: project.title, projectNumber: project.number }))
);

const classForItem = (item) => {
  const classes = ["art-card", `is-${item.type}`];
  if (item.size) classes.push(`is-${item.size}`);
  if (item.mobileHalf) classes.push("mobile-half");
  return classes.join(" ");
};

const renderProject = (project) => `
  <article class="project" data-category="${project.category}" data-project="${project.id}">
    <header class="project-info reveal">
      <span class="project-number">${project.number}</span>
      <h3>${project.title}</h3>
      <p class="project-en">${project.titleEn}</p>
      <p class="project-description">${project.description}</p>
      <ul class="project-tags">
        ${project.tags.map((tag) => `<li>${tag}</li>`).join("")}
      </ul>
    </header>
    <div class="project-gallery">
      ${project.items
        .map(
          (item, itemIndex) => `
            <figure class="${classForItem(item)} reveal">
              <button
                class="art-open"
                type="button"
                data-open-art="${item.slug}"
                aria-label="查看大图：${item.title}"
              >
                <span class="art-frame">
                  <img
                    src="assets/images/${item.slug}-thumb.webp"
                    alt="${project.title}：${item.title}"
                    loading="lazy"
                    decoding="async"
                  />
                  <span class="art-hover" aria-hidden="true">↗</span>
                </span>
                <span class="art-meta">
                  <strong>${item.title}</strong>
                  <span>${project.number}.${String(itemIndex + 1).padStart(2, "0")}</span>
                </span>
              </button>
            </figure>
          `
        )
        .join("")}
    </div>
  </article>
`;

projectList.innerHTML = projects.map(renderProject).join("");

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = () => {
  const items = document.querySelectorAll(".reveal:not([data-reveal-ready])");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -5%" }
  );

  items.forEach((item, index) => {
    item.dataset.revealReady = "true";
    item.style.transitionDelay = `${Math.min((index % 4) * 55, 165)}ms`;
    observer.observe(item);
  });
};

revealItems();

const header = document.querySelector("[data-header]");
const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 30);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const closeMenu = () => {
  nav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "打开导航");
  document.body.classList.remove("is-locked");
};

menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  if (open) {
    closeMenu();
    return;
  }
  nav.classList.add("is-open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "关闭导航");
  document.body.classList.add("is-locked");
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("is-active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll(".project").forEach((project) => {
      project.hidden = filter !== "all" && project.dataset.category !== filter;
    });
  });
});

const viewer = document.querySelector("[data-viewer]");
const viewerImage = document.querySelector("[data-viewer-image]");
const viewerTitle = document.querySelector("[data-viewer-title]");
const viewerIndex = document.querySelector("[data-viewer-index]");
const viewerCaption = document.querySelector("[data-viewer-caption]");
let activeItemIndex = 0;
let touchStartX = 0;

const updateViewer = () => {
  const item = allItems[activeItemIndex];
  viewerImage.src = `assets/images/${item.slug}.webp`;
  viewerImage.alt = `${item.projectTitle}：${item.title}`;
  viewerTitle.textContent = item.title;
  viewerIndex.textContent = `${String(activeItemIndex + 1).padStart(2, "0")} / ${allItems.length}`;
  viewerCaption.textContent = `${item.projectNumber} · ${item.projectTitle} / ${item.title}`;
};

const openViewer = (slug) => {
  activeItemIndex = allItems.findIndex((item) => item.slug === slug);
  if (activeItemIndex < 0) return;
  updateViewer();
  viewer.showModal();
  document.body.classList.add("is-locked");
};

const closeViewer = () => {
  viewer.close();
  viewerImage.removeAttribute("src");
  document.body.classList.remove("is-locked");
};

const moveViewer = (direction) => {
  activeItemIndex = (activeItemIndex + direction + allItems.length) % allItems.length;
  updateViewer();
};

projectList.addEventListener("click", (event) => {
  const opener = event.target.closest("[data-open-art]");
  if (opener) openViewer(opener.dataset.openArt);
});

document.querySelector("[data-viewer-close]").addEventListener("click", closeViewer);
document.querySelector("[data-viewer-backdrop]").addEventListener("click", closeViewer);
document.querySelector("[data-viewer-prev]").addEventListener("click", () => moveViewer(-1));
document.querySelector("[data-viewer-next]").addEventListener("click", () => moveViewer(1));

viewer.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeViewer();
});

viewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") moveViewer(-1);
  if (event.key === "ArrowRight") moveViewer(1);
});

viewer.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

viewer.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) < 60) return;
  moveViewer(distance > 0 ? -1 : 1);
}, { passive: true });

if (!reducedMotion) {
  const collage = document.querySelector("[data-hero-collage]");
  window.addEventListener("pointermove", (event) => {
    if (window.innerWidth < 760) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 8;
    collage.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }, { passive: true });
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
