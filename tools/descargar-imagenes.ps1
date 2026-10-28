<#
.SYNOPSIS
    Descarga las fotos de los personajes desde la wiki de Jujutsu Kaisen
    y genera el manifest js/imagenes.js.

.DESCRIPTION
    Para cada personaje abre su página en jujutsu-kaisen.fandom.com, toma la
    imagen principal (etiqueta og:image) y la guarda en assets/personajes/
    con el nombre <id>.<ext>. Al final reescribe js/imagenes.js para que el
    sitio use esas fotos automáticamente.

    Uso académico y sin fines de lucro. Las imágenes pertenecen a sus autores
    y titulares de derechos (Gege Akutami, Shueisha, MAPPA). Si el titular lo
    solicita, deben retirarse.

.EXAMPLE
    .\tools\descargar-imagenes.ps1

.EXAMPLE
    .\tools\descargar-imagenes.ps1 -Forzar
#>

[CmdletBinding()]
param(
    [switch]$Forzar
)

$ErrorActionPreference = "Stop"

$raiz    = Split-Path -Parent $PSScriptRoot
$destino = Join-Path $raiz "assets\personajes"
$manifest = Join-Path $raiz "js\imagenes.js"

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
    @{ id = "kenjaku"; pagina = "Kenjaku" }
)

$agente = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"

Add-Type -AssemblyName System.Net.Http
$cliente = [System.Net.Http.HttpClient]::new()
$cliente.Timeout = [TimeSpan]::FromSeconds(60)
$cliente.DefaultRequestHeaders.Add("User-Agent", $agente)

function Get-Extension([byte[]]$bytes) {
    if ($bytes.Length -lt 12) { return "jpg" }
    if ($bytes[0] -eq 0x89 -and $bytes[1] -eq 0x50 -and $bytes[2] -eq 0x4E -and $bytes[3] -eq 0x47) { return "png" }
    if ($bytes[0] -eq 0xFF -and $bytes[1] -eq 0xD8) { return "jpg" }
    if ($bytes[0] -eq 0x52 -and $bytes[1] -eq 0x49 -and $bytes[2] -eq 0x46 -and $bytes[3] -eq 0x46) { return "webp" }
    $marca = [System.Text.Encoding]::ASCII.GetString($bytes, 4, 8)
    if ($marca -like "ftypavi*") { return "avif" }
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
        Write-Host ("  = {0} (ya existía: {1})" -f $id, $existente.Name) -ForegroundColor DarkGray
        continue
    }

    $pagina = "https://jujutsu-kaisen.fandom.com/wiki/$($p.pagina)"
    $urlImagen = $null

    for ($intento = 1; $intento -le 3 -and -not $urlImagen; $intento++) {
        try {
            $html = $cliente.GetStringAsync($pagina).GetAwaiter().GetResult()
            $m = [regex]::Match($html, '<meta property="og:image" content="([^"]+)"')
            if ($m.Success) { $urlImagen = $m.Groups[1].Value }
        }
        catch {
            Start-Sleep -Seconds (2 * $intento)
        }
    }

    if (-not $urlImagen) {
        $fallidas += $id
        Write-Warning ("  ! {0}: no se encontró la imagen principal" -f $id)
        continue
    }

    try {
        $bytes = $cliente.GetByteArrayAsync($urlImagen).GetAwaiter().GetResult()
        $ext = Get-Extension $bytes
        $archivo = Join-Path $destino "$id.$ext"

        if ($existente -and $existente.FullName -ne $archivo) {
            Remove-Item $existente.FullName -Force -ErrorAction SilentlyContinue
        }

        [System.IO.File]::WriteAllBytes($archivo, $bytes)
        $entradas[$id] = "assets/personajes/$id.$ext"
        $descargadas++
        Write-Host ("  OK {0,-8} {1,5} KB  ({2})" -f $id, [math]::Round($bytes.Length / 1kb), $ext) -ForegroundColor Green
    }
    catch {
        $fallidas += $id
        Write-Warning ("  ! {0}: error al descargar la imagen" -f $id)
    }

    Start-Sleep -Milliseconds 800
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
