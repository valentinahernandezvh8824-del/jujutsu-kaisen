# Jujutsu Kaisen — Wiki de Hechiceros 呪

Aplicativo web estático que funciona como una **wiki interactiva de Jujutsu Kaisen**: 18 personajes, sus técnicas malditas, grados, clanes y expansiones de dominio, con buscador, filtros, ordenamiento y fichas detalladas.

> Proyecto fan, sin fines comerciales y sin afiliación con Gege Akutami, Shueisha o MAPPA.

---

## ✨ Demo

Cuando publiques el repositorio con GitHub Pages, la app quedará disponible en:

```
https://valentinahernandezvh8824-del.github.io/jujutsu-kaisen/
```

También puedes abrirla en local con doble clic en `index.html` (no necesita servidor ni instalación).

---

## 🚀 Características

- **18 personajes** de la obra, agrupados por escuela (Tokio, Kioto), independientes, antagonistas y espíritus malditos.
- **Buscador instantáneo** que ignora tildes y mayúsculas, y busca en nombre, kanji, clan, epíteto, descripción, técnicas y dominio.
- **Filtros por afiliación y por grado** (Grado Especial, Grado 1–4, Espíritu Maldito).
- **Ordenamiento** por relevancia, nombre, poder total o grado.
- **Ficha de personaje** en modal: descripción, lista de técnicas, expansión de dominio y barras de estadísticas animadas.
- **Tema oscuro / claro** con detección automática del sistema y preferencia guardada en `localStorage`.
- **Botón "Aleatorio"** para descubrir un hechicero al azar.
- **Diseño responsive** con tarjetas, auras de energía maldita y animaciones suaves.
- **Accesibilidad**: navegación con teclado, foco atrapado dentro del modal, cierre con `Esc`, etiquetas ARIA y respeto a `prefers-reduced-motion`.
- **Cero dependencias**: HTML, CSS y JavaScript puro. Funciona sin conexión.

---

## 🗂️ Estructura del proyecto

```
jujutsu-kaisen/
├── index.html        # Estructura de la página
├── css/
│   └── style.css     # Tema, componentes y responsive
├── js/
│   ├── data.js       # Personajes, técnicas y estadísticas
│   └── app.js        # Búsqueda, filtros, modal, tema y eventos
├── README.md
├── LICENSE
└── .gitignore
```

Para agregar un personaje basta con añadir un objeto al arreglo `PERSONAJES` de `js/data.js`: los filtros, contadores y tarjetas se generan solos.

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

---

## 🛠️ Tecnologías

| Tecnología | Uso |
| --- | --- |
| HTML5 | Estructura semántica y accesible |
| CSS3 | Variables, `grid`, `color-mix`, animaciones y modo claro/oscuro |
| JavaScript (ES6+) | Render dinámico, filtros, modal y persistencia del tema |
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
