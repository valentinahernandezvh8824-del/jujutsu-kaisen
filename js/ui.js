/* ============================================================
   Utilidades compartidas por las dos páginas:
   tema claro/oscuro, animaciones al hacer scroll y barra de progreso.
   ============================================================ */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);

  const MEDIA = "jjk-tema";

  function temaInicial() {
    const guardado = localStorage.getItem(MEDIA);
    if (guardado) return guardado;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function aplicarTema(tema) {
    document.documentElement.dataset.theme = tema;
    const icono = $("#theme-icon");
    if (icono) icono.textContent = tema === "light" ? "☀" : "☾";
    localStorage.setItem(MEDIA, tema);
  }

  function iniciarTema() {
    aplicarTema(temaInicial());
    const boton = $("#btn-theme");
    if (!boton) return;
    boton.addEventListener("click", () => {
      const actual = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      aplicarTema(actual);
    });
  }

  // Aparición progresiva de secciones al entrar en pantalla
  function observarRevelados() {
    const elementos = [...document.querySelectorAll(".reveal")];
    if (!elementos.length) return;

    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducido || !("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elementos.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
      observador.observe(el);
    });
  }

  // Barra de progreso de lectura
  function barraProgreso() {
    const barra = $("#progress-bar");
    if (!barra) return;

    const actualizar = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const avance = total > 0 ? Math.min(window.scrollY / total, 1) : 0;
      barra.style.transform = `scaleX(${avance})`;
    };

    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
  }

  window.UI = {
    iniciarTema,
    aplicarTema,
    observarRevelados,
    barraProgreso,
    iniciar() {
      iniciarTema();
      observarRevelados();
      barraProgreso();
    }
  };
})();
