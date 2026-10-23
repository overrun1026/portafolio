
/* =========================================
   1. INICIALIZACIÓN
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initCurrentYear();
  initImageLightbox();
});

/* =========================================
   2. MENÚ DE NAVEGACIÓN MÓVIL
========================================= */

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!menuToggle || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("active", "open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  }

  function toggleMenu() {
    const isOpen =
      navLinks.classList.contains("active") ||
      navLinks.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      navLinks.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Cerrar menú");
      menuToggle.textContent = "✕";
    }
  }

  menuToggle.addEventListener("click", toggleMenu);

  // Cerrar el menú cuando se selecciona una sección.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Cerrar si se hace clic fuera del menú.
  document.addEventListener("click", (event) => {
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // Si se cambia a escritorio, cerrar el menú móvil.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });

  // Cerrar el menú con Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

/* =========================================
   3. AÑO AUTOMÁTICO DEL FOOTER
========================================= */

function initCurrentYear() {
  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* =========================================
   4. VISOR DE IMÁGENES
========================================= */

function initImageLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const viewport = document.getElementById("lightbox-viewport");

  const closeButton = document.getElementById("lightbox-close");
  const previousButton = document.getElementById("lightbox-prev");
  const nextButton = document.getElementById("lightbox-next");
  const zoomInButton = document.getElementById("lightbox-zoom-in");
  const zoomOutButton = document.getElementById("lightbox-zoom-out");
  const zoomResetButton = document.getElementById("lightbox-zoom-reset");

  if (
    !lightbox ||
    !lightboxImage ||
    !lightboxTitle ||
    !viewport ||
    !closeButton ||
    !previousButton ||
    !nextButton ||
    !zoomInButton ||
    !zoomOutButton ||
    !zoomResetButton
  ) {
    return;
  }

  // Imágenes que se pueden abrir en el visor.
  const imageSelector = [
    ".inventory-cover",
    ".project-gallery-item img"
  ].join(", ");

  let images = [];
  let currentIndex = 0;
  let zoomLevel = 1;
  let previousFocus = null;

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;
  const ZOOM_STEP = 0.25;

  /* -----------------------------------------
     Recopilar imágenes disponibles
  ----------------------------------------- */

  function collectImages() {
    images = Array.from(document.querySelectorAll(imageSelector))
      .filter((img) => img.getAttribute("src"))
      .map((img) => ({
        element: img,
        src: img.currentSrc || img.src,
        alt: img.alt || "Captura del proyecto"
      }));
  }

  /* -----------------------------------------
     Actualizar el zoom
  ----------------------------------------- */

  function updateZoom() {
    lightboxImage.style.transform = `scale(${zoomLevel})`;

    zoomResetButton.textContent = `${Math.round(zoomLevel * 100)}%`;

    const isZoomed = zoomLevel > 1;

    lightboxImage.classList.toggle("is-zoomed", isZoomed);

    viewport.style.overflow = isZoomed ? "auto" : "hidden";

    if (isZoomed) {
      viewport.style.cursor = "grab";
    } else {
      viewport.style.cursor = "default";
    }
  }

  function resetZoom() {
    zoomLevel = MIN_ZOOM;

    viewport.scrollTop = 0;
    viewport.scrollLeft = 0;

    updateZoom();
  }

  function zoomIn() {
    zoomLevel = Math.min(MAX_ZOOM, zoomLevel + ZOOM_STEP);
    updateZoom();
  }

  function zoomOut() {
    zoomLevel = Math.max(MIN_ZOOM, zoomLevel - ZOOM_STEP);
    updateZoom();
  }

  /* -----------------------------------------
     Mostrar una imagen
  ----------------------------------------- */

  function showImage(index) {
    if (images.length === 0) return;

    // Mantener el índice dentro de los límites.
    currentIndex = (index + images.length) % images.length;

    const imageData = images[currentIndex];

    lightboxImage.src = imageData.src;
    lightboxImage.alt = imageData.alt;

    lightboxTitle.textContent =
      `${imageData.alt} (${currentIndex + 1}/${images.length})`;

    resetZoom();

    previousButton.disabled = images.length < 2;
    nextButton.disabled = images.length < 2;

    previousButton.style.opacity = images.length < 2 ? "0.35" : "1";
    nextButton.style.opacity = images.length < 2 ? "0.35" : "1";
  }

  /* -----------------------------------------
     Abrir el visor
  ----------------------------------------- */

  function openLightbox(imageElement) {
    collectImages();

    const index = images.findIndex(
      (item) => item.element === imageElement
    );

    if (index < 0) return;

    previousFocus = document.activeElement;

    showImage(index);

    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");

    closeButton.focus();
  }

  /* -----------------------------------------
     Cerrar el visor
  ----------------------------------------- */

  function closeLightbox() {
    if (lightbox.hidden) return;

    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");

    lightboxImage.removeAttribute("src");
    lightboxImage.style.transform = "";

    resetZoom();

    if (previousFocus && typeof previousFocus.focus === "function") {
      previousFocus.focus();
    }
  }

  /* -----------------------------------------
     Imagen anterior y siguiente
  ----------------------------------------- */

  function showPrevious() {
    if (images.length < 2) return;

    showImage(currentIndex - 1);
  }

  function showNext() {
    if (images.length < 2) return;

    showImage(currentIndex + 1);
  }

  /* -----------------------------------------
     Abrir imágenes al hacer clic
  ----------------------------------------- */

  document.querySelectorAll(imageSelector).forEach((img) => {
    img.style.cursor = "zoom-in";

    img.addEventListener("click", () => {
      openLightbox(img);
    });
  });

  /* -----------------------------------------
     Eventos de los botones
  ----------------------------------------- */

  closeButton.addEventListener("click", closeLightbox);

  previousButton.addEventListener("click", showPrevious);

  nextButton.addEventListener("click", showNext);

  zoomInButton.addEventListener("click", zoomIn);

  zoomOutButton.addEventListener("click", zoomOut);

  zoomResetButton.addEventListener("click", resetZoom);

  /* -----------------------------------------
     Cerrar al hacer clic en el fondo
  ----------------------------------------- */

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  /* -----------------------------------------
     Zoom al hacer clic en la imagen
  ----------------------------------------- */

  lightboxImage.addEventListener("click", () => {
    if (zoomLevel === MIN_ZOOM) {
      zoomIn();
    } else {
      resetZoom();
    }
  });

  /* -----------------------------------------
     Navegación con el teclado
  ----------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;

    // No interferir con otros elementos interactivos.
    if (
      event.target instanceof HTMLElement &&
      event.target.matches("input, textarea, select")
    ) {
      return;
    }

    switch (event.key) {
      case "Escape":
        event.preventDefault();
        closeLightbox();
        break;

      case "ArrowLeft":
        event.preventDefault();
        showPrevious();
        break;

      case "ArrowRight":
        event.preventDefault();
        showNext();
        break;

      case "+":
      case "=":
        event.preventDefault();
        zoomIn();
        break;

      case "-":
      case "_":
        event.preventDefault();
        zoomOut();
        break;

      case "0":
        event.preventDefault();
        resetZoom();
        break;
    }
  });

  /* -----------------------------------------
     Zoom con la rueda del ratón
  ----------------------------------------- */

  viewport.addEventListener(
    "wheel",
    (event) => {
      if (lightbox.hidden || !event.ctrlKey) return;

      event.preventDefault();

      if (event.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    },
    { passive: false }
  );

  /* -----------------------------------------
     Desplazamiento al ampliar
  ----------------------------------------- */

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let initialScrollLeft = 0;
  let initialScrollTop = 0;

  viewport.addEventListener("pointerdown", (event) => {
    if (zoomLevel <= 1 || event.button !== 0) return;

    isDragging = true;

    dragStartX = event.clientX;
    dragStartY = event.clientY;

    initialScrollLeft = viewport.scrollLeft;
    initialScrollTop = viewport.scrollTop;

    viewport.style.cursor = "grabbing";

    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStartX;
    const deltaY = event.clientY - dragStartY;

    viewport.scrollLeft = initialScrollLeft - deltaX;
    viewport.scrollTop = initialScrollTop - deltaY;
  });

  function stopDragging() {
    isDragging = false;
    viewport.style.cursor = zoomLevel > 1 ? "grab" : "default";
  }

  viewport.addEventListener("pointerup", stopDragging);
  viewport.addEventListener("pointercancel", stopDragging);
  viewport.addEventListener("lostpointercapture", stopDragging);

  /* -----------------------------------------
     Gestos táctiles: deslizar entre imágenes
  ----------------------------------------- */

  let touchStartX = 0;
  let touchStartY = 0;

  viewport.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) return;

      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  viewport.addEventListener(
    "touchend",
    (event) => {
      if (event.changedTouches.length !== 1) return;

      if (zoomLevel > 1) return;

      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const deltaY = event.changedTouches[0].clientY - touchStartY;

      // Solo cambiar de imagen si el gesto es horizontal.
      if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          showNext();
        } else {
          showPrevious();
        }
      }
    },
    { passive: true }
  );
}
