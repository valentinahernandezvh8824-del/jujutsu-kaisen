/* ============================================================
   Jujutsu Kaisen — Wiki de hechiceros
   Lógica de la interfaz: filtros, búsqueda, orden y fichas.
   ============================================================ */

(() => {
  "use strict";

  const state = {
    busqueda: "",
    afiliacion: "todos",
    grado: "todos",
    orden: "default"
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const grid = $("#grid");
  const emptyMsg = $("#empty");
  const resultsCount = $("#results-count");
  const searchInput = $("#search");
  const clearBtn = $("#btn-clear");
  const sortSelect = $("#sort");
  const modal = $("#modal");
  const modalCard = $(".modal-card", modal);

  let ultimoFoco = null;

  /* ------------------------- Utilidades ------------------------- */

  const normalizar = (texto) =>
    String(texto)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Ancla compartida con habilidades.html (misma lógica allí)
  const anclaTecnica = (nombre, idPersonaje) =>
    "t-" +
    normalizar(nombre)
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") +
    "--" +
    idPersonaje;

  const poderTotal = (p) => {
    const s = p.stats;
    return Math.round((s.fuerza + s.velocidad + s.energia + s.tecnica + s.inteligencia) / 5);
  };

  const ordenGrado = { especial: 0, grado1: 1, grado2: 2, grado3: 3, grado4: 4, maldicion: 5 };

  // Foto del personaje: campo manual `foto` o lo que haya descargado el script.
  const fotoDe = (p) => {
    if (p.foto) return p.foto;
    if (typeof IMAGENES !== "undefined" && IMAGENES[p.id]) return IMAGENES[p.id];
    return null;
  };

  const crear = (etiqueta, clase, texto) => {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    if (texto !== undefined) el.textContent = texto;
    return el;
  };

  /* ------------------------- Filtros ------------------------- */

  function construirFiltros() {
    const afiliaciones = [...new Set(PERSONAJES.map((p) => p.afiliacion))].sort();
    const grupoAfil = $("#filters-affiliation");
    const grupoGrado = $("#filters-grade");

    afiliaciones.forEach((afiliacion) => {
      const chip = crear("button", "chip", afiliacion);
      chip.type = "button";
      chip.dataset.afiliacion = afiliacion;
      chip.addEventListener("click", () => {
        state.afiliacion = afiliacion;
        sincronizarChips(grupoAfil, "afiliacion", afiliacion);
        render();
      });
      grupoAfil.appendChild(chip);
    });

    Object.entries(GRADOS).forEach(([clave, datos]) => {
      const chip = crear("button", "chip", datos.label);
      chip.type = "button";
      chip.dataset.grado = clave;
      chip.addEventListener("click", () => {
        state.grado = clave;
        sincronizarChips(grupoGrado, "grado", clave);
        render();
      });
      grupoGrado.appendChild(chip);
    });

    // Chip "Todos" que ya viene en el HTML
    const chipTodos = $('[data-afiliacion="todos"]', grupoAfil);
    if (chipTodos) {
      chipTodos.addEventListener("click", () => {
        state.afiliacion = "todos";
        sincronizarChips(grupoAfil, "afiliacion", "todos");
        render();
      });
    }

    const chipTodosGrado = crear("button", "chip is-active", "Cualquier grado");
    chipTodosGrado.type = "button";
    chipTodosGrado.dataset.grado = "todos";
    chipTodosGrado.addEventListener("click", () => {
      state.grado = "todos";
      sincronizarChips(grupoGrado, "grado", "todos");
      render();
    });
    grupoGrado.prepend(chipTodosGrado);
  }

  function sincronizarChips(grupo, atributo, valor) {
    $$(".chip", grupo).forEach((chip) => {
      chip.classList.toggle("is-active", chip.dataset[atributo] === valor);
    });
  }

  /* ------------------------- Filtrado y orden ------------------------- */

  function personajesFiltrados() {
    const q = normalizar(state.busqueda.trim());

    let lista = PERSONAJES.filter((p) => {
      const coincideAfiliacion = state.afiliacion === "todos" || p.afiliacion === state.afiliacion;
      const coincideGrado = state.grado === "todos" || p.grado === state.grado;
      if (!coincideAfiliacion || !coincideGrado) return false;
      if (!q) return true;

      const heno = normalizar(
        [p.nombre, p.kanji, p.epiteto, p.clan, p.afiliacion, p.descripcion, ...p.tecnicas, p.dominio || ""].join(" ")
      );
      return heno.includes(q);
    });

    switch (state.orden) {
      case "nombre":
        lista.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
        break;
      case "poder":
        lista.sort((a, b) => poderTotal(b) - poderTotal(a));
        break;
      case "grado":
        lista.sort((a, b) => ordenGrado[a.grado] - ordenGrado[b.grado]);
        break;
      default:
        break;
    }

    return lista;
  }

  /* ------------------------- Tarjetas ------------------------- */

  function crearTarjeta(p, indice) {
    const card = crear("article", "card");
    card.style.setProperty("--card-color", p.color);
    card.style.animationDelay = `${Math.min(indice * 35, 350)}ms`;

    const grado = GRADOS[p.grado];

    // Foto del personaje + sello de grado
    const media = crear("div", "card-media");
    const foto = fotoDe(p);

    if (foto) {
      const imagen = crear("img", "card-art");
      imagen.src = foto;
      imagen.alt = "";
      imagen.width = 640;
      imagen.height = 640;
      imagen.loading = "lazy";
      imagen.decoding = "async";
      imagen.addEventListener("error", () => {
        imagen.remove();
        media.classList.add("is-placeholder");
      });
      media.append(imagen);
    } else {
      media.classList.add("is-placeholder");
    }

    const marca = crear("span", "card-watermark", p.inicial);
    marca.setAttribute("aria-hidden", "true");

    const emblema = crear("span", "card-emblem", p.inicial);
    emblema.setAttribute("aria-hidden", "true");

    const badge = crear("span", "badge", grado.label.split(" ").slice(-2).join(" "));
    badge.style.setProperty("--badge-color", grado.color);

    media.append(marca, emblema, badge);

    // Texto
    const cuerpo = crear("div", "card-body");
    cuerpo.append(crear("h3", "card-name", p.nombre), crear("p", "card-epithet", p.epiteto));

    const tecnica = crear("p", "card-tech");
    tecnica.append(crear("span", null, "Técnica principal"), document.createTextNode(p.tecnicas[0]));

    const pie = crear("div", "card-foot");
    const poder = crear("span", "card-power", `${poderTotal(p)}`);
    poder.prepend(document.createTextNode("⛧ "));
    poder.append(document.createTextNode(" poder"));
    pie.append(crear("span", null, p.afiliacion), poder);

    cuerpo.append(tecnica, pie);

    // Botón invisible que cubre la tarjeta: una sola parada de tabulación por personaje.
    const abrir = crear("button", "card-open");
    abrir.type = "button";
    abrir.setAttribute("aria-label", `Ver ficha de ${p.nombre}`);
    abrir.addEventListener("click", () => abrirModal(p, abrir));

    card.append(media, cuerpo, abrir);

    return card;
  }

  function render() {
    const lista = personajesFiltrados();
    grid.replaceChildren(...lista.map(crearTarjeta));

    emptyMsg.hidden = lista.length > 0;
    resultsCount.textContent =
      lista.length === 1 ? "1 hechicero encontrado" : `${lista.length} hechiceros encontrados`;

    clearBtn.hidden = state.busqueda.length === 0;
  }

  /* ------------------------- Modal ------------------------- */

  function abrirModal(p, origen) {
    ultimoFoco = origen || document.activeElement;

    modal.style.setProperty("--modal-color", p.color);

    const hero = $("#modal-hero");
    const imagen = $("#modal-art");
    const foto = fotoDe(p);

    $("#modal-watermark").textContent = p.inicial;

    if (foto) {
      imagen.hidden = false;
      imagen.src = foto;
      hero.classList.remove("is-placeholder");
      imagen.onerror = () => {
        imagen.hidden = true;
        hero.classList.add("is-placeholder");
      };
    } else {
      imagen.hidden = true;
      imagen.removeAttribute("src");
      hero.classList.add("is-placeholder");
    }

    $("#modal-name").textContent = p.nombre;
    $("#modal-epithet").textContent = p.epiteto;

    const grado = GRADOS[p.grado];
    const badge = $("#modal-grade");
    badge.textContent = grado.label;
    badge.style.setProperty("--badge-color", grado.color);

    $("#modal-meta").textContent = [p.kanji, p.afiliacion, p.clan !== "—" ? p.clan : null]
      .filter(Boolean)
      .join("  ·  ");

    $("#modal-desc").textContent = p.descripcion;

    // Cada técnica enlaza a su tarjeta dentro de la página de habilidades
    const filas = p.tecnicas.map((t) => {
      const li = crear("li");
      const enlace = crear("a", "tech-link", t);
      enlace.href = `habilidades.html#${anclaTecnica(t, p.id)}`;
      li.append(enlace);
      return li;
    });

    const liTodas = crear("li", "tech-all");
    const enlaceTodas = crear("a", "tech-link tech-all-link", "Ver todas →");
    enlaceTodas.href = "habilidades.html";
    liTodas.append(enlaceTodas);
    filas.push(liTodas);

    $("#modal-techs").replaceChildren(...filas);

    const dominioWrap = $("#modal-domain-wrap");
    if (p.dominio) {
      dominioWrap.hidden = false;
      const enlaceDominio = crear("a", "domain-link", p.dominio);
      enlaceDominio.href = `habilidades.html#${anclaTecnica(p.dominio, p.id)}`;
      $("#modal-domain").replaceChildren(enlaceDominio);
    } else {
      dominioWrap.hidden = true;
    }

    const etiquetas = {
      fuerza: "Fuerza",
      velocidad: "Velocidad",
      energia: "Energía",
      tecnica: "Técnica",
      inteligencia: "Táctica"
    };

    $("#modal-stats").replaceChildren(
      ...Object.entries(p.stats).map(([clave, valor]) => {
        const fila = crear("div", "stat-row");
        const barra = crear("div", "stat-bar");
        const relleno = crear("i");
        relleno.style.width = "0%";
        barra.appendChild(relleno);
        fila.append(
          crear("span", null, etiquetas[clave] || clave),
          barra,
          crear("span", "stat-value", valor)
        );
        requestAnimationFrame(() => {
          relleno.style.width = `${Math.max(valor, 0)}%`;
        });
        return fila;
      })
    );

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $("#modal-close").focus();
  }

  function cerrarModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus();
  }

  /* ------------------------- Estadísticas del hero ------------------------- */

  function pintarEstadisticas() {
    const tecnicas = PERSONAJES.reduce((total, p) => total + p.tecnicas.length, 0);
    const dominios = PERSONAJES.filter((p) => p.dominio).length;
    animarNumero($("#stat-total"), PERSONAJES.length);
    animarNumero($("#stat-techniques"), tecnicas);
    animarNumero($("#stat-domains"), dominios);
  }

  function animarNumero(el, destino) {
    const duracion = 900;
    const inicio = performance.now();
    const paso = (ahora) => {
      const t = Math.min((ahora - inicio) / duracion, 1);
      const suavizado = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(destino * suavizado);
      if (t < 1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  }

  /* ------------------------- Eventos ------------------------- */

  function conectarEventos() {
    searchInput.addEventListener("input", (e) => {
      state.busqueda = e.target.value;
      render();
    });

    clearBtn.addEventListener("click", () => {
      state.busqueda = "";
      searchInput.value = "";
      searchInput.focus();
      render();
    });

    sortSelect.addEventListener("change", (e) => {
      state.orden = e.target.value;
      render();
    });

    $("#btn-random").addEventListener("click", () => {
      const alAzar = PERSONAJES[Math.floor(Math.random() * PERSONAJES.length)];
      abrirModal(alAzar, $("#btn-random"));
    });

    $("#modal-close").addEventListener("click", cerrarModal);
    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", cerrarModal));

    document.addEventListener("keydown", (e) => {
      if (modal.hidden) return;

      if (e.key === "Escape") {
        cerrarModal();
        return;
      }

      // Mantener el foco dentro de la ficha mientras está abierta
      if (e.key === "Tab") {
        const enfocables = $$(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          modalCard
        ).filter((el) => !el.hidden && el.offsetParent !== null);

        if (!enfocables.length) return;
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];

        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault();
          ultimo.focus();
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault();
          primero.focus();
        }
      }
    });
  }

  /* ------------------------- Inicio ------------------------- */

  function iniciar() {
    if (window.UI) UI.iniciar();

    construirFiltros();
    conectarEventos();
    render();
    pintarEstadisticas();

    // Permite llegar desde habilidades.html con index.html#p-<id>
    const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (hash.startsWith("p-")) {
      const elegido = PERSONAJES.find((p) => p.id === hash.slice(2));
      if (elegido) abrirModal(elegido, null);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
