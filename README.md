# 🏗️ Arquitectura del Dinero

**Diseñá, medí y optimizá tu sistema financiero personal**

Sitio web estático tipo hub que centraliza herramientas de finanzas personales, explicando el concepto de Arquitectura del Dinero y ofreciendo accesos claros a cada herramienta educativa.

## 🎯 Concepto

> **El dinero no se administra: se diseña.**

Arquitectura del Dinero propone tratar las finanzas personales como un sistema: con estructura, métricas, simulaciones y decisiones conscientes.

## 🧰 Herramientas incluidas

### 1. 💰 Plata Mía ⭐
**Herramienta principal** - Gestión completa de finanzas personales
- Sistema integral de Arquitectura del Dinero
- Sin conexión a bancos - Privacidad total
- Input manual = conciencia financiera
- **[Visitar Plata Mía](https://web.platamia.com.ar)**

### 2. 📈 Cálculo de Inversión - Interés Compuesto
Simulá cómo crece una inversión en el tiempo considerando:
- Capital inicial
- Aportes mensuales
- Tasa de interés anual
- Visualización gráfica del crecimiento

### 3. 🎯 Cálculo de Retiro
Estimá cuánto capital necesitás para retirarte:
- Gasto mensual deseado
- Tasa de retiro y rendimiento
- Proyección de años de cobertura
- Ajuste por inflación

### 4. 🏠 ¿Compro o alquilo?
Comparación financiera entre:
- Comprar una propiedad
- Alquilar e invertir la diferencia
- Análisis a largo plazo con gráficos

### 5. 📊 Inflación - Visualización histórica
Visualizá la inflación a lo largo del tiempo:
- Datos históricos Argentina, USA, Global
- Inflación anual vs acumulada
- Entendé la pérdida de poder adquisitivo

### 6. 💱 Conversor de Inflación
Convertí valores del pasado a precios actuales:
- Soporta pesos argentinos (ARS) y dólares (USD)
- Calculá inflación acumulada entre años
- Visualizá el impacto real de la inflación

## 🚀 Deploy en GitHub Pages

### Opción 1: Usar GitHub Desktop o Git CLI

1. **Crear repositorio en GitHub**
   ```bash
   # En la carpeta del proyecto
   git init
   git add .
   git commit -m "Initial commit: Arquitectura del Dinero"
   ```

2. **Conectar con GitHub**
   ```bash
   git remote add origin https://github.com/TU_USUARIO/arquitectura-del-dinero.git
   git branch -M main
   git push -u origin main
   ```

3. **Activar GitHub Pages**
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / root
   - Save

4. **Tu sitio estará disponible en:**
   ```
   https://TU_USUARIO.github.io/arquitectura-del-dinero/
   ```

### Opción 2: Cargar archivos manualmente

1. Crea un nuevo repositorio en GitHub llamado `arquitectura-del-dinero`
2. Sube todos los archivos del proyecto
3. Ve a Settings → Pages
4. Selecciona la rama `main` y carpeta `/root`
5. Guarda y espera unos minutos

## 📁 Estructura del proyecto

```
ArquitecturaDelDinero/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos globales
├── js/
│   └── main.js             # JavaScript principal
├── tools/                  # Herramientas individuales
│   ├── interes-compuesto.html
│   ├── retiro.html
│   ├── compro-o-alquilo.html
│   ├── inflacion.html
│   └── conversor-inflacion.html
├── assets/
│   └── icons/              # Íconos (opcional)
└── README.md               # Este archivo
```

## 🎨 Stack técnico

- **HTML5** - Estructura semántica
- **CSS3** - Diseño minimalista y responsivo
- **JavaScript (Vanilla)** - Lógica de calculadoras
- **Chart.js** - Visualizaciones y gráficos
- **GitHub Pages** - Hosting gratuito

## 🔧 Personalización

### Cambiar colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
    --color-primary: #3b82f6;    /* Azul principal */
    --color-accent: #10b981;     /* Verde acento */
    --color-bg: #0f0f0f;         /* Fondo oscuro */
    /* ... más variables */
}
```

### Actualizar datos de inflación

Los datos históricos están en cada herramienta. Para actualizarlos:
- `tools/inflacion.html` → objeto `datosInflacion`
- `tools/conversor-inflacion.html` → objeto `inflacionHistorica`

### Agregar nuevas herramientas

1. Crea un nuevo archivo en `/tools/tu-herramienta.html`
2. Usa la estructura de las herramientas existentes
3. Agrega una card en `index.html` dentro de `.tools-grid`

## 📝 Futuro (roadmap)

- [ ] Agregar más herramientas financieras
- [ ] Artículos conceptuales sobre Arquitectura del Dinero
- [ ] Dominio propio (ej: arquitecturadeldinero.com)
- [ ] Modo claro/oscuro
- [ ] Exportar resultados como PDF
- [ ] API para datos de inflación en tiempo real

## 👤 Autor

**Dario Lamy**

- [Plata Mía](https://web.platamia.com.ar)
- [GitHub](https://github.com/dariolamy)

## ⚖️ Disclaimer

Todas las herramientas son **educativas** y los resultados son **estimaciones**. 

**No constituyen asesoramiento financiero profesional.**

Para decisiones financieras importantes, consultá con un asesor certificado.

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

**Hecho con 🧠 + ⚙️ - Ingeniería aplicada a finanzas personales**
