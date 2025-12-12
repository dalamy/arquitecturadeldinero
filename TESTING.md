# ✅ Checklist de pruebas - Arquitectura del Dinero

## Pre-deploy checklist

### 📁 Estructura de archivos
- [x] `index.html` existe
- [x] `css/styles.css` existe
- [x] `js/main.js` existe
- [x] `tools/interes-compuesto.html` existe
- [x] `tools/retiro.html` existe
- [x] `tools/compro-o-alquilo.html` existe
- [x] `tools/inflacion.html` existe
- [x] `tools/conversor-inflacion.html` existe
- [x] `README.md` existe
- [x] `.gitignore` existe
- [x] `_config.yml` existe

---

## 🏠 Página principal (`index.html`)

### Visual
- [ ] Hero section se ve correctamente
- [ ] Título "Arquitectura del Dinero" visible
- [ ] Subtítulo legible
- [ ] Botón "Explorar herramientas" funciona (scroll a #herramientas)
- [ ] Sección "El concepto" legible
- [ ] 6 cards visibles en grid
- [ ] Card "Plata Mía" tiene badge ⭐
- [ ] Footer con links a GitHub y Plata Mía

### Funcionalidad
- [ ] Smooth scroll funciona
- [ ] Cards tienen hover effect
- [ ] Links a herramientas funcionan
- [ ] Link externo a Plata Mía abre en nueva pestaña
- [ ] Links del footer funcionan

### Responsive
- [ ] Se ve bien en desktop (1920px)
- [ ] Se ve bien en tablet (768px)
- [ ] Se ve bien en móvil (375px)
- [ ] Grid se adapta a 1 columna en móvil
- [ ] Texto legible en todas las resoluciones

---

## 📈 Interés Compuesto (`tools/interes-compuesto.html`)

### Visual
- [ ] Header con botón "Volver" visible
- [ ] Formulario correctamente estructurado
- [ ] Labels claros
- [ ] Inputs con valores por defecto

### Funcionalidad
- [ ] Botón "Calcular" funciona
- [ ] Resultados se muestran correctamente
- [ ] Gráfico se genera (Chart.js cargado)
- [ ] Gráfico tiene 3 líneas (Balance, Capital, Intereses)
- [ ] Formato de moneda correcto ($)
- [ ] Números formateados con separador de miles

### Casos de prueba
```
Test 1: Valores por defecto
Capital: $100,000
Aporte: $10,000
Tasa: 8%
Años: 10
✓ Resultado esperado: ~$2,000,000

Test 2: Sin aportes
Capital: $1,000,000
Aporte: $0
Tasa: 10%
Años: 20
✓ Resultado esperado: ~$6,727,500

Test 3: Alta tasa
Capital: $50,000
Aporte: $5,000
Tasa: 15%
Años: 15
✓ Resultado verificable manualmente
```

---

## 🎯 Cálculo de Retiro (`tools/retiro.html`)

### Visual
- [ ] Formulario con 5 inputs visible
- [ ] Small texts con hints visibles
- [ ] Resultados estructurados

### Funcionalidad
- [ ] Regla del 4% aplicada correctamente
- [ ] Simulación considera inflación
- [ ] Gráfico muestra declive de capital
- [ ] Muestra años de cobertura
- [ ] "Te falta acumular" o "Ya lo lograste!"

### Casos de prueba
```
Test 1: Retiro básico
Gasto mensual: $200,000
Tasa retiro: 4%
Rendimiento: 6%
Inflación: 3%
✓ Capital objetivo: $60,000,000
✓ Años: 30+

Test 2: Con capital actual
Gasto: $100,000
Capital actual: $30,000,000
✓ Falta acumular calculado correctamente
```

---

## 🏠 ¿Compro o alquilo? (`tools/compro-o-alquilo.html`)

### Visual
- [ ] Formulario dividido en secciones (Comprar/Alquilar/General)
- [ ] Títulos de sección con colores diferentes
- [ ] Grid de resultados (2 columnas)
- [ ] Detalles del análisis visible

### Funcionalidad
- [ ] Calcula patrimonio de compra
- [ ] Calcula capital de alquilar+invertir
- [ ] Determina mejor opción
- [ ] Gráfico comparativo funciona
- [ ] 2 líneas en gráfico claramente diferenciadas

### Casos de prueba
```
Test 1: Comprar es mejor
Propiedad: $50M
Anticipo: $10M
Apreciación: 5%
Alquiler: $300K
Rendimiento: 4%
✓ Comprar debería ganar

Test 2: Alquilar es mejor
Propiedad: $100M
Anticipo: $20M
Apreciación: 2%
Alquiler: $200K
Rendimiento: 12%
✓ Alquilar debería ganar
```

---

## 📊 Visualización de Inflación (`tools/inflacion.html`)

### Visual
- [ ] Selectores de región y tipo visibles
- [ ] Botón "Visualizar" funciona
- [ ] Gráfico de barras se genera
- [ ] Colores de barras varían según intensidad

### Funcionalidad
- [ ] Cambiar región actualiza datos
- [ ] Cambiar a "acumulada" recalcula
- [ ] Promedio 10 años calculado
- [ ] Inflación acumulada total mostrada
- [ ] Gráfico se genera al cargar

### Validación de datos
```
Argentina:
- [ ] Datos 2014-2024 presentes
- [ ] Tasas realistas (alta inflación)
- [ ] Gráfico muestra tendencia alcista

USA:
- [ ] Datos 2014-2024 presentes
- [ ] Tasas bajas (2-8%)
- [ ] Pico en 2022 visible

Global:
- [ ] Datos intermedios
- [ ] Tasas moderadas
```

---

## 💱 Conversor de Inflación (`tools/conversor-inflacion.html`)

### Visual
- [ ] Selectores de año poblados correctamente
- [ ] Resultado con flechas y formato grande
- [ ] Sección explicativa visible

### Funcionalidad
- [ ] Conversión ARS funciona
- [ ] Conversión USD funciona
- [ ] Validación: año destino > año origen
- [ ] Inflación acumulada calculada
- [ ] Inflación promedio anual correcta

### Casos de prueba
```
Test 1: ARS 2014 → 2024
Monto: $100,000
✓ Resultado: ~$1,200,000+
✓ Inflación acumulada: ~1100%+

Test 2: USD 2020 → 2024
Monto: $10,000
✓ Resultado: ~$11,500-12,500
✓ Inflación acumulada: ~15-25%

Test 3: Mismo año
Año origen = Año destino
✓ Debe mostrar error/alerta
```

---

## 🎨 Estilos y diseño

### Consistencia visual
- [ ] Paleta de colores consistente en todas las páginas
- [ ] Tipografía Inter cargada correctamente
- [ ] Botones tienen mismo estilo
- [ ] Cards tienen mismo estilo
- [ ] Hover effects funcionan en todos los elementos
- [ ] Transiciones suaves

### Dark theme
- [ ] Fondo oscuro (#0f0f0f)
- [ ] Texto legible (contraste suficiente)
- [ ] Gráficos visibles en fondo oscuro
- [ ] Bordes sutiles pero visibles

### Responsive
- [ ] Todas las páginas responsive
- [ ] Forms no se rompen en móvil
- [ ] Gráficos se adaptan
- [ ] Botones tocables en móvil (min 44px)

---

## 🔗 Links y navegación

### Links internos
- [ ] index.html → tools/* funcionan
- [ ] tools/* → index.html funcionan
- [ ] Anchor link (#herramientas) funciona

### Links externos
- [ ] Plata Mía abre en nueva pestaña
- [ ] GitHub abre en nueva pestaña
- [ ] CDN Chart.js carga correctamente
- [ ] Google Fonts carga correctamente

---

## ⚡ Performance

### Carga de página
- [ ] index.html carga < 2s
- [ ] Tools cargan < 2s
- [ ] Chart.js carga desde CDN
- [ ] No hay errores 404 en console

### JavaScript
- [ ] No hay errores en console
- [ ] FinanceUtils disponible globalmente
- [ ] Charts se destruyen antes de recrear
- [ ] Validaciones funcionan

### CSS
- [ ] Estilos aplicados correctamente
- [ ] No hay estilos inline innecesarios
- [ ] Variables CSS funcionan

---

## 📱 Browser compatibility

### Navegadores desktop
- [ ] Chrome/Edge (últimas 2 versiones)
- [ ] Firefox (últimas 2 versiones)
- [ ] Safari (últimas 2 versiones)

### Navegadores móvil
- [ ] Chrome Android
- [ ] Safari iOS
- [ ] Samsung Internet

---

## 🚀 GitHub Pages

### Deployment
- [ ] Repositorio creado
- [ ] Archivos subidos
- [ ] GitHub Pages activado
- [ ] URL funciona
- [ ] No hay errores 404

### Configuración
- [ ] `_config.yml` presente
- [ ] `.gitignore` presente
- [ ] README.md informativo

---

## 📊 Analytics (opcional, futuro)

### Setup
- [ ] Google Analytics ID agregado a `_config.yml`
- [ ] Tracking code en todas las páginas
- [ ] Eventos configurados

---

## ✨ Extras

### Documentación
- [x] README.md completo
- [x] GUIA.md con instrucciones de uso
- [x] MAPA.md con estructura
- [x] Este archivo de checklist

### Scripts
- [x] deploy.ps1 para facilitar despliegue

### Futuro
- [ ] Agregar favicon
- [ ] Agregar og:image para compartir
- [ ] Agregar más herramientas
- [ ] Modo claro (opcional)

---

## 🐛 Testing manual final

1. **Abrir index.html en navegador**
   - ¿Se ve bien? ✓ / ✗
   - ¿Links funcionan? ✓ / ✗

2. **Probar cada herramienta**
   - Interés Compuesto: ✓ / ✗
   - Cálculo Retiro: ✓ / ✗
   - Compro o alquilo: ✓ / ✗
   - Inflación: ✓ / ✗
   - Conversor: ✓ / ✗

3. **Revisar responsive**
   - Desktop: ✓ / ✗
   - Tablet: ✓ / ✗
   - Móvil: ✓ / ✗

4. **Verificar console**
   - Sin errores JavaScript: ✓ / ✗
   - Sin errores 404: ✓ / ✗

5. **Probar navegación**
   - Todos los botones "Volver": ✓ / ✗
   - Links externos: ✓ / ✗

---

## ✅ Ready to deploy?

Si todos los checks están ✓, estás listo para:
1. Ejecutar `deploy.ps1`
2. Subir a GitHub
3. Activar GitHub Pages
4. Compartir el link 🎉

---

**Nota:** Este checklist es una guía. Personalizalo según tus necesidades.
