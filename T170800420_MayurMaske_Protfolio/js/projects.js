
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#project-grid");
  if (!grid) return;
  const filters = document.querySelectorAll("[data-filter]");
  const render = (filter="all") => {
    grid.innerHTML = PORTFOLIO.projects.filter(p => filter==="all" || p.category.includes(filter))
      .map(p => `
        <article class="card project-card reveal" data-tilt>
          <div>
            <div class="project-top"><span class="project-num">${p.number}</span><span class="badge">${p.dates || "Featured"}</span></div>
            <h3>${p.title}</h3>
            <p>${p.short}</p>
            <div>${p.stack.slice(0,5).map(s=>`<span class="tag">${s}</span>`).join("")}</div>
          </div>
          <div class="project-actions">
            <a class="btn btn-secondary" href="projects/${p.id}.html">Case Study ↗</a>
            <a class="btn btn-ghost" href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>
            <span class="arrow">↗</span>
          </div>
        </article>`).join("");
    grid.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));
  };
  filters.forEach(btn=>btn.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active")); btn.classList.add("active");
    render(btn.dataset.filter);
  }));
  render();
});
