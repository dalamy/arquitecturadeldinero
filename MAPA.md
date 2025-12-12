# 🗺️ Mapa del sitio - Arquitectura del Dinero

## Estructura de navegación

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              ARQUITECTURA DEL DINERO                │
│     Diseñá, medí y optimizá tu sistema financiero  │
│                                                     │
│              [Explorar herramientas]                │
│                        ↓                            │
└─────────────────────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
    EL CONCEPTO                    HERRAMIENTAS
         │                               │
         ↓                               ↓
  "El dinero no                   ┌──────────────┐
   se administra:                 │   6 CARDS    │
   se diseña"                     └──────────────┘
                                         │
                    ┌────────────────────┼─────────────────────┐
                    │                    │                     │
                    ↓                    ↓                     ↓
              ┌─────────┐          ┌─────────┐          ┌─────────┐
              │ PLATA   │          │ INTERÉS │          │ CÁLCULO │
              │  MÍA    │          │COMPUESTO│          │  RETIRO │
              │   ⭐    │          │         │          │         │
              └─────────┘          └─────────┘          └─────────┘
                  │                     │                     │
            (Link externo)         (Página tool)        (Página tool)
                    │
                    ↓
              ┌─────────┐          ┌─────────┐          ┌─────────┐
              │ COMPRO  │          │INFLACIÓN│          │CONVERSOR│
              │    O    │          │  HIST.  │          │INFLACIÓN│
              │ALQUILO? │          │         │          │         │
              └─────────┘          └─────────┘          └─────────┘
                  │                     │                     │
            (Página tool)          (Página tool)        (Página tool)
```

## Páginas del sitio

### 🏠 Página principal (`index.html`)
**Secciones:**
1. **Hero**
   - Título principal
   - Subtítulo
   - CTA "Explorar herramientas"

2. **El concepto**
   - Explicación de Arquitectura del Dinero
   - "El dinero no se administra: se diseña"

3. **Herramientas** (6 cards)
   - Plata Mía (destacada, link externo)
   - 5 herramientas internas

4. **Footer**
   - Autor
   - Disclaimer
   - Links (GitHub, Plata Mía)

---

### 🧮 Herramientas (`/tools/`)

#### 1. `interes-compuesto.html`
**Inputs:**
- Capital inicial
- Aporte mensual
- Tasa anual
- Años

**Outputs:**
- Monto final
- Total invertido
- Intereses ganados
- Rendimiento %
- Gráfico de crecimiento

---

#### 2. `retiro.html`
**Inputs:**
- Gasto mensual deseado
- Tasa de retiro
- Rendimiento anual
- Inflación
- Capital actual (opcional)

**Outputs:**
- Capital necesario
- Años de cobertura
- Retiro mensual
- Falta acumular
- Gráfico de proyección

---

#### 3. `compro-o-alquilo.html`
**Inputs (Comprar):**
- Valor propiedad
- Pago inicial
- Gastos de compra
- Expensas
- Mantenimiento
- Apreciación

**Inputs (Alquilar):**
- Alquiler mensual
- Aumento anual
- Rendimiento inversión

**Outputs:**
- Patrimonio neto (compra)
- Capital acumulado (alquiler)
- Mejor opción
- Diferencia
- Gráfico comparativo

---

#### 4. `inflacion.html`
**Inputs:**
- Región (Argentina/USA/Global)
- Tipo (Anual/Acumulada)

**Outputs:**
- Promedio últimos 10 años
- Inflación acumulada
- Gráfico histórico

**Datos:**
- 2014-2024
- Tres regiones

---

#### 5. `conversor-inflacion.html`
**Inputs:**
- Monto original
- Moneda (ARS/USD)
- Año origen
- Año destino

**Outputs:**
- Monto convertido
- Inflación acumulada
- Años transcurridos
- Inflación promedio anual

---

## 🎨 Sistema de diseño

### Colores
```
Fondo principal:   #0f0f0f (negro casi puro)
Fondo alternativo: #1a1a1a (gris muy oscuro)
Texto principal:   #e0e0e0 (gris claro)
Texto secundario:  #a0a0a0 (gris medio)
Primario:          #3b82f6 (azul)
Acento:            #10b981 (verde)
Bordes:            #2a2a2a (gris oscuro)
```

### Tipografía
```
Fuente: Inter (Google Fonts)
Pesos: 400, 500, 600, 700

Hero título:    3.5rem / 700
Hero subtítulo: 1.5rem / 400
Sección título: 2.5rem / 700
Card título:    1.5rem / 600
Texto normal:   1rem / 400
```

### Espaciado
```
xs:  0.5rem (8px)
sm:  1rem   (16px)
md:  2rem   (32px)
lg:  3rem   (48px)
xl:  4rem   (64px)
```

### Componentes principales

**Card de herramienta:**
- Fondo: `--color-bg`
- Borde: 1px solid `--color-border`
- Border radius: 8px
- Padding: 2rem
- Hover: translateY(-4px) + border color change

**Botón principal:**
- Fondo: `--color-primary`
- Padding: 1rem 2.5rem
- Border radius: 8px
- Hover: translateY(-2px) + shadow

**Card destacada (Plata Mía):**
- Borde: 2px solid `--color-accent`
- Badge superior
- Gradiente de fondo sutil

---

## 📊 Dependencias externas

### CDN utilizados
```html
<!-- Chart.js para gráficos -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>

<!-- Google Fonts - Inter -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Nota:** Estas son las ÚNICAS dependencias externas. El resto es código propio.

---

## 🔗 Enlaces importantes

### Internos
- `/` → Página principal
- `/tools/interes-compuesto.html`
- `/tools/retiro.html`
- `/tools/compro-o-alquilo.html`
- `/tools/inflacion.html`
- `/tools/conversor-inflacion.html`

### Externos
- `https://web.platamia.com.ar` → Plata Mía
- `https://github.com/dariolamy` → GitHub del autor

---

## 📱 Responsive breakpoints

```css
/* Desktop (default) */
@media (max-width: 1200px) { /* Tablets grandes */ }
@media (max-width: 768px)  { /* Tablets / móviles */ }
@media (max-width: 480px)  { /* Móviles pequeños */ }
```

**Cambios principales en móvil:**
- Grid de 3 columnas → 1 columna
- Font sizes reducidos
- Espaciado compacto
- Hero simplificado

---

## 🚀 Performance

### Optimizaciones implementadas
- ✅ CSS minificado conceptualmente
- ✅ JavaScript vanilla (sin frameworks pesados)
- ✅ Imágenes: solo emojis (cero peso)
- ✅ Fonts: Inter via CDN con display=swap
- ✅ Chart.js: solo CDN cuando se necesita

### Métricas esperadas
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Total page size:** < 200KB (sin gráficos)
- **Lighthouse Score:** 95+ en Performance

---

## 🔐 SEO y Meta tags

### Implementado en index.html
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="...">
<title>Arquitectura del Dinero - ...</title>
```

### Recomendado agregar (futuro)
```html
<!-- Open Graph para compartir en redes -->
<meta property="og:title" content="Arquitectura del Dinero">
<meta property="og:description" content="...">
<meta property="og:image" content="/assets/og-image.png">
<meta property="og:url" content="https://...">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
```

---

## 📝 Archivos de configuración

### `.gitignore`
Excluye archivos del sistema y editores.

### `_config.yml`
Configuración opcional de GitHub Pages.

### `deploy.ps1`
Script PowerShell para facilitar el deploy.

---

## 🎯 Flujo de usuario típico

```
1. Usuario llega a index.html
   ↓
2. Lee el concepto de Arquitectura del Dinero
   ↓
3. Explora las 6 cards de herramientas
   ↓
4. Hace clic en una herramienta
   ↓
5. Usa la calculadora / visualización
   ↓
6. Regresa con "← Volver al inicio"
   ↓
7. Prueba otra herramienta
   ↓
8. Descubre Plata Mía como sistema completo
```

---

## 🔄 Mantenimiento futuro

### Para actualizar datos de inflación:
1. Editar `tools/inflacion.html` → objeto `datosInflacion`
2. Editar `tools/conversor-inflacion.html` → objeto `inflacionHistorica`

### Para agregar nueva herramienta:
1. Crear `tools/nueva-herramienta.html`
2. Copiar estructura de herramienta existente
3. Agregar card en `index.html` dentro de `.tools-grid`
4. Actualizar README.md y esta documentación

### Para cambiar estilos globales:
1. Editar variables CSS en `:root` de `css/styles.css`
2. Los cambios se propagan automáticamente

---

**Última actualización:** Diciembre 2025
**Versión:** 1.0.0
