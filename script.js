/* ==========================================================
   LAMFAM Charity — site behaviour
   ========================================================== */

// ---- Edit the team here. Add `photo: "assets/team/name.jpg"` once you have headshots.
const TEAM = [
  { name: "Team member", role: "Founder" },
  { name: "Team member", role: "Event Coordinator" },
  { name: "Team member", role: "Finance & Donations" },
  { name: "Team member", role: "Projects & Logistics" },
  { name: "Team member", role: "Media & Communications" },
  { name: "Team member", role: "Volunteer Lead" },
];

// ---- Messages from the contact form are sent here (opens the visitor's email app).
const CONTACT_EMAIL = "hello@lamfamcharity.org";

const root = document.documentElement;

// Icons
if (window.lucide) lucide.createIcons();

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Team
const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
document.getElementById("teamGrid").innerHTML = TEAM.map((m) => `
  <article class="member reveal">
    <div class="member__photo">
      ${m.photo
        ? `<img class="photo" src="${m.photo}" alt="${m.name}, ${m.role}" loading="lazy" />`
        : `<span class="member__initials">${initials(m.name)}</span><span class="watermark" aria-hidden="true"></span>`}
    </div>
    <div>
      <h3>${m.name}</h3>
      <p>${m.role}</p>
    </div>
  </article>`).join("");

// About tabs (arrow keys move between tabs)
const tabs = [...document.querySelectorAll('[role="tab"]')];
const selectTab = (tab) => {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute("aria-selected", String(on));
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
  });
  swapPhoto(document.getElementById("aboutMain"), tab.dataset.main, tab.dataset.mainAlt);
  swapPhoto(document.getElementById("aboutCircle"), tab.dataset.circle, tab.dataset.circleAlt);
};

// Cross-fade a collage photo to a new image once it has loaded
function swapPhoto(img, src, alt) {
  if (!img || !src || img.getAttribute("src") === src) return;
  img.classList.add("is-swapping");
  const next = new Image();
  next.onload = next.onerror = () => setTimeout(() => {
    img.src = src;
    img.alt = alt;
    img.classList.remove("is-swapping");
  }, 250);
  next.src = src;
}

// Preload the tab photos so switching is instant
tabs.forEach((t) => [t.dataset.main, t.dataset.circle].forEach((src) => { if (src) new Image().src = src; }));
tabs.forEach((t, i) => {
  t.addEventListener("click", () => selectTab(t));
  t.addEventListener("keydown", (e) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = tabs[(i + step + tabs.length) % tabs.length];
    selectTab(next);
    next.focus();
  });
});

// Theme toggle
const isDark = () =>
  root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("lamfam-theme", next); } catch (e) {}
});

// Nav: scrolled state
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("is-scrolled", scrollY > 12);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("mobileMenu");
const setMenu = (open) => {
  menu.hidden = !open;
  menuBtn.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-scrolled", open || scrollY > 12);
};
menuBtn.addEventListener("click", () => setMenu(menu.hidden));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 80}ms`;
    el.classList.add("is-in");
    io.unobserve(el);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Count-up stats
const counter = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1600;
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    counter.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => counter.observe(el));

// Active nav link
const links = [...document.querySelectorAll(".nav__links a")];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.hash === `#${e.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

// "Volunteer" / "Partner" cards preselect the form subject
document.querySelectorAll("[data-subject]").forEach((a) =>
  a.addEventListener("click", () => { document.getElementById("subject").value = a.dataset.subject; }));

// Contact form -> email
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = `[Website] ${f.get("subject")} — ${f.get("name")}`;
  const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById("formNote").textContent = "Opening your email app… Jazakallahu khairan!";
});
