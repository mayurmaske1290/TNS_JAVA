
document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".progress");
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Theme
  const saved = localStorage.getItem("mayur-theme");
  if (saved) root.dataset.theme = saved;
  else if (matchMedia("(prefers-color-scheme: light)").matches) root.dataset.theme = "light";

  const syncThemeIcon = () => {
    if (!themeBtn) return;
    themeBtn.setAttribute("aria-label", root.dataset.theme === "light" ? "Switch to dark mode" : "Switch to light mode");
    themeBtn.textContent = root.dataset.theme === "light" ? "☾" : "☼";
  };
  syncThemeIcon();
  themeBtn?.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("mayur-theme", root.dataset.theme);
    syncThemeIcon();
  });

  // Mobile navigation
  menuBtn?.addEventListener("click", () => {
    const open = mobileMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  }));

  // Header + scroll progress
  const onScroll = () => {
    header?.classList.toggle("scrolled", scrollY > 20);
    if (progress) {
      const h = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = h > 0 ? `${(scrollY / h) * 100}%` : "0%";
    }
  };
  addEventListener("scroll", onScroll, {passive:true}); onScroll();

  // Active nav by page
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(link => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) link.classList.add("active");
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }});
  }, {threshold:.1});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Cursor
  const dot = document.querySelector(".cursor"), ring = document.querySelector(".cursor-ring");
  let mx=0,my=0,rx=0,ry=0;
  addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; if(dot){dot.style.left=mx+"px";dot.style.top=my+"px";} });
  const cursorLoop = () => { rx += (mx-rx)*.16; ry += (my-ry)*.16; if(ring){ring.style.left=rx+"px";ring.style.top=ry+"px"} requestAnimationFrame(cursorLoop); };
  cursorLoop();
  document.querySelectorAll("a,button,.card").forEach(el => {
    el.addEventListener("mouseenter",()=>ring?.classList.add("hovering"));
    el.addEventListener("mouseleave",()=>ring?.classList.remove("hovering"));
  });

  // Tilt only for fine pointers
  if (matchMedia("(pointer:fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("mousemove", e => {
        const r = card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(900px) rotateX(${y*-4}deg) rotateY(${x*5}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave",()=>card.style.transform="");
    });
  }

  // Copy email
  document.querySelectorAll("[data-copy-email]").forEach(btn => btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(PORTFOLIO.email); toast("Email copied"); }
    catch { toast(PORTFOLIO.email); }
  }));

  // Contact form
  const form = document.querySelector("#contact-form");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const msg = form.querySelector(".form-msg");
    const name=form.name.value.trim(), email=form.email.value.trim(), subject=form.subject.value.trim(), message=form.message.value.trim();
    if(!name || !email || !subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      msg.textContent="Please complete all fields with a valid email address.";
      msg.className="form-msg error"; return;
    }
    const body = encodeURIComponent(`Hello Mayur,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
    location.href=`mailto:${PORTFOLIO.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    msg.textContent="Your email client should open with the message prepared.";
    msg.className="form-msg success";
    form.reset();
  });

  // Current year
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Interactive skills explorer
  const skillData = {
    "JavaScript": {
      text: "Used to build interactive interfaces, client-side behavior and dynamic portfolio experiences.",
      projects: ["Portfolio", "Library Management System", "AI Career Advisor"]
    },
    "React.js": {
      text: "Used in project work for component-based interfaces and modern application experiences.",
      projects: ["AI Career Advisor", "SentinelX"]
    },
    "Node.js": {
      text: "Used for backend application development and server-side JavaScript workflows.",
      projects: ["Library Management System"]
    },
    "MongoDB": {
      text: "Used for document-oriented data storage in full-stack application development.",
      projects: ["Library Management System"]
    },
    "Java": {
      text: "Core programming language used to strengthen object-oriented programming and problem-solving fundamentals.",
      projects: ["DSA / Academic Work"]
    },
    "HTML/CSS": {
      text: "Used to create semantic structure, responsive layouts, visual systems and polished web interfaces.",
      projects: ["Portfolio", "Library Management System"]
    },
    "AI/LLMs": {
      text: "Used across AI-focused projects for intelligent analysis, recommendations, explainability and assistant experiences.",
      projects: ["AI Career Advisor", "SentinelX"]
    }
  };
  const selected = document.querySelector("#skill-selected");
  const detailTitle = document.querySelector("#skill-detail-title");
  const detailText = document.querySelector("#skill-detail-text");
  const skillProjects = document.querySelector("#skill-projects");
  const orbitButtons = document.querySelectorAll("[data-skill]");
  const updateSkill = (name) => {
    const item = skillData[name] || skillData.JavaScript;
    if (selected) selected.textContent = name;
    if (detailTitle) detailTitle.textContent = name;
    if (detailText) detailText.textContent = item.text;
    if (skillProjects) skillProjects.innerHTML = item.projects.map(p => `<span class="skill-chip">${p}</span>`).join("");
    orbitButtons.forEach(b => b.classList.toggle("active", b.dataset.skill === name));
  };
  orbitButtons.forEach(btn => btn.addEventListener("click", () => updateSkill(btn.dataset.skill)));
  updateSkill("JavaScript");

});

function toast(text){
  let t=document.querySelector(".toast");
  if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t)}
  t.textContent=text;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1800);
}
