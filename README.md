# Jujutsu Kaisen — Wiki de Hechiceros 呪

[![Sitio en vivo](https://img.shields.io/badge/sitio-en%20vivo-31c0cc?style=flat-square)](https://valentinahernandezvh8824-del.github.io/jujutsu-kaisen/)
[![Licencia MIT](https://img.shields.io/badge/licencia-MIT-7b2cff?style=flat-square)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](index.html)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](css/style.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](js/app.js)

Aplicativo web estático que funciona como una **wiki interactiva de Jujutsu Kaisen**: 28 personajes, sus técnicas malditas, grados, clanes y expansiones de dominio, con buscador, filtros, ordenamiento y fichas detalladas. Incluye una página aparte de **habilidades** a la que se llega desde la ficha de cada personaje.

La estética toma como referencia la *landing page* oficial de **Jujutsu Kaisen: Cursed Clash**: negro cinematográfico, cian eléctrico, tipografía display en mayúsculas, arte a sangre y microanimaciones.

> Proyecto fan, sin fines comerciales y sin afiliación con Gege Akutami, Shueisha o MAPPA.

---

## ✨ Demo

🔗 **Sitio publicado:** <https://valentinahernandezvh8824-del.github.io/jujutsu-kaisen/>
🔗 **Habilidades:** <https://valentinahernandezvh8824-del.github.io/jujutsu-kaisen/habilidades.html>

También puedes abrirla en local con doble clic en `index.html` (no necesita servidor ni instalación).

---

## 🚀 Características

- **28 personajes** de la obra, agrupados por escuela (Tokio, Kioto), independientes, antagonistas y espíritus malditos.
- **Página de habilidades** (`habilidades.html`) con las 125 técnicas y dominios del archivo, buscables y filtrables por tipo y por hechicero.
- **Enlaces cruzados**: cada técnica de una ficha lleva a su tarjeta en habilidades, y desde ahí se vuelve al personaje con `index.html#p-<id>` (abre la ficha directamente).
- **Hero cinematográfico** con muro de 8 personajes, efecto *ken burns*, parallax con el scroll y el puntero, rejilla y degradados de energía maldita.
- **Cabecera fija** que se compacta y se vuelve translúcida al bajar, con barra de progreso de lectura.
- **Banda animada** (*ticker*) con conceptos del universo, que se pausa al pasar el cursor.
- **Animaciones**: entrada escalonada del titular, revelado al hacer scroll con desenfoque, halo que sigue al cursor, brillo del título, realce de la habilidad enlazada, contadores ascendentes y respeto a `prefers-reduced-motion`.
- **Fotos de los personajes** en WebP con carga diferida, respaldo de color por personaje y marcador automático (kanji + color) si no hay imagen.
- **Todas las técnicas a la vista** en cada tarjeta, incluida la expansión de dominio, sin abrir la ficha.
- **Buscador instantáneo** que ignora tildes y mayúsculas, y busca en nombre, kanji, clan, epíteto, descripción, técnicas y dominio.
- **Filtros por afiliación y por grado** (Grado Especial, Grado 1–4, Espíritu Maldito).
- **Ordenamiento** por relevancia, nombre, poder total o grado.
- **Ficha de personaje** en modal: descripción, lista de técnicas enlazada, expansión de dominio y barras de estadísticas animadas.
- **Tema oscuro / claro** con detección automática del sistema y preferencia guardada en `localStorage`.
- **Botón "Aleatorio"** para descubrir un hechicero al azar.
- **Diseño responsive** verificado de 390 px a 1920 px, con tarjetas tipo *roster*, numeración correlativa y pie con tipografía de contorno.
- **Accesibilidad**: navegación con teclado, foco atrapado dentro del modal, cierre con `Esc`, etiquetas ARIA y respeto a `prefers-reduced-motion`.
- **Cero dependencias**: HTML, CSS y JavaScript puro. Solo las tipografías vienen de Google Fonts.

---

## 🗂️ Estructura del proyecto

```
jujutsu-kaisen/
├── index.html              # Wiki de personajes
├── habilidades.html        # Archivo de técnicas y dominios
├── css/
│   └── style.css           # Tema, componentes y animaciones
├── js/
│   ├── data.js             # Personajes, técnicas y estadísticas
│   ├── imagenes.js         # Manifest de fotos (lo genera el script)
│   ├── ui.js               # Tema, reveal, progreso, cabecera, parallax y halo
│   ├── app.js              # Búsqueda, filtros, modal y eventos
│   └── habilidades.js      # Listado y filtros de habilidades
├── assets/
│   └── personajes/         # Retratos <id>.webp
├── tools/
│   ├── descargar-imagenes.ps1
│   └── servidor.js         # Servidor local sin dependencias
├── README.md
├── LICENSE
└── .gitignore
```

Para agregar un personaje basta con añadir un objeto al arreglo `PERSONAJES` de `js/data.js`: los filtros, contadores y tarjetas se generan solos.

### 🖼️ Fotos de los personajes

Las fotos viven en `assets/personajes/` con el nombre del `id` de cada personaje (`gojo.jpg`, `yuji.png`, `megumi.webp`…). El manifest `js/imagenes.js` indica qué archivo usa cada ficha; si no hay foto, la tarjeta muestra un marcador con el kanji y el color del personaje.

**Opción 1 — script incluido** (descarga la imagen principal de cada página de la wiki de Jujutsu Kaisen):

```powershell
.\tools\descargar-imagenes.ps1          # descarga las que falten
.\tools\descargar-imagenes.ps1 -Forzar  # vuelve a descargar todas
```

Al terminar, el script reescribe `js/imagenes.js`. Luego sube los cambios:

```powershell
git add assets/personajes js/imagenes.js
git commit -m "feat: fotos de los personajes"
git push
```

**Opción 2 — manual:** copia tu imagen a `assets/personajes/<id>.jpg` y añádela al manifest:

```js
const IMAGENES = {
  gojo: "assets/personajes/gojo.jpg",
};
```

> Uso educativo y sin fines de lucro. Los personajes e imágenes pertenecen a Gege Akutami, Shueisha y MAPPA; este proyecto no reclama su propiedad y retirará cualquier material si el titular lo solicita.

---

## 🧑‍🎓 Personajes incluidos

| Personaje | Afiliación | Grado |
| --- | --- | --- |
| Yuji Itadori | Escuela de Tokio | Grado 4 |
| Megumi Fushiguro | Escuela de Tokio | Grado 2 |
| Nobara Kugisaki | Escuela de Tokio | Grado 3 |
| Satoru Gojo | Escuela de Tokio | Grado Especial |
| Maki Zenin | Escuela de Tokio | Grado 4 |
| Toge Inumaki | Escuela de Tokio | Grado 2 |
| Panda | Escuela de Tokio | Grado 2 |
| Yuta Okkotsu | Escuela de Tokio | Grado Especial |
| Kento Nanami | Escuela de Tokio | Grado 1 |
| Aoi Todo | Escuela de Kioto | Grado 1 |
| Kasumi Miwa | Escuela de Kioto | Grado 3 |
| Suguru Geto | Antagonista | Grado Especial |
| Ryomen Sukuna | Antagonista | Grado Especial |
| Toji Fushiguro | Antagonista | Grado Especial |
| Kenjaku | Antagonista | Grado Especial |
| Mahito | Espíritus Malditos | Espíritu Maldito |
| Choso | Espíritus Malditos | Grado Especial |
| Yuki Tsukumo | Independiente | Grado Especial |
| Jogo | Espíritus Malditos | Espíritu Maldito |
| Hanami | Espíritus Malditos | Espíritu Maldito |
| Dagon | Espíritus Malditos | Espíritu Maldito |
| Uraume | Antagonista | Grado Especial |
| Naoya Zenin | Antagonista | Grado 1 |
| Kinji Hakari | Escuela de Tokio | Grado 1 |
| Hiromi Higuruma | Escuela de Tokio | Grado 1 |
| Atsuya Kusakabe | Escuela de Tokio | Grado 1 |
| Mei Mei | Independiente | Grado 1 |
| Utahime Iori | Escuela de Kioto | Grado 1 |

---

## 🛠️ Tecnologías

| Tecnología | Uso |
| --- | --- |
| HTML5 | Estructura semántica y accesible |
| CSS3 | Variables, `grid`, `color-mix`, `clip-path`, animaciones y modo claro/oscuro |
| JavaScript (ES6+) | Render dinámico, filtros, modal, parallax y persistencia del tema |
| Google Fonts | Anton (display) e Inter (texto) |
| GitHub Pages | Publicación del sitio |

Sin frameworks, sin build, sin `npm install`.

---

## 💻 Ejecución local

**Opción 1 — abrir el archivo**

Haz doble clic en `index.html`.

**Opción 2 — servidor local (recomendado)**

```bash
# Con Python
python -m http.server 8080

# o con Node.js
npx serve .
```

Luego visita `http://localhost:8080`.

---

## 🌐 Publicar en GitHub Pages

1. Ve a **Settings → Pages** en el repositorio.
2. En *Build and deployment*, elige **Deploy from a branch**.
3. Selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda y espera un minuto: el sitio quedará en `https://valentinahernandezvh8824-del.github.io/jujutsu-kaisen/`.

---

## 🤝 Contribuir

Las contribuciones son bienvenidas:

1. Haz un fork del repositorio.
2. Crea una rama: `git checkout -b feature/nuevo-personaje`.
3. Haz tus cambios y confirma: `git commit -m "feat: agrega a Naoya Zenin"`.
4. Sube la rama: `git push origin feature/nuevo-personaje`.
5. Abre un Pull Request.

---

## 📄 Licencia

Código publicado bajo licencia **MIT** (ver `LICENSE`). Los nombres, personajes y elementos de Jujutsu Kaisen pertenecen a sus respectivos autores y titulares de derechos.

---

Hecho con ☕ y energía maldita por [Valentina](https://github.com/valentinahernandezvh8824-del).
