<#
.SYNOPSIS
    Descarga las fotos de los personajes desde la wiki de Jujutsu Kaisen
    y genera el manifest js/imagenes.js.

.DESCRIPTION
    Usa la API de MediaWiki de jujutsu-kaisen.fandom.com (no el HTML, que está
    protegido por Cloudflare):

      1. prop=pageimages  -> nombre del archivo principal de la página
      2. prop=imageinfo   -> URL de una miniatura de 700 px
      3. descarga la miniatura enviando el Referer del wiki

    Guarda cada foto en assets/personajes/<id>.<ext> y reescribe js/imagenes.js.

    Uso académico y sin fines de lucro. Las imágenes pertenecen a sus autores y
    titulares de derechos (Gege Akutami, Shueisha, MAPPA); deben retirarse si
    el titular lo solicita.

.EXAMPLE
    .\tools\descargar-imagenes.ps1

.EXAMPLE
    .\tools\descargar-imagenes.ps1 -Forzar
#>

[CmdletBinding()]
param(
    [switch]$Forzar,
    [int]$Ancho = 700
)

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Add-Type -AssemblyName System.Net.Http

$raiz     = Split-Path -Parent $PSScriptRoot
$destino  = Join-Path $raiz "assets\personajes"
$manifest = Join-Path $raiz "js\imagenes.js"
$api      = "https://jujutsu-kaisen.fandom.com/api.php"
$referer  = "https://jujutsu-kaisen.fandom.com/"

New-Item -ItemType Directory -Force -Path $destino | Out-Null

$personajes = @(
    @{ id = "yuji";    pagina = "Yuji_Itadori" },
    @{ id = "megumi";  pagina = "Megumi_Fushiguro" },
    @{ id = "nobara";  pagina = "Nobara_Kugisaki" },
    @{ id = "gojo";    pagina = "Satoru_Gojo" },
    @{ id = "maki";    pagina = "Maki_Zenin" },
    @{ id = "inumaki"; pagina = "Toge_Inumaki" },
    @{ id = "panda";   pagina = "Panda" },
    @{ id = "yuta";    pagina = "Yuta_Okkotsu" },
    @{ id = "nanami";  pagina = "Kento_Nanami" },
    @{ id = "geto";    pagina = "Suguru_Geto" },
    @{ id = "sukuna";  pagina = "Ryomen_Sukuna" },
    @{ id = "mahito";  pagina = "Mahito" },
    @{ id = "choso";   pagina = "Choso" },
    @{ id = "toji";    pagina = "Toji_Fushiguro" },
    @{ id = "todo";    pagina = "Aoi_Todo" },
    @{ id = "miwa";    pagina = "Kasumi_Miwa" },
    @{ id = "yuki";    pagina = "Yuki_Tsukumo" },
    @{ id = "kenjaku"; pagina = "Kenjaku" },
    @{ id = "jogo";    pagina = "Jogo" },
    @{ id = "hanami";  pagina = "Hanami" },
    @{ id = "dagon";   pagina = "Dagon" },
    @{ id = "uraume";  pagina = "Uraume" },
    @{ id = "naoya";   pagina = "Naoya_Zenin" },
    @{ id = "hakari";  pagina = "Kinji_Hakari" },
    @{ id = "higuruma"; pagina = "Hiromi_Higuruma" },
    @{ id = "kusakabe"; pagina = "Atsuya_Kusakabe" },
    @{ id = "meimei";  pagina = "Mei_Mei" },
    @{ id = "utahime"; pagina = "Utahime_Iori" }
)

$cliente = [System.Net.Http.HttpClient]::new()
$cliente.Timeout = [TimeSpan]::FromSeconds(45)
$cliente.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

function Get-Json([string]$url) {
    $texto = $cliente.GetStringAsync($url).GetAwaiter().GetResult()
    return $texto | ConvertFrom-Json
}

function Get-Extension([byte[]]$bytes) {
    if ($bytes.Length -lt 12) { return "jpg" }
    if ($bytes[0] -eq 0x89 -and $bytes[1] -eq 0x50 -and $bytes[2] -eq 0x4E -and $bytes[3] -eq 0x47) { return "png" }
    if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) { return "jpg" }
    if ($bytes[0] -eq 0x52 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46 -and $bytes[3] -eq 0x46) { return "webp" }
    return "jpg"
}

$entradas = [ordered]@{}
$descargadas = 0
$reutilizadas = 0
$fallidas = @()

foreach ($p in $personajes) {
    $id = $p.id

    $existente = Get-ChildItem -Path $destino -File -ErrorAction SilentlyContinue |
        Where-Object { $_.BaseName -eq $id -and $_.Extension -match '^\.(jpg|jpeg|png|webp|avif)$' } |
        Select-Object -First 1

    if ($existente -and -not $Forzar) {
        $entradas[$id] = "assets/personajes/$($existente.Name)"
        $reutilizadas++
        Write-Host ("  = {0,-8} ya existía: {1}" -f $id, $existente.Name) -ForegroundColor DarkGray
        continue
    }

    $urlImagen = $null

    try {
        # 1) Nombre del archivo principal de la página
        $consulta = "$api" + "?action=query&prop=pageimages&piprop=name&redirects=1&format=json&formatversion=2&titles=" + [uri]::EscapeDataString($p.pagina)
        $datos = Get-Json $consulta
        $nombreArchivo = $datos.query.pages[0].pageimage

        if ($nombreArchivo) {
            # 2) Miniatura de 700 px generada por la API
            $consulta2 = "$api" + "?action=query&prop=imageinfo&iiprop=url&format=json&formatversion=2&iiurlwidth=$Ancho&titles=" + [uri]::EscapeDataString("File:$nombreArchivo")
            $datos2 = Get-Json $consulta2
            $urlImagen = $datos2.query.pages[0].imageinfo[0].thumburl
        }
    }
    catch {
        $e = $_.Exception
        while ($e.InnerException) { $e = $e.InnerException }
        Write-Warning ("  ! {0}: {1}" -f $id, $e.Message)
    }

    if (-not $urlImagen) {
        $fallidas += $id
        if ($nombreArchivo -eq $null) { Write-Warning ("  ! {0}: la página no tiene imagen principal" -f $id) }
        continue
    }

    try {
        $req = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Get, $urlImagen)
        $req.Headers.Add("Referer", $referer)
        $req.Headers.Add("Accept", "image/avif,image/webp,image/png,image/*;q=0.8")
        $resp = $cliente.SendAsync($req).GetAwaiter().GetResult()
        $resp.EnsureSuccessStatusCode() | Out-Null
        $bytes = $resp.Content.ReadAsByteArrayAsync().GetAwaiter().GetResult()

        $ext = Get-Extension $bytes
        $archivo = Join-Path $destino "$id.$ext"
        if ($existente -and $existente.FullName -ne $archivo) {
            Remove-Item $existente.FullName -Force -ErrorAction SilentlyContinue
        }
        [System.IO.File]::WriteAllBytes($archivo, $bytes)

        $entradas[$id] = "assets/personajes/$id.$ext"
        $descargadas++
        Write-Host ("  OK {0,-8} {1,4} KB  {2}" -f $id, [math]::Round($bytes.Length / 1kb), $ext) -ForegroundColor Green
    }
    catch {
        $fallidas += $id
        Write-Warning ("  ! {0}: error al descargar la imagen" -f $id)
    }

    Start-Sleep -Milliseconds 600
}

# --- Manifest ---
$lineas = @(
    "/* Archivo generado por tools/descargar-imagenes.ps1. No editar a mano. */",
    "const IMAGENES = {"
)
foreach ($id in $entradas.Keys) {
    $lineas += '  ' + $id + ': "' + $entradas[$id] + '",'
}
$lineas += "};"

$utf8 = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($manifest, ($lineas -join "`r`n") + "`r`n", $utf8)

Write-Host ""
Write-Host ("Listo: {0} descargadas, {1} ya existentes, {2} con problema." -f $descargadas, $reutilizadas, $fallidas.Count) -ForegroundColor Cyan
if ($fallidas.Count -gt 0) {
    Write-Host ("Sin foto: " + ($fallidas -join ", ")) -ForegroundColor Yellow
    Write-Host "Puedes agregarlas a mano en assets/personajes/<id>.jpg y volver a ejecutar el script." -ForegroundColor Yellow
}
Write-Host ""
Write-Host "Siguiente paso: sube los cambios con git." -ForegroundColor Cyan
Write-Host "  git add assets/personajes js/imagenes.js"
Write-Host '  git commit -m "feat: fotos de los personajes"'
Write-Host "  git push"
