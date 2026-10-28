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

  // Cabecera: se vuelve sólida al bajar
  function cabeceraScroll() {
    const cabecera = $(".site-header");
    if (!cabecera) return;

    let pendiente = false;
    const actualizar = () => {
      pendiente = false;
      cabecera.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    actualizar();
    window.addEventListener(
      "scroll",
      () => {
        if (pendiente) return;
        pendiente = true;
        requestAnimationFrame(actualizar);
      },
      { passive: true }
    );
  }

  // Parallax del arte del hero: scroll + puntero
  function parallaxHero() {
    const hero = $(".hero");
    const arte = $(".hero-art");
    if (!hero || !arte) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pendiente = false;
    const desplazar = () => {
      pendiente = false;
      const alto = hero.offsetHeight || 1;
      const avance = Math.min(window.scrollY, alto);
      arte.style.setProperty("--shift", `${(avance * 0.14).toFixed(1)}px`);
    };

    window.addEventListener(
      "scroll",
      () => {
        if (pendiente) return;
        pendiente = true;
        requestAnimationFrame(desplazar);
      },
      { passive: true }
    );

    if (!window.matchMedia("(pointer: fine)").matches) return;

    hero.addEventListener(
      "pointermove",
      (e) => {
        const caja = hero.getBoundingClientRect();
        const x = (e.clientX - caja.left) / caja.width - 0.5;
        const y = (e.clientY - caja.top) / caja.height - 0.5;
        arte.style.setProperty("--px", `${(x * 26).toFixed(1)}px`);
        arte.style.setProperty("--py", `${(y * 18).toFixed(1)}px`);
      },
      { passive: true }
    );

    hero.addEventListener("pointerleave", () => {
      arte.style.setProperty("--px", "0px");
      arte.style.setProperty("--py", "0px");
    });
  }

  // Halo que sigue al cursor (solo escritorio)
  function brilloCursor() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const halo = document.createElement("div");
    halo.className = "cursor-glow";
    halo.setAttribute("aria-hidden", "true");
    document.body.appendChild(halo);

    let destinoX = window.innerWidth / 2;
    let destinoY = window.innerHeight * 0.3;
    let x = destinoX;
    let y = destinoY;

    const pintar = () => {
      x += (destinoX - x) * 0.1;
      y += (destinoY - y) * 0.1;
      halo.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      requestAnimationFrame(pintar);
    };

    window.addEventListener(
      "pointermove",
      (e) => {
        destinoX = e.clientX;
        destinoY = e.clientY;
      },
      { passive: true }
    );

    pintar();
  }

  window.UI = {
    iniciarTema,
    aplicarTema,
    observarRevelados,
    barraProgreso,
    cabeceraScroll,
    parallaxHero,
    brilloCursor,
    iniciar() {
      iniciarTema();
      observarRevelados();
      barraProgreso();
      cabeceraScroll();
      parallaxHero();
      brilloCursor();
    }
  };
})();
