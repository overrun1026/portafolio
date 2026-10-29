/* Funciones generales del portafolio: navegación móvil y año del footer. */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav-links");
  const year = document.getElementById("current-year");

  if (year) year.textContent = new Date().getFullYear();

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
    };

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("active");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMenu(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  }
});
