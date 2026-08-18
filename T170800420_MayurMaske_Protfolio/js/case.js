
document.addEventListener("DOMContentLoaded",()=>{
  const el=document.querySelector("[data-project-id]"); if(!el) return;
  const p=PORTFOLIO.projects.find(x=>x.id===el.dataset.projectId); if(!p) return;
  document.querySelectorAll("[data-project-title]").forEach(x=>x.textContent=p.title);
  document.querySelectorAll("[data-project-description]").forEach(x=>x.textContent=p.description);
  document.querySelectorAll("[data-project-stack]").forEach(x=>x.innerHTML=p.stack.map(s=>`<span class="tag">${s}</span>`).join(""));
  document.querySelectorAll("[data-project-github]").forEach(x=>x.href=p.github);
  document.title=`${p.title} — Mayur Rajabhau Maske`;
});
