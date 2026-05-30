# 🔍 Review General — Arquitectura del Dinero

> Revisión técnica completa del proyecto. Fecha: Mayo 2026.

---

## 1. Resumen ejecutivo

El proyecto es un **hub de herramientas de finanzas personales** implementado como sitio estático (HTML/CSS/JS puro) desplegado en GitHub Pages. La base visual y funcional es sólida: diseño coherente, herramientas que funcionan y buena documentación interna. Sin embargo, se detectaron problemas que van desde un **bug crítico de CSS** hasta inconsistencias arquitectónicas que reducen la mantenibilidad y la experiencia de usuario.

---

## 2. Estructura del proyecto

```
arquitecturadeldinero/
├── index.html               ← Hub principal (landing page)
├── css/
│   └── styles.css           ← Estilos globales + estilos de tools
├── js/
│   └── main.js              ← Utilidades compartidas + lógica de index
├── tools/
│   ├── interes-compuesto.html
│   ├── retiro.html
│   ├── compro-o-alquilo.html
│   ├── inflacion.html
│   └── conversor-inflacion.html
├── _config.yml              ← Config Jekyll/GitHub Pages
├── deploy.ps1               ← Script de deploy
├── README.md
├── GUIA.md
├── MAPA.md
└── TESTING.md
```

---

## 3. Hallazgos por severidad

### 🔴 Crítico — Afecta funcionalidad

#### C-01: `@import` de Google Fonts en posición incorrecta
**Archivo:** `css/styles.css`  
**Problema:** La regla `@import url('https://fonts.googleapis.com/...')` está ubicada en la **línea ~66**, después de los bloques `:root {}` y del reset `* {}`. Las reglas `@import` **deben ser siempre la primera declaración** del archivo CSS. Cuando el `@import` no está al principio, muchos browsers lo ignoran completamente, haciendo que la fuente Inter nunca se cargue y el sitio caiga al fallback del sistema.  
**Impacto:** La tipografía principal del sitio (Inter) no carga en la mayoría de los navegadores.  
**Corrección:** Mover `@import` a la primera línea del archivo.

---

#### C-02: Herramientas locales no enlazadas desde `index.html`
**Archivo:** `index.html`  
**Problema:** Existen 5 páginas de herramientas en `/tools/`, pero `index.html` solo enlaza a **una** de ellas (`compro-o-alquilo.html`). Las otras cuatro enlazaban a URLs externas:

| Herramienta en index.html | Enlace usado | Página local disponible |
|---|---|---|
| Cálculo de Inversión | `dalamy.github.io/inversioninterescompuesto/` | ✅ `tools/interes-compuesto.html` |
| Cálculo de Retiro | `dalamy.github.io/calculadora-de-retiro/` | ✅ `tools/retiro.html` |
| Inflación - Visualización | `platamia.com.ar/public/historicos` | ✅ `tools/inflacion.html` |
| Conversor de Inflación | `platamia.com.ar/public/conversor-inflacion` | ✅ `tools/conversor-inflacion.html` |
| ¿Compro o alquilo? | `tools/compro-o-alquilo.html` | ✅ (correctamente enlazado) |

**Impacto:** Las herramientas locales existen pero son inaccesibles desde la navegación principal. El usuario sale del sitio innecesariamente.  
**Nota:** Puede ser intencional si las versiones externas son más completas o con datos reales. Requiere decisión del equipo (ver PLAN.md).

---

### 🟡 Importante — Afecta mantenibilidad y calidad

#### I-01: Estilos inline mezclados con CSS de archivo
**Archivos:** `tools/retiro.html`, `tools/inflacion.html`, `tools/conversor-inflacion.html`  
**Problema:** Se usan atributos `style=""` directamente en el HTML para cosas como colores de texto, paddings, border-radius, etc. Ejemplos:
```html
<small style="color: #a0a0a0; font-size: 0.9rem;">
<div style="text-align: center; padding: 2rem; background: rgba(59,130,246,0.1); border-radius: 8px;">
<p style="font-size: 2.5rem; font-weight: 700; color: #3b82f6;">
```
**Impacto:** Dificulta cambios de diseño global (hay que editar cada HTML), rompe la consistencia del sistema de diseño, y duplica valores hardcodeados.

---

#### I-02: Código muerto en `main.js` — `animateNumbers()`
**Archivo:** `js/main.js`  
**Problema:** La función `animateNumbers()` busca elementos con el selector `[data-animate-value]`, pero ninguna página del sitio tiene elementos con ese atributo. La función se ejecuta en cada carga de página sin hacer nada.  
**Impacto:** Código confuso para quien lo lea, aunque el impacto en performance es mínimo.

---

#### I-03: `validateNumberInput` aplica estilos inline desde JS
**Archivo:** `js/main.js`  
**Problema:**
```js
input.style.borderColor = '#ef4444';  // error
input.style.borderColor = '';          // reset
```
El manejo de estado de validación debería hacerse con clases CSS, no con estilos inline desde JS. Esto mezcla lógica de presentación con lógica de comportamiento.

---

#### I-04: Sin navegación entre herramientas
**Archivos:** todos los `tools/*.html`  
**Problema:** Desde cualquier herramienta solo existe el link "← Volver al inicio". No hay forma de navegar a otra herramienta sin volver al hub. Esto aumenta la fricción en el flujo del usuario.

---

#### I-05: Lógica de herramientas embebida en el HTML
**Archivos:** todos los `tools/*.html`  
**Problema:** Cada herramienta tiene bloques `<script>` inline con toda su lógica (cálculos, Chart.js, etc.). Esto hace que:
- No sea posible testear la lógica de forma aislada.
- El HTML se vuelva difícil de leer.
- La lógica no sea reutilizable.

---

#### I-06: Chart.js sin Subresource Integrity (SRI)
**Archivos:** `tools/interes-compuesto.html`, `tools/retiro.html`, `tools/compro-o-alquilo.html`, `tools/inflacion.html`  
**Problema:**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```
No tiene atributo `integrity` ni `crossorigin`. Si jsDelivr fuera comprometido, el script malicioso correría en el sitio sin restricciones.  
**Corrección:** Agregar `integrity="sha384-..."` con el hash del archivo.

---

#### I-07: Imagen de Plata Mía desde dominio externo sin fallback
**Archivo:** `index.html`  
**Problema:** `<img src="https://www.platamia.com.ar/assets/plata_mia_logo.png">` carga desde un servidor externo. Si ese servidor no está disponible o cambia la URL, la imagen no carga y no hay `alt` text descriptivo de fallback (el `alt` existe pero no como fallback visual).  
**Corrección:** Descargar la imagen localmente a `/img/` o agregar `onerror` + imagen de respaldo.

---

### 🔵 Mejoras — No son bugs pero mejoran la calidad

#### M-01: Sin favicon
**Todos los archivos HTML** no tienen `<link rel="icon">`. Esto genera un error 404 en la consola y el browser muestra un ícono genérico.

---

#### M-02: Sin meta tags Open Graph / Twitter Card
**Archivo:** `index.html`  
Sin estas etiquetas, al compartir el link en redes sociales o WhatsApp no se genera ninguna preview con imagen/título/descripción.  
Ejemplo de lo que falta:
```html
<meta property="og:title" content="Arquitectura del Dinero">
<meta property="og:description" content="Diseñá, medí y optimizá tu sistema financiero personal">
<meta property="og:image" content="...">
<meta property="og:url" content="...">
```

---

#### M-03: Sin `<link rel="preconnect">` para fuentes y CDN
**Archivos:** `index.html` y tools  
No hay hints de preconexión para Google Fonts y jsDelivr. Esto retrasa la carga de la fuente y de Chart.js.  
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">
```

---

#### M-04: `_config.yml` con `google_analytics` vacío
**Archivo:** `_config.yml`  
El campo `google_analytics` está definido como comentario pero con valor vacío. Si en algún momento Jekyll lo procesa, podría generar un tag vacío. Mejor eliminarlo o completarlo.

---

#### M-05: Sin página 404 personalizada
GitHub Pages sirve una página 404 genérica. Una página `404.html` personalizada mantiene la identidad del sitio y puede redirigir al usuario al hub.

---

#### M-06: Sin `<main>` landmark en `index.html`
**Archivo:** `index.html`  
Las secciones `.concepto` y `.herramientas` no están envueltas en un `<main>`. Esto afecta la accesibilidad (screen readers, navegación por teclado) y el SEO semántico.

---

#### M-07: `deploy.ps1` sin validación de remote
**Archivo:** `deploy.ps1`  
El script no verifica si hay un remote configurado antes de hacer `git push`. Si se ejecuta sin configurar el origin, fallará con un error poco claro.

---

#### M-08: `.gitignore` no está en el workspace
`TESTING.md` lo lista como existente (`[x] .gitignore existe`) pero no está presente. Conviene verificar si se perdió o crear uno.

---

## 4. Aspectos positivos

- ✅ **Sistema de diseño consistente**: Variables CSS bien definidas, paleta coherente y nomenclatura clara.
- ✅ **Accesibilidad básica**: `lang="es"` en todos los HTML, `focus-visible` implementado, `prefers-reduced-motion` respetado.
- ✅ **Utilidades financieras compartidas**: `window.FinanceUtils` expone funciones reutilizables entre herramientas.
- ✅ **Responsive**: Grid con `auto-fit` y breakpoints definidos para mobile.
- ✅ **Documentación interna**: README, GUIA, MAPA y TESTING son materiales de calidad.
- ✅ **Código JS limpio**: Sin frameworks innecesarios, vanilla JS apropiado para el caso de uso.
- ✅ **Animaciones sobrias**: `prefers-reduced-motion` y animaciones no intrusivas.
- ✅ **Advertencia legal**: Footer con disclaimer en todas las páginas.

---

## 5. Resumen de hallazgos

| ID | Severidad | Descripción |
|---|---|---|
| C-01 | 🔴 Crítico | `@import` de fuente en posición incorrecta |
| C-02 | 🔴 Crítico | Herramientas locales no enlazadas desde index.html |
| I-01 | 🟡 Importante | Estilos inline mezclados con CSS de archivo |
| I-02 | 🟡 Importante | Código muerto `animateNumbers()` |
| I-03 | 🟡 Importante | Validación de inputs con estilos inline JS |
| I-04 | 🟡 Importante | Sin navegación entre herramientas |
| I-05 | 🟡 Importante | Lógica de tools embebida en HTML |
| I-06 | 🟡 Importante | Chart.js sin SRI |
| I-07 | 🟡 Importante | Imagen externa sin fallback |
| M-01 | 🔵 Mejora | Sin favicon |
| M-02 | 🔵 Mejora | Sin meta tags Open Graph |
| M-03 | 🔵 Mejora | Sin preconnect hints |
| M-04 | 🔵 Mejora | `_config.yml` con campo vacío |
| M-05 | 🔵 Mejora | Sin página 404 personalizada |
| M-06 | 🔵 Mejora | Sin `<main>` en index.html |
| M-07 | 🔵 Mejora | `deploy.ps1` sin validación de remote |
| M-08 | 🔵 Mejora | `.gitignore` no encontrado en workspace |
