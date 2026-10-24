/* ==========================================================
   LAMFAM Charity — site behaviour
   ========================================================== */

// ---- Edit the team here. Add `photo: "assets/team/name.jpg"` once you have headshots,
// and `phone: "+220 …"` to list someone under Contact with Call / WhatsApp buttons.
const TEAM = [
  { name: "Ya Fatou", role: "Founder" },
  { name: "Muhammed Darboe", role: "Event Coordinator", phone: "+220 877595999" },
  { name: "Pa Sulley", role: "Team member" },
  { name: "Fatoumatta", role: "Team member" },
];

// ---- Donation details shown in the Donate section. Empty values show "Coming soon".
const DONATE = {
  wave: { number: "+220 833922803", name: "Ya Fatou Jobe" },
  bank: { bank: "GT Bank", accountName: "Lamfam Charity", accountNumber: "2011398391590" },
  whatsapp: "", // donation confirmations; falls back to FLOATING_WHATSAPP when empty
  // Donors send their receipt (or any follow-up) to either of these on WhatsApp.
  receipts: ["+220 833922803", "+220 877595999"],
};

// ---- General phone numbers shown under Contact and in the footer, with Call and WhatsApp buttons.
// Team members with a `phone` are listed there too, under their name.
const CONTACT_NUMBERS = ["+220 833922803"];

// ---- The floating WhatsApp button opens a chat with this number (Muhammed Darboe).
const FLOATING_WHATSAPP = "+220 877595999";

// ---- Contact form. Paste your free Web3Forms access key here (get one at https://web3forms.com
// using the inbox that should receive messages). Until it is set, the form opens the visitor's
// email app addressed to CONTACT_EMAIL instead.
const FORM_ACCESS_KEY = "7d3a78a0-3511-4b1f-bcfd-01d2d6553ff8";
const CONTACT_EMAIL = "darboedev@gmail.com";
// Country codes for the contact form's phone field. The first one is selected by default.
const COUNTRY_CODES = [
  ["Gambia", "+220"], ["Senegal", "+221"], ["Guinea-Bissau", "+245"], ["Guinea", "+224"],
  ["Mali", "+223"], ["Mauritania", "+222"], ["Sierra Leone", "+232"], ["Liberia", "+231"],
  ["Ghana", "+233"], ["Nigeria", "+234"], ["Côte d'Ivoire", "+225"], ["Morocco", "+212"],
  ["Egypt", "+20"], ["United Kingdom", "+44"], ["Ireland", "+353"], ["Spain", "+34"],
  ["Italy", "+39"], ["France", "+33"], ["Germany", "+49"], ["Netherlands", "+31"],
  ["Belgium", "+32"], ["Sweden", "+46"], ["Norway", "+47"], ["Denmark", "+45"],
  ["Finland", "+358"], ["Switzerland", "+41"], ["Austria", "+43"], ["Portugal", "+351"],
  ["United States", "+1"], ["Canada", "+1"], ["United Arab Emirates", "+971"],
  ["Saudi Arabia", "+966"], ["Qatar", "+974"], ["Kuwait", "+965"], ["Turkey", "+90"],
  ["Malaysia", "+60"], ["Australia", "+61"],
];

// Web3Forms' free shared hCaptcha site key (bot check on the contact form).
const HCAPTCHA_SITEKEY = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";

const root = document.documentElement;

// Escape text before inserting it as HTML
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const digits = (v) => String(v || "").replace(/\D/g, "");

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Team
const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
document.getElementById("teamGrid").innerHTML = TEAM.map((m) => `
  <article class="member reveal">
    <div class="member__photo">
      ${m.photo
        ? `<img class="photo" src="${esc(m.photo)}" alt="${esc(m.name)}, ${esc(m.role)}" loading="lazy" />`
        : `<span class="member__initials">${esc(initials(m.name))}</span><span class="watermark" aria-hidden="true"></span>`}
    </div>
    <div>
      <h3>${esc(m.name)}</h3>
      <p>${esc(m.role)}</p>
    </div>
  </article>`).join("");

// Team contacts (members with a phone number)
const reachable = TEAM.filter((m) => m.phone);
const contactList = document.getElementById("teamContacts");
if (reachable.length) {
  contactList.innerHTML = reachable.map((m) => `
    <li>
      <div><strong>${esc(m.name)}</strong><span>${esc(m.role)}</span></div>
      <div class="team-contacts__actions">
        <a href="tel:+${digits(m.phone)}" aria-label="Call ${esc(m.name)}"><i data-lucide="phone"></i> Call</a>
        <a href="https://wa.me/${digits(m.phone)}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(m.name)}"><i data-lucide="message-circle"></i> WhatsApp</a>
      </div>
    </li>`).join("");
  contactList.hidden = false;
}

// Contact numbers
const numbersList = document.getElementById("contactNumbers");
if (CONTACT_NUMBERS.length) {
  numbersList.innerHTML = CONTACT_NUMBERS.map((n) => `
    <li>
      <div><strong>${esc(n)}</strong><span>Call or WhatsApp us</span></div>
      <div class="team-contacts__actions">
        <a href="tel:+${digits(n)}" aria-label="Call ${esc(n)}"><i data-lucide="phone"></i> Call</a>
        <a href="https://wa.me/${digits(n)}" target="_blank" rel="noopener" aria-label="WhatsApp ${esc(n)}"><i data-lucide="message-circle"></i> WhatsApp</a>
      </div>
    </li>`).join("");
  numbersList.hidden = false;
}
document.getElementById("footerNumbers").innerHTML = [...CONTACT_NUMBERS, ...TEAM.filter((m) => m.phone).map((m) => m.phone)]
  .map((n) => `<a href="tel:+${digits(n)}">${esc(n)}</a>`).join("");
const WHATSAPP = digits(DONATE.whatsapp) || digits(FLOATING_WHATSAPP);

// Donation details
const donateValue = (path) => path.split(".").reduce((o, k) => (o ? o[k] : ""), DONATE);
document.querySelectorAll("[data-donate]").forEach((el) => {
  const v = donateValue(el.dataset.donate);
  el.textContent = v || "Coming soon";
  el.classList.toggle("is-empty", !v);
});
document.querySelectorAll("[data-copy]").forEach((btn) => {
  const v = donateValue(btn.dataset.copy);
  if (!v) { btn.hidden = true; return; }
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(v);
      btn.classList.add("is-copied");
      btn.setAttribute("aria-label", "Copied");
      setTimeout(() => btn.classList.remove("is-copied"), 1600);
    } catch (e) {}
  });
});
// "Send your receipt" WhatsApp buttons (Donate section and floating panel)
const receiptText = encodeURIComponent("Assalamu alaikum, I have just sent a donation to LAMFAM Charity. Here is my receipt. It is for: ");
const receiptNumbers = (DONATE.receipts || []).filter((n) => digits(n));
if (!receiptNumbers.length && WHATSAPP) receiptNumbers.push(WHATSAPP);
const receiptLink = (n) =>
  `<a href="https://wa.me/${digits(n)}?text=${receiptText}" target="_blank" rel="noopener"><i data-lucide="message-circle"></i> ${esc(n)}</a>`;
if (receiptNumbers.length) {
  document.getElementById("receiptLinks").innerHTML = receiptNumbers.map(receiptLink).join("");
  document.getElementById("receiptBox").hidden = false;
  document.getElementById("fabReceipts").innerHTML = receiptNumbers.map(receiptLink).join("");
  document.getElementById("fabReceiptBox").hidden = false;
}

// "Join monthly giving" opens a WhatsApp chat so the team can welcome the new monthly donor
if (WHATSAPP) {
  const monthlyText = "Assalamu alaikum, I would like to join LAMFAM Charity's monthly contributions.";
  const join = document.getElementById("monthlyJoin");
  join.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(monthlyText)}`;
  join.target = "_blank";
  join.rel = "noopener";
}

// Floating Donate panel and WhatsApp button
const fabBtn = document.getElementById("fabBtn");
const fabPanel = document.getElementById("fabPanel");
const setFab = (open) => {
  fabPanel.hidden = !open;
  fabBtn.setAttribute("aria-expanded", String(open));
  document.getElementById("fab").classList.toggle("is-open", open);
};
fabBtn.addEventListener("click", () => setFab(fabPanel.hidden));
document.getElementById("fabClose").addEventListener("click", () => setFab(false));
document.getElementById("fabMore").addEventListener("click", () => setFab(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setFab(false); });
document.addEventListener("click", (e) => { if (!document.getElementById("fab").contains(e.target)) setFab(false); });

const fabWa = document.getElementById("fabWa");
if (digits(FLOATING_WHATSAPP)) {
  fabWa.href = `https://wa.me/${digits(FLOATING_WHATSAPP)}?text=${encodeURIComponent("Assalamu alaikum LAMFAM Charity, ")}`;
  fabWa.hidden = false;
}

// Looping sliders (partners, Why we give): append a hidden copy of the items so the loop is seamless
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  ["partnersTrack", "whyTrack"].forEach((id) => {
    const track = document.getElementById(id);
    if (!track) return;
    [...track.children].forEach((item) => {
      const copy = item.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      track.appendChild(copy);
    });
  });
}

// Icons (after all dynamic content is on the page)
if (window.lucide) lucide.createIcons();

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

// hCaptcha: the Contact section is dark in light mode (and light in dark mode), so match it
let captchaId = null;
window.renderCaptcha = () => {
  captchaId = hcaptcha.render("captcha", {
    sitekey: HCAPTCHA_SITEKEY,
    theme: isDark() ? "light" : "dark",
  });
};

// Phone country code picker
document.getElementById("phoneCode").innerHTML = COUNTRY_CODES
  .map(([country, code]) => `<option value="${esc(code)}">${esc(country)} ${esc(code)}</option>`).join("");
const phoneValue = (f) => {
  const number = String(f.get("phone") || "").replace(/\D/g, "");
  return number ? `${f.get("phoneCode")} ${number}` : "";
};

// Contact form -> email (Web3Forms when a key is set, otherwise the visitor's email app)
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const formSubmit = document.getElementById("formSubmit");
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(contactForm);
  const subject = `[Website] ${f.get("subject")} — ${f.get("name")}`;

  if (!FORM_ACCESS_KEY) {
    const phone = phoneValue(f);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")}${phone ? `, ${phone}` : ""})`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formNote.textContent = "Opening your email app… Jazakallahu khairan!";
    return;
  }

  const captchaToken = window.hcaptcha && captchaId !== null ? hcaptcha.getResponse(captchaId) : "";
  if (!captchaToken) {
    formNote.textContent = "Please tick the “I am human” box before sending.";
    return;
  }

  formSubmit.disabled = true;
  formNote.textContent = "Sending…";
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: FORM_ACCESS_KEY,
        subject,
        from_name: "LAMFAM website",
        name: f.get("name"),
        email: f.get("email"),
        phone: phoneValue(f) || "Not given",
        topic: f.get("subject"),
        message: f.get("message"),
        botcheck: f.get("botcheck") ? true : "",
        "h-captcha-response": captchaToken,
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    contactForm.reset();
    formNote.textContent = "Message sent. Jazakallahu khairan, we'll get back to you soon!";
  } catch (err) {
    formNote.textContent = "Sorry, your message couldn't be sent. Please try again or message us on WhatsApp.";
  } finally {
    formSubmit.disabled = false;
    if (window.hcaptcha && captchaId !== null) hcaptcha.reset(captchaId);
  }
});
