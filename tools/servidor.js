/* ============================================================
   Servidor local de desarrollo (sin dependencias)
   Uso:  node tools/servidor.js [puerto]
   Luego abre http://localhost:8080
   ============================================================ */

const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const RAIZ = path.resolve(__dirname, "..");
const PUERTO = Number(process.argv[2]) || 8080;

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

const servidor = http.createServer((req, res) => {
  const ruta = decodeURIComponent(url.parse(req.url).pathname);
  let relativa = ruta === "/" ? "index.html" : ruta.replace(/^\/+/, "");
  let archivo = path.resolve(RAIZ, relativa);

  // Evita salir de la carpeta del proyecto
  if (!archivo.startsWith(RAIZ)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("403 Prohibido");
  }

  fs.stat(archivo, (err, datos) => {
    if (!err && datos.isDirectory()) {
      archivo = path.join(archivo, "index.html");
    }

    fs.readFile(archivo, (error, contenido) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        res.end(
          "<!doctype html><meta charset='utf-8'><body style=\"font-family:system-ui;padding:3rem;background:#07070d;color:#eee\">" +
            "<h1>404</h1><p>No existe <code>" +
            relativa.replace(/[<>&]/g, "") +
            "</code></p><p><a style='color:#b026ff' href='/'>Volver al inicio</a></p></body>"
        );
        console.log(`404  ${relativa}`);
        return;
      }

      res.writeHead(200, {
        "Content-Type": TIPOS[path.extname(archivo).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      res.end(contenido);
      console.log(`200  ${relativa}`);
    });
  });
});

servidor.listen(PUERTO, () => {
  console.log("");
  console.log(`  Jujutsu Kaisen — wiki local`);
  console.log(`  http://localhost:${PUERTO}`);
  console.log(`  Sirviendo: ${RAIZ}`);
  console.log("  Ctrl+C para detener");
  console.log("");
});

servidor.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error(`El puerto ${PUERTO} está ocupado. Prueba: node tools/servidor.js 8081`);
  } else {
    console.error(e);
  }
  process.exit(1);
});
