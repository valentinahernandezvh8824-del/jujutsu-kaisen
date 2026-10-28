/* ============================================================
   Página de habilidades: lista todas las técnicas y dominios
   de PERSONAJES, con búsqueda, filtros y enlace a cada ficha.
   ============================================================ */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const normalizar = (texto) =>
    String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Debe coincidir con la función de app.js para que los enlaces apunten bien.
  const anclaTecnica = (nombre, idPersonaje) =>
    "t-" +
    normalizar(nombre)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "--" +
    idPersonaje;

  const crear = (etiqueta, clase, texto) => {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  };

  /* ---------- Datos ---------- */

  const HABILIDADES = [];
  PERSONAJES.forEach((p) => {
    p.tecnicas.forEach((nombre) => {
      HABILIDADES.push({ nombre, tipo: "tecnica", personaje: p });
    });
    if (p.dominio) {
      HABILIDADES.push({ nombre: p.dominio, tipo: "dominio", personaje: p });
    }
  });

  const estado = { busqueda: "", tipo: "todas", autor: "todos", hash: null };

  const grid = $("#grid-tech");
  const vacio = $("#empty");
  const contador = $("#results-count");
  const buscador = $("#search");
  const limpiar = $("#btn-clear");
  const selectAutor = $("#filtro-autor");

  /* ---------- Filtros ---------- */

  function construirFiltros() {
    const autores = [...new Set(PERSONAJES.map((p) => p.nombre))].sort((a, b) => a.localeCompare(b, "es"));
    autores.forEach((nombre) => {
      const opcion = crear("option", null, nombre);
      opcion.value = nombre;
      selectAutor.appendChild(opcion);
    });

    const grupo = $("#filters-tipo");
    grupo.addEventListener("click", (e) => {
      const chip = e.target.closest("[data-tipo]");
      if (!chip) return;
      estado.tipo = chip.dataset.tipo;
      $$(".chip", grupo).forEach((c) => c.classList.toggle("is-active", c === chip));
      render();
    });

    selectAutor.addEventListener("change", (e) => {
      estado.autor = e.target.value;
      render();
    });
  }

  function listaFiltrada() {
    const q = normalizar(estado.busqueda.trim());

    return HABILIDADES.filter((h) => {
      if (estado.tipo !== "todas" && h.tipo !== estado.tipo) return false;
      if (estado.autor !== "todos" && h.personaje.nombre !== estado.autor) return false;
      if (!q) return true;
      const heno = normalizar([h.nombre, h.personaje.nombre, h.personaje.epiteto, h.personaje.afiliacion].join(" "));
      return heno.includes(q);
    });
  }

  /* ---------- Tarjetas ---------- */

  function crearTarjeta(h, indice) {
    const p = h.personaje;
    const esDominio = h.tipo === "dominio";

    const card = crear("a", "tech-card" + (esDominio ? " is-domain" : ""));
    card.href = `index.html#p-${p.id}`;
    card.id = anclaTecnica(h.nombre, p.id);
    card.style.setProperty("--tech-color", p.color);
    card.style.animationDelay = `${Math.min(indice * 22, 400)}ms`;

    const arriba = crear("div", "tech-top");

    const grado = GRADOS[p.grado];
    const badge = crear("span", "badge", esDominio ? "Dominio" : "Técnica");
    badge.style.setProperty("--badge-color", esDominio ? p.color : grado.color);

    const avatar = crear("span", "tech-avatar");
    avatar.setAttribute("aria-hidden", "true");
    const foto = typeof IMAGENES !== "undefined" ? IMAGENES[p.id] : null;
    if (foto) {
      const img = crear("img");
      img.src = foto;
      img.alt = "";
      img.loading = "lazy";
      img.width = 64;
      img.height = 64;
      avatar.append(img);
    } else {
      avatar.textContent = p.inicial;
    }

    arriba.append(badge, avatar);

    const nombre = crear("h2", "tech-name", h.nombre);
    const autor = crear("p", "tech-owner", `${p.nombre} · ${grado.label}`);

    const pie = crear("span", "tech-cta", esDominio ? "Expansión de dominio" : "Ver hechicero");
    pie.append(crear("span", "tech-arrow", "→"));

    card.append(arriba, nombre, autor, pie);
    return card;
  }

  function render() {
    const lista = listaFiltrada();
    grid.replaceChildren(...lista.map(crearTarjeta));

    vacio.hidden = lista.length > 0;
    contador.textContent =
      lista.length === 1 ? "1 habilidad encontrada" : `${lista.length} habilidades encontradas`;
    limpiar.hidden = estado.busqueda.length === 0;
  }

  /* ---------- Enlace directo desde una ficha ---------- */

  function enfocarHash() {
    if (!estado.hash) return;
    const destino = document.getElementById(estado.hash);
    if (!destino) return;

    destino.classList.add("is-target");
    destino.scrollIntoView({ block: "center", behavior: "smooth" });
    setTimeout(() => destino.classList.remove("is-target"), 2600);
  }

  /* ---------- Contadores ---------- */

  function animarNumero(el, destino) {
    const duracion = 900;
    const inicio = performance.now();
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      el.textContent = Math.round(destino * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }

  /* ---------- Inicio ---------- */

  function iniciar() {
    if (window.UI) UI.iniciar();

    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (hash.startsWith("t-")) estado.hash = hash;

    construirFiltros();
    render();

    animarNumero($("#stat-tecnicas"), HABILIDADES.filter((h) => h.tipo === "tecnica").length);
    animarNumero($("#stat-dominios"), HABILIDADES.filter((h) => h.tipo === "dominio").length);
    animarNumero($("#stat-autores"), new Set(HABILIDADES.map((h) => h.personaje.id)).size);

    buscador.addEventListener("input", (e) => {
      estado.busqueda = e.target.value;
      render();
    });

    limpiar.addEventListener("click", () => {
      estado.busqueda = "";
      buscador.value = "";
      buscador.focus();
      render();
    });

    $("#filters-tipo").querySelector('[data-tipo="todas"]').addEventListener("click", () => {
      estado.tipo = "todas";
    });

    enfocarHash();

    window.addEventListener("hashchange", () => {
      estado.hash = decodeURIComponent(location.hash.replace(/^#/, ""));
      if (estado.hash.startsWith("t-")) enfocarHash();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
