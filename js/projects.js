/* Renderiza tarjetas en index.html y la ficha detallada en pages/proyecto.html. */
(() => {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const root = document.getElementById("projects-grid");
  const detailRoot = document.getElementById("project-detail");

  
  // Ajusta las rutas de imágenes según la página actual.

  // Ajusta las rutas de imágenes según la página actual.
  const resolveImagePath = path => {
    if (
      !path ||
      /^(?:[a-z]+:)?\/\//i.test(path) ||
      path.startsWith("/")
    ) {
      return path;
    }

    return detailRoot ? `../${path}` : path;
  };


  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

  function renderCards() {
    if (!root) return;
    root.innerHTML = projects.map(project => `
      <article class="panel project-card">
        <a class="project-cover-link" href="pages/proyecto.html?id=${encodeURIComponent(project.id)}" aria-label="Ver detalles de ${esc(project.title)}">
          <div class="project-cover-wrap">
            <img class="project-cover" src="${esc(project.cover)}" alt="${esc(project.coverAlt)}" loading="lazy">
            <span class="project-visual-label">${esc(project.category)}</span>
          </div>
        </a>
        <div class="project-content">
          <div class="project-meta"><span>${esc(project.number)}</span><span>${esc(project.category)}</span></div>
          <h3>${esc(project.title)}</h3>
          <p>${esc(project.shortDescription)}</p>
          <div class="skill-tags">${project.stack.slice(0,7).map(tag=>`<span>${esc(tag)}</span>`).join("")}</div>
          <div class="project-actions">
            <a class="button button-primary project-details-link" href="pages/proyecto.html?id=${encodeURIComponent(project.id)}">Ver detalles <span aria-hidden="true">↗</span></a>
            <a class="button button-secondary" href="${esc(project.repository)}" target="_blank" rel="noopener noreferrer">Ver código</a>
          </div>
        </div>
      </article>`).join("");
    const count = document.getElementById("projects-count");
    if (count) count.textContent = `${projects.length} proyectos`;
  }

  function renderDetail() {
    if (!detailRoot) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const project = projects.find(item => item.id === id);
    if (!project) {
      detailRoot.innerHTML = `<section class="project-not-found panel"><span class="eyebrow">PROYECTO NO ENCONTRADO</span><h1>No encontramos este proyecto</h1><p>Comprueba el enlace o vuelve a la lista de proyectos.</p><a class="button button-primary" href="../index.html#proyectos">Volver a proyectos</a></section>`;
      return;
    }
    document.title = `${project.title} | Leonardo Gracia`;

    const allImages = [
      {
        src: resolveImagePath(project.cover),
        alt: project.coverAlt,
        caption: "Vista de portada"
      },
      ...project.images.map(image => ({
        ...image,
        src: resolveImagePath(image.src)
      }))
    ];

    detailRoot.innerHTML = `
      <section class="project-detail-hero">
        <a class="back-link" href="../index.html#proyectos">← Volver a proyectos</a>
        <span class="eyebrow">${esc(project.category)}</span>
        <h1>${esc(project.title)}</h1>
        <p class="project-detail-lead">${esc(project.description)}</p>
        <div class="project-detail-actions">
          <a class="button button-primary" href="${esc(project.repository)}" target="_blank" rel="noopener noreferrer">Ver repositorio ↗</a>
          ${project.demo ? `<a class="button button-secondary" href="${esc(project.demo)}" target="_blank" rel="noopener noreferrer">Ver demo ↗</a>` : ""}
        </div>
      </section>
      <section class="project-detail-grid">
        <div class="project-detail-main">
          
          <div class="project-detail-cover">
            <img
              src="${esc(resolveImagePath(project.cover))}"
              alt="${esc(project.coverAlt)}"
            >
          </div>

          <section class="detail-section panel"><span class="panel-number">01 / FUNCIONALIDADES</span><h2>Qué incluye</h2><ul class="feature-list">${project.features.map(item=>`<li>${esc(item)}</li>`).join("")}</ul></section>
          <section class="detail-section panel"><span class="panel-number">02 / ARQUITECTURA</span><h2>Cómo está construido</h2><p>${esc(project.architecture)}</p></section>
        </div>
        <aside class="project-detail-aside panel"><span class="panel-number">STACK TECNOLÓGICO</span><h2>Tecnologías</h2><div class="skill-tags">${project.stack.map(tag=>`<span>${esc(tag)}</span>`).join("")}</div><a class="project-link" href="${esc(project.repository)}" target="_blank" rel="noopener noreferrer">Explorar código en GitHub ↗</a></aside>
      </section>
      <section class="project-gallery-section"><div class="section-heading"><span class="eyebrow">CAPTURAS DEL PROYECTO</span><h2>Galería</h2><p>Selecciona una imagen para ampliarla. La navegación se mantiene dentro de este proyecto.</p></div><div class="project-gallery-grid">${allImages.map((image,index)=>`<button class="gallery-tile" type="button" data-gallery-index="${index}" aria-label="Ampliar ${esc(image.caption)}"><img src="${esc(image.src)}" alt="${esc(image.alt)}" loading="lazy"><span>${esc(image.caption)}</span></button>`).join("")}</div></section>`;
    initLightbox(detailRoot, allImages, project.title);
  }

  function initLightbox(container, images, title) {
    const overlay = document.createElement("div");
    overlay.className = "project-lightbox";
    overlay.hidden = true;
    overlay.setAttribute("role","dialog");
    overlay.setAttribute("aria-modal","true");
    overlay.setAttribute("aria-label",`Galería de ${title}`);
    overlay.innerHTML = `<div class="lightbox-top"><span class="lightbox-caption"></span><button type="button" class="lightbox-close" aria-label="Cerrar visor">×</button></div><button type="button" class="lightbox-arrow lightbox-prev" aria-label="Imagen anterior">‹</button><div class="lightbox-stage"><img alt=""></div><button type="button" class="lightbox-arrow lightbox-next" aria-label="Imagen siguiente">›</button><div class="lightbox-bottom"><button type="button" data-zoom="out" aria-label="Reducir zoom">−</button><button type="button" data-zoom="reset">100%</button><button type="button" data-zoom="in" aria-label="Aumentar zoom">+</button><span class="lightbox-counter"></span></div>`;
    container.appendChild(overlay);
    const imageEl = overlay.querySelector(".lightbox-stage img");
    const captionEl = overlay.querySelector(".lightbox-caption");
    const counterEl = overlay.querySelector(".lightbox-counter");
    let index=0, zoom=1, previousFocus=null;
    const show = () => { const item=images[index]; imageEl.src=item.src; imageEl.alt=item.alt; captionEl.textContent=item.caption; counterEl.textContent=`${index+1} / ${images.length}`; imageEl.style.transform=`scale(${zoom})`; overlay.querySelector('[data-zoom="reset"]').textContent=`${Math.round(zoom*100)}%`; };
    const open = nextIndex => { index=nextIndex; zoom=1; previousFocus=document.activeElement; overlay.hidden=false; document.body.classList.add("lightbox-open"); show(); overlay.querySelector(".lightbox-close").focus(); };
    const close = () => { overlay.hidden=true; document.body.classList.remove("lightbox-open"); if(previousFocus) previousFocus.focus(); };
    const move = amount => { index=(index+amount+images.length)%images.length; zoom=1; show(); };
    container.querySelectorAll("[data-gallery-index]").forEach(button=>button.addEventListener("click",()=>open(Number(button.dataset.galleryIndex))));
    overlay.querySelector(".lightbox-close").addEventListener("click",close);
    overlay.querySelector(".lightbox-prev").addEventListener("click",()=>move(-1));
    overlay.querySelector(".lightbox-next").addEventListener("click",()=>move(1));
    overlay.querySelectorAll("[data-zoom]").forEach(button=>button.addEventListener("click",()=>{ const action=button.dataset.zoom; zoom=action==="in"?Math.min(zoom+0.25,3):action==="out"?Math.max(zoom-0.25,1):1; show(); }));
    overlay.addEventListener("click",event=>{if(event.target===overlay) close();});
    document.addEventListener("keydown",event=>{if(overlay.hidden)return; if(event.key==="Escape")close(); if(event.key==="ArrowRight")move(1); if(event.key==="ArrowLeft")move(-1);});
  }

  renderCards();
  renderDetail();
})();
