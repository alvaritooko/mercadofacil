# 🛒 MercadoFácil

Una plataforma de marketplace moderna desarrollada con Next.js 15, TypeScript y Tailwind CSS.

## ✨ Características

- 🏪 **Marketplace completo** con productos simulados
- 🔍 **Sistema de filtros avanzado** (categoría, precio, ciudad, estado)
- 👤 **Sistema de autenticación** multi-step (email + SMS + captcha)
- 📱 **Diseño responsive** optimizado para móvil y desktop
- 🖼️ **Galería de imágenes** para productos
- 💳 **Planes de suscripción** (Gratuito y Premium)
- 🎨 **UI moderna** con shadcn/ui y Tailwind CSS
- 🔒 **Avisos de seguridad** y disclaimer legal

## 🚀 Tecnologías

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Base de datos**: Supabase (PostgreSQL)
- **Iconos**: Lucide React
- **Gestión de estado**: React Hooks

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/alvaritooko/mercadofacil.git
cd mercado-facil
```

2. **Instalar dependencias**
```bash
npm install --legacy-peer-deps
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
MercadoFacil/
├── app/                    # Páginas principales (App Router)
│   ├── page.tsx           # Página principal (marketplace)
│   ├── login/page.tsx     # Sistema de autenticación
│   ├── publicar/page.tsx  # Formulario de publicación
│   ├── producto/[id]/     # Detalle de producto
│   └── planes/page.tsx    # Planes de suscripción
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes UI (shadcn/ui)
│   └── disclaimer.tsx    # Aviso legal
├── lib/                  # Utilidades y configuración
│   ├── supabase.ts       # Cliente de Supabase
│   └── utils.ts          # Funciones utilitarias
└── scripts/              # Scripts de base de datos
    └── 01-create-tables.sql
```

## 🎯 Funcionalidades

### Página Principal
- Grid de productos con información detallada
- Filtros avanzados (búsqueda, categoría, precio, ciudad, estado)
- Diseño responsive con sidebar de filtros
- Formato de precios en pesos argentinos

### Sistema de Autenticación
- Registro multi-step (datos → email → SMS → captcha)
- Login/Registro en una sola página
- Validación de campos requeridos

### Publicación de Productos
- Formulario completo para publicar productos
- Galería de imágenes (hasta 5 fotos)
- Campos obligatorios y opcionales
- Sección premium con promoción de planes

### Detalle de Producto
- Galería de imágenes con navegación
- Información completa del producto y vendedor
- Botones de contacto (WhatsApp, Email)
- Productos relacionados

### Planes de Suscripción
- Plan Gratuito: 1 publicación/semana, 3 fotos
- Plan Premium: Publicaciones ilimitadas, 5 fotos, destacado
- Comparación detallada de características

## 🗄️ Base de Datos

### Tablas principales:
- `usuarios`: Información de usuarios y planes
- `productos`: Publicaciones con metadatos
- `categorias`: Categorías de productos
- `imagenes_producto`: Galería de imágenes
- `pagos`: Historial de transacciones

### Características:
- UUIDs para IDs únicos
- Relaciones con claves foráneas
- Índices para optimizar consultas
- Timestamps automáticos

## 🎨 Diseño y UX

- **Sistema de diseño** consistente con shadcn/ui
- **Variantes** de componentes (button, card, etc.)
- **Accesibilidad** integrada
- **Responsive design** nativo
- **Estados de carga** y feedback visual
- **Formularios** con validación
- **Avisos de seguridad** prominentes

## 🔒 Seguridad

- **Disclaimer legal** claro sobre responsabilidades
- **Verificación multi-factor** (email + SMS)
- **Captcha** en registro
- **Validación** de datos de entrada
- **Avisos** sobre transacciones seguras

## 💰 Modelo de Negocio

### Planes de suscripción:
- **Gratuito**: Limitado pero funcional
- **Premium**: Sin límites, destacado, soporte prioritario

### Monetización:
- Suscripciones mensuales
- Múltiples métodos de pago
- Precios en pesos argentinos

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint
```

## 📝 Estado del Proyecto

### ✅ Funcional:
- Interfaz completa y funcional
- Sistema de filtros avanzado
- Formularios de publicación
- Diseño responsive
- Base de datos configurada

### 🔄 Pendiente de implementar:
- Conexión real con Supabase
- Autenticación funcional
- Subida de imágenes real
- Sistema de pagos
- Notificaciones
- Chat entre usuarios

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Proyecto**: [MercadoFácil](https://github.com/alvaritooko/mercadofacil)
- **Issues**: [GitHub Issues](https://github.com/alvaritooko/mercadofacil/issues)

---

⭐ **¡Dale una estrella si te gustó el proyecto!** 