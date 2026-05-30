# 🗺️ Plan de Mejoras — Arquitectura del Dinero

> Plan de acción basado en `REVIEW.md`. Las fases están ordenadas por impacto/esfuerzo.

---

## Fase 1 — Fixes críticos (alta prioridad, bajo esfuerzo)

Estas correcciones son rápidas de implementar y resuelven los problemas de mayor impacto.

### 1.1 Corregir posición del `@import` de Google Fonts

**Archivo:** `css/styles.css`  
**Problema:** [C-01] El `@import` está en la línea ~66, debe ser la primera línea del archivo.

```css
/* ANTES (incorrecto) */
* { margin: 0; ... }
:root { ... }
@import url('https://fonts.googleapis.com/...');  /* ← demasiado tarde */

/* DESPUÉS (correcto) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
* { margin: 0; ... }
:root { ... }
```

**Esfuerzo:** 5 min  
**Impacto:** La fuente Inter carga correctamente en todos los browsers.

---

### 1.2 Decidir y normalizar links de herramientas en index.html

**Archivo:** `index.html`  
**Problema:** [C-02] Las 4 herramientas locales no están enlazadas desde el hub.

**Decisión requerida:** Elegir para cada herramienta si usar la versión local o la externa.

| Herramienta | Versión local | Versión externa | Recomendación |
|---|---|---|---|
| Interés Compuesto | `tools/interes-compuesto.html` | dalamy.github.io | Local si tiene feature parity |
| Cálculo de Retiro | `tools/retiro.html` | dalamy.github.io | Local si tiene feature parity |
| Inflación | `tools/inflacion.html` | platamia.com.ar | Externa (datos reales en platamia) |
| Conversor de Inflación | `tools/conversor-inflacion.html` | platamia.com.ar | Externa (datos reales en platamia) |

> **Nota:** Las versiones de platamia.com.ar probablemente tienen datos reales actualizados, lo que las hace superiores a las versiones locales con datos hardcodeados. Para inflación y conversor, mantener los enlaces externos puede ser la decisión correcta.

---

### 1.3 Agregar favicon

**Todos los HTML**  
Crear un archivo SVG simple o usar un emoji como favicon:

```html
<!-- En el <head> de todos los HTML -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
```

**Archivo sugerido `favicon.svg`:**
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y=".9em" font-size="90">🏗️</text>
</svg>
```

**Esfuerzo:** 15 min  
**Impacto:** Elimina error 404 en consola, mejora branding.

---

### 1.4 Agregar meta tags Open Graph

**Archivo:** `index.html` (y opcionalmente en cada tool)

```html
<meta property="og:title" content="Arquitectura del Dinero">
<meta property="og:description" content="Diseñá, medí y optimizá tu sistema financiero personal. Herramientas educativas de finanzas personales.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://TU_USUARIO.github.io/arquitectura-del-dinero/">
<meta property="og:image" content="https://TU_USUARIO.github.io/arquitectura-del-dinero/img/og-image.png">
<meta name="twitter:card" content="summary_large_image">
```

**Esfuerzo:** 20 min  
**Impacto:** Previews en redes sociales y WhatsApp al compartir el link.

---

### 1.5 Agregar `<link rel="preconnect">`

**Archivos:** `index.html` y todos los `tools/*.html`

```html
<!-- En el <head>, antes del link de styles.css -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">
```

**Esfuerzo:** 10 min  
**Impacto:** Carga más rápida de fuentes y Chart.js.

---

### 1.6 Crear `.gitignore`

**Archivo nuevo:** `.gitignore`

```gitignore
# Windows
Thumbs.db
desktop.ini

# macOS
.DS_Store

# VS Code
.vscode/

# Logs
*.log

# Temporales
*.tmp
```

**Esfuerzo:** 5 min

---

## Fase 2 — Mejoras de calidad (media prioridad, medio esfuerzo)

### 2.1 Agregar SRI a Chart.js

**Archivos:** todos los tools que usan Chart.js

Reemplazar:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

Por:
```html
<script
  src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"
  integrity="sha384-[HASH_AQUÍ]"
  crossorigin="anonymous">
</script>
```

Para obtener el hash:
```bash
curl -s https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js | openssl dgst -sha384 -binary | openssl base64 -A
```

**Esfuerzo:** 30 min  
**Impacto:** Protección contra supply chain attacks en CDN.

---

### 2.2 Agregar navegación entre herramientas

**Archivos:** todos los `tools/*.html`

Agregar en cada tool header un menú horizontal o dropdown con links a las demás herramientas:

```html
<header class="tool-header">
    <div class="container">
        <a href="../index.html" class="back-link">← Inicio</a>
        <h1><!-- título de la herramienta --></h1>
        <nav class="tool-nav" aria-label="Otras herramientas">
            <a href="interes-compuesto.html">📈 Inversión</a>
            <a href="retiro.html">🎯 Retiro</a>
            <a href="compro-o-alquilo.html">🏠 Compro/Alquilo</a>
        </nav>
    </div>
</header>
```

**Esfuerzo:** 45 min  
**Impacto:** Mejor experiencia de usuario, menor fricción.

---

### 2.3 Extraer estilos inline a clases CSS

**Archivos:** `tools/retiro.html`, `tools/inflacion.html`, `tools/conversor-inflacion.html`

Crear clases utilitarias en `styles.css`:

```css
/* Agregar al final de styles.css */
.text-hint {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.9rem;
    line-height: 1.4;
}

.result-highlight {
    text-align: center;
    padding: var(--spacing-md);
    background: rgba(59, 130, 246, 0.1);
    border-radius: var(--radius);
    margin-bottom: var(--spacing-md);
}

.result-highlight-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-success);
}
```

**Esfuerzo:** 1 hora  
**Impacto:** Estilos centralizados, sistema de diseño respetado.

---

### 2.4 Reemplazar validación JS con clases CSS

**Archivo:** `js/main.js`

```js
// ANTES
input.style.borderColor = '#ef4444';
input.style.borderColor = '';

// DESPUÉS
input.classList.add('input-error');
input.classList.remove('input-error');
```

```css
/* En styles.css */
.input-error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
}
```

**Esfuerzo:** 20 min

---

### 2.5 Limpiar código muerto en `main.js`

**Archivo:** `js/main.js`

- Eliminar o comentar `animateNumbers()` y sus helpers (`animateValue`, `easeOutQuart`) si no se usan.
- O bien, documentar que está pensado para una sección de estadísticas futura.

**Esfuerzo:** 15 min

---

### 2.6 Agregar `<main>` semántico en index.html

**Archivo:** `index.html`

```html
<header class="hero">...</header>

<main>
    <section class="concepto">...</section>
    <section class="herramientas" id="herramientas">...</section>
</main>

<footer class="footer">...</footer>
```

**Esfuerzo:** 5 min  
**Impacto:** Accesibilidad y SEO semántico.

---

### 2.7 Crear página 404 personalizada

**Archivo nuevo:** `404.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página no encontrada | Arquitectura del Dinero</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <header class="hero" style="padding: 6rem 0;">
        <div class="container">
            <h1 style="font-size: 6rem;">404</h1>
            <p class="hero-subtitle">Esta página no existe</p>
            <a href="/" class="cta-button">Volver al inicio</a>
        </div>
    </header>
</body>
</html>
```

**Esfuerzo:** 20 min

---

## Fase 3 — Mejoras arquitectónicas (largo plazo)

### 3.1 Extraer lógica de herramientas a archivos JS separados

**Estructura propuesta:**
```
js/
├── main.js               ← solo lógica de index.html + utils globales
├── utils/
│   └── finance.js        ← FinanceUtils (ya existe, extraer de main.js)
└── tools/
    ├── interes-compuesto.js
    ├── retiro.js
    ├── compro-o-alquilo.js
    ├── inflacion.js
    └── conversor-inflacion.js
```

Cada tool HTML cargaría solo lo que necesita:
```html
<script src="../js/utils/finance.js"></script>
<script src="../js/tools/interes-compuesto.js"></script>
```

**Beneficios:**
- Lógica testeable de forma aislada
- HTML más limpio y legible
- Mejor caché del browser (el JS no cambia cuando el HTML cambia)

**Esfuerzo:** 2-3 horas  

---

### 3.2 Imagen de Plata Mía local con fallback

**Archivo:** `index.html`

```html
<img 
    src="/img/plata-mia-logo.png" 
    alt="Plata Mía" 
    class="plata-logo"
    onerror="this.src=''; this.alt='Plata Mía'; this.style.display='none'; this.nextElementSibling.style.display='block';"
>
<span style="display:none; font-size:2rem;">💰</span>
```

O simplemente: descargar el logo a `/img/plata-mia-logo.png`.

**Esfuerzo:** 15 min  

---

### 3.3 Mejorar `deploy.ps1` con validación de remote

**Archivo:** `deploy.ps1`

```powershell
# Verificar que hay un remote configurado
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host "✗ No hay remote 'origin' configurado." -ForegroundColor Red
    Write-Host "  Ejecutá: git remote add origin https://github.com/TU_USUARIO/REPO.git" -ForegroundColor Yellow
    exit 1
}
Write-Host "✓ Remote: $remoteUrl" -ForegroundColor Green
```

**Esfuerzo:** 15 min

---

### 3.4 Limpiar `_config.yml`

**Archivo:** `_config.yml`

```yaml
# GitHub Pages configuration
title: Arquitectura del Dinero
description: Diseñá, medí y optimizá tu sistema financiero personal
show_downloads: false
# google_analytics: GA_MEASUREMENT_ID  ← descomentar y completar cuando se tenga
```

**Esfuerzo:** 5 min

---

## Checklist de implementación

### Fase 1 (Crítico)
- [ ] 1.1 — Mover `@import` al inicio de `styles.css`
- [ ] 1.2 — Decidir y actualizar links de herramientas en `index.html`
- [ ] 1.3 — Crear `favicon.svg` y agregar `<link rel="icon">` en todos los HTML
- [ ] 1.4 — Agregar Open Graph meta tags en `index.html`
- [ ] 1.5 — Agregar `<link rel="preconnect">` en todos los HTML
- [ ] 1.6 — Crear `.gitignore`

### Fase 2 (Calidad)
- [ ] 2.1 — Agregar SRI a Chart.js en todos los tools
- [ ] 2.2 — Agregar navegación entre herramientas en tool headers
- [ ] 2.3 — Extraer estilos inline a clases CSS en `styles.css`
- [ ] 2.4 — Reemplazar `input.style.borderColor` por clase CSS
- [ ] 2.5 — Limpiar código muerto `animateNumbers()` en `main.js`
- [ ] 2.6 — Agregar `<main>` semántico en `index.html`
- [ ] 2.7 — Crear `404.html` personalizado

### Fase 3 (Arquitectura)
- [ ] 3.1 — Separar lógica de tools a archivos JS en `/js/tools/`
- [ ] 3.2 — Imagen de Plata Mía local con fallback
- [ ] 3.3 — Mejorar validación en `deploy.ps1`
- [ ] 3.4 — Limpiar `_config.yml`

---

## Estimación de impacto

| Fase | Esfuerzo total | Impacto |
|---|---|---|
| Fase 1 | ~1 hora | 🔴 Alto — resuelve bugs visibles |
| Fase 2 | ~3 horas | 🟡 Medio — mejora calidad y UX |
| Fase 3 | ~4 horas | 🔵 Bajo — mejor arquitectura interna |

---

*Ver `REVIEW.md` para el detalle técnico de cada hallazgo.*
