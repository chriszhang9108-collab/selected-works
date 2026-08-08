const projects = [
  {
    number: "01",
    id: "sandvik",
    category: "editorial",
    title: "山特维克宣传册",
    titleEn: "Sandvik Corporate Brochure",
    description:
      "以高留白、青色识别和模块化信息层级，将技术服务、设备与企业能力组织成易读的画册叙事。",
    tags: ["企业画册", "信息编排", "工业视觉"],
    items: [
      { slug: "sandvik-cover", title: "封面与地图", type: "landscape", size: "wide" },
      { slug: "sandvik-01", title: "品牌介绍", type: "landscape" },
      { slug: "sandvik-02", title: "安全与服务", type: "landscape" },
      { slug: "sandvik-03", title: "设备与焊接", type: "landscape" },
      { slug: "sandvik-04", title: "培训与技术", type: "landscape" },
      { slug: "sandvik-05", title: "维修与保养", type: "landscape" },
      { slug: "sandvik-06", title: "设备现场", type: "landscape" },
      { slug: "sandvik-07", title: "品牌愿景", type: "landscape" },
    ],
  },
  {
    number: "02",
    id: "binhe",
    category: "property",
    title: "滨河御景苑",
    titleEn: "Binhe Yujingyuan Campaign",
    description:
      "围绕高端住宅调性建立深蓝与鎏金的统一语言，并延展至销售、活动、导视等多类线下物料。",
    tags: ["地产营销", "活动视觉", "空间物料"],
    items: [
      { slug: "binhe-floor-guide", title: "楼层导视", type: "square", size: "third", mobileHalf: true },
      { slug: "binhe-photo-event", title: "摄影活动", type: "portrait", size: "third", mobileHalf: true },
      { slug: "binhe-cycling-event", title: "骑行活动", type: "portrait", size: "third", mobileHalf: true },
      { slug: "binhe-property-campaign", title: "楼盘宣传", type: "portrait", size: "wide" },
    ],
  },
  {
    number: "03",
    id: "brand",
    category: "brand",
    title: "品牌与电商视觉",
    titleEn: "Brand & E-commerce Visuals",
    description:
      "从清新自然到专业科技，为不同产品建立匹配消费场景的图像氛围、卖点层级和视觉记忆。",
    tags: ["电商海报", "产品传播", "品牌氛围"],
    items: [
      { slug: "tea-oil-campaign", title: "茶油产品传播", type: "portrait", size: "third", mobileHalf: true },
      { slug: "cosmetics-ecommerce", title: "化妆品电商", type: "portrait", size: "third", mobileHalf: true },
      { slug: "pechoin-beauty", title: "百雀羚美肤", type: "portrait", size: "third", mobileHalf: true },
    ],
  },
  {
    number: "04",
    id: "campaign",
    category: "campaign",
    title: "招聘与节气传播",
    titleEn: "Recruitment & Seasonal Campaigns",
    description:
      "以直接的信息层级和鲜明色彩快速建立传播主题，同时适配展架、海报与横版社交内容。",
    tags: ["招聘海报", "节气内容", "线下展架"],
    items: [
      { slug: "team-hiring-banner", title: "团队扩招展架", type: "portrait", size: "third", mobileHalf: true },
      { slug: "hiring-poster", title: "招聘活动海报", type: "portrait", size: "third", mobileHalf: true },
      { slug: "spring-hiring", title: "春季招聘", type: "landscape", size: "third", mobileHalf: true },
      { slug: "great-heat-seasonal", title: "大暑节气视觉", type: "landscape", size: "wide" },
    ],
  },
  {
    number: "05",
    id: "digital",
    category: "digital",
    title: "有家网平台宣传",
    titleEn: "Youjia Platform Visual",
    description:
      "以深色科技感底色承载平台生态与品牌合作信息，在长横幅中平衡识别、信息量与远距阅读。",
    tags: ["平台传播", "数字横幅", "品牌合作"],
    items: [
      { slug: "youjia-platform", title: "平台品牌长横幅", type: "banner", size: "wide" },
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
