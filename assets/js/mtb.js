/* ================================================================
   mtb.js — Index Page
   ================================================================

   ╔══════════════════════════════════════════════════════════════╗
   ║  CONFIGURE YOUR RESOURCES HERE                               ║
   ║  Add, edit or remove items from the RESOURCES array below.  ║
   ╚══════════════════════════════════════════════════════════════╝

   Each resource object:

   id          (number)  — unique, any number
   title       (string)  — name shown on the card
   desc        (string)  — one or two sentences
   category    (string)  — auto-creates a filter pill
   tags        (array)   — small labels on the card
   downloadUrl (string)  — direct link; use "#" if not ready yet
   previewUrl  (string)  — live demo / repo link; "" to hide button
   date        (string)  — "YYYY-MM-DD"
   featured    (bool)    — if true, always shown first

*/

const RESOURCES = [
  {
    id: 1,
    title: "SkyDate Converter",
    desc: "Bootstrap 4 portfolio template with navbar, hero, about, services, portfolio, pricing, blog and contact sections.",
    category: "Xlam",
    tags: ["Excel Add-ins", "Date Converter", "AD TO BS", "BS TO AD"],
    downloadUrl: "https://drive.mtb.com.np/Skydateconverter",
    previewUrl: "",
    date: "2024-01-10",
    featured: true,
  },
  {
    id: 2,
    title: "Busy Accounting Software",
    desc: "SASS compilation, CSS/JS minification, image compression, autoprefixer and BrowserSync live reload in one gulpfile.",
    category: "Busywin21 Rel 9.7",
    tags: ["Busy infotech", "Busy 21", "Busywin"],
    downloadUrl: "https://drive.mtb.com.np/Busywin21_v9.7",
    previewUrl: "",
    date: "2024-01-10",
    featured: true,
  },
  {
    id: 3,
    title: "Bulk Confirmation Generator",
    desc: "Drop-in HTML contact form using Web3Forms. No server needed — paste your key and it works.",
    category: "Confirmation Generator",
    tags: ["Party Confirmation Creator", "MS Access"],
    downloadUrl: "https://drive.mtb.com.np",
    previewUrl: "https://mtb.com.np",
    date: "2024-02-05",
    featured: true,
  },
  {
    id: 4,
    title: "Nepali Miti for Busywin21",
    desc: "Minimal sticky navigation using Bootstrap Affix. Works without a framework on modern setups.",
    category: "BDS FILE",
    tags: ["Nepali Miti", "BDS"],
    downloadUrl: "https://drive.mtb.com.np/BusyNepaliMiti",
    previewUrl: "https:mtb.com.np",
    date: "2024-02-20",
    featured: true,
  },
  {
    id: 5,
    title: "GenP",
    desc: "Local HTML reference page for all Themify Icons with class names. Useful for offline work.",
    category: "Adobe Patcher",
    tags: ["EXE", "Adobe Tools"],
    downloadUrl: "https://drive.mtb.com.np/AdobetTools",
    previewUrl: "https://gen.paramore.su/",
    date: "2024-03-01",
    featured: true,
  },
  {
    id: 6,
    title: "Nepali Miti For Tally",
    desc: "Buttons, inputs, dropdowns, navbars, badges, alerts and tables — all in one stylesheet.",
    category: "TCP",
    tags: ["Tally Add-ons", "TDL","TCP"],
    downloadUrl: "https://drive.mtb.com.np/TallyNepaliMiti",
    previewUrl: "",
    date: "2024-03-15",
    featured: true,
  },
];

/* ================================================================
   App — no need to edit below this line
   ================================================================ */

// ── DOM refs ────────────────────────────────────────────────────
const cardGrid      = document.getElementById("card-grid");
const filterPills   = document.getElementById("filter-pills");
const sortSelect    = document.getElementById("sort-select");
const resultsCount  = document.getElementById("results-count");
const emptyState    = document.getElementById("empty-state");
const resetBtn      = document.getElementById("reset-btn");

// search overlay
const searchOverlay = document.getElementById("search-overlay");
const searchTrigger = document.getElementById("search-trigger");
const searchClose   = document.getElementById("search-close");
const searchInput   = document.getElementById("search-modal-input");
const searchResults = document.getElementById("search-results");

// nav mobile
const hamburger     = document.getElementById("nav-hamburger");
const navMobile     = document.getElementById("nav-mobile");

// ── State ────────────────────────────────────────────────────────
let activeCategory = "All";
let sortOrder      = "newest";

// ── Build filter pills ───────────────────────────────────────────
function buildPills() {
  const cats = ["All", ...new Set(RESOURCES.map(r => r.category))];
  filterPills.innerHTML = "";
  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filter-pill" + (cat === activeCategory ? " active" : "");
    btn.textContent = cat;
    btn.addEventListener("click", () => {
      activeCategory = cat;
      render();
    });
    filterPills.appendChild(btn);
  });
}

// ── Filter + sort ────────────────────────────────────────────────
function getFiltered() {
  let list = RESOURCES.slice();
  if (activeCategory !== "All") {
    list = list.filter(r => r.category === activeCategory);
  }
  list.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (sortOrder === "newest") return new Date(b.date) - new Date(a.date);
    if (sortOrder === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortOrder === "name")   return a.title.localeCompare(b.title);
    return 0;
  });
  return list;
}

// ── Build a card ─────────────────────────────────────────────────
function buildCard(r) {
  const isReady = r.downloadUrl !== "#";
  const tagsHtml = r.tags.map(t => `<span class="card-tag">${t}</span>`).join("");
  const previewBtn = r.previewUrl
    ? `<a href="${r.previewUrl}" class="btn-preview" target="_blank" rel="noopener" title="Preview"><i class="ti-eye"></i></a>`
    : "";

  const card = document.createElement("article");
  card.className = "resource-card";
  card.innerHTML = `
    <div class="card-top">
      <span class="card-category">${r.category}</span>
      <span class="badge-free">free</span>
    </div>
    <h2 class="card-title">${r.title}</h2>
    <p class="card-desc">${r.desc}</p>
    <div class="card-tags">${tagsHtml}</div>
    <div class="card-actions">
      <a
        href="${isReady ? r.downloadUrl : "javascript:void(0)"}"
        class="btn-dl${isReady ? "" : " coming"}"
        ${isReady ? 'target="_blank" rel="noopener"' : ""}
      >
        <i class="ti-download"></i>
        ${isReady ? "Download" : "Coming soon"}
      </a>
      ${previewBtn}
    </div>
  `;

  return card;
}

// ── Render ───────────────────────────────────────────────────────
function render() {
  // sync pills
  filterPills.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.textContent === activeCategory);
  });

  const filtered = getFiltered();
  const total = RESOURCES.length;

  resultsCount.textContent = filtered.length === total
    ? `${total} resources`
    : `${filtered.length} of ${total} resources`;

  cardGrid.innerHTML = "";
  if (filtered.length === 0) {
    emptyState.hidden = false;
    cardGrid.hidden = true;
  } else {
    emptyState.hidden = true;
    cardGrid.hidden = false;
    filtered.forEach(r => cardGrid.appendChild(buildCard(r)));
  }

  // re-apply spotlight after new cards are rendered
  initSpotlight();
}

// ── Cursor spotlight ─────────────────────────────────────────────
// Tracks mouse position relative to each card and updates
// CSS custom properties --mx / --my for the radial gradient in CSS.
function initSpotlight() {
  if (window.matchMedia("(hover: none)").matches) return;
  // listener is on the stable container so it survives re-renders
  cardGrid.onpointermove = e => {
    const card = e.target.closest(".resource-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + "%");
    card.style.setProperty("--my", ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + "%");
  };
  cardGrid.onpointerleave = e => {
    const card = e.target.closest(".resource-card");
    if (card) { card.style.setProperty("--mx", "50%"); card.style.setProperty("--my", "50%"); }
  };
}

// ── Sort ─────────────────────────────────────────────────────────
sortSelect.addEventListener("change", () => { sortOrder = sortSelect.value; render(); });

// ── Reset ────────────────────────────────────────────────────────
resetBtn.addEventListener("click", () => {
  activeCategory = "All";
  sortOrder = "newest";
  sortSelect.value = "newest";
  render();
});

// ── Mobile nav ───────────────────────────────────────────────────
hamburger.addEventListener("click", () => navMobile.classList.toggle("open"));
document.addEventListener("click", e => {
  if (!navMobile.contains(e.target) && !hamburger.contains(e.target)) {
    navMobile.classList.remove("open");
  }
});

// ── Search overlay ───────────────────────────────────────────────
// Uses a CSS class "open" so there's no hidden/display race condition.

function openSearch() {
  searchOverlay.classList.add("open");
  searchInput.value = "";
  renderSearchResults("");
  searchInput.focus();
}

function closeSearch() {
  searchOverlay.classList.remove("open");
}

function isSearchOpen() {
  return searchOverlay.classList.contains("open");
}

function renderSearchResults(q) {
  const query = q.trim().toLowerCase();
  if (!query) {
    searchResults.innerHTML = `<p class="search-empty">Start typing to search…</p>`;
    return;
  }
  const hits = RESOURCES.filter(r =>
    r.title.toLowerCase().includes(query) ||
    r.desc.toLowerCase().includes(query) ||
    r.category.toLowerCase().includes(query) ||
    r.tags.some(t => t.toLowerCase().includes(query))
  );
  if (hits.length === 0) {
    searchResults.innerHTML = `<p class="search-empty">No results for "${q}"</p>`;
    return;
  }
  searchResults.innerHTML = hits.map(r => {
    const href = r.downloadUrl !== "#" ? r.downloadUrl : r.previewUrl || "";
    const external = href && href !== "" ? 'target="_blank" rel="noopener"' : "";
    return `
      <a class="search-result-item" href="${href || "javascript:void(0)"}" ${external}>
        <span class="sri-cat">${r.category}</span>
        <span class="sri-title">${r.title}</span>
        <i class="ti-angle-right sri-arrow"></i>
      </a>`;
  }).join("");
}

searchTrigger.addEventListener("click", openSearch);
searchClose.addEventListener("click", closeSearch);

// clicking the backdrop (the overlay itself outside the modal) closes search
searchOverlay.addEventListener("click", e => {
  if (e.target === searchOverlay) closeSearch();
});

searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));

// Ctrl+K to open, Esc to close
document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    isSearchOpen() ? closeSearch() : openSearch();
  }
  if (e.key === "Escape" && isSearchOpen()) {
    closeSearch();
  }
});

// ── Init ─────────────────────────────────────────────────────────
buildPills();
render();
