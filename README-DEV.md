# 🛠️ Guía de Desarrollo - MercadoFácil

## 🚀 Configuración del Entorno

### Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MercadoFácil
```

## 📦 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start

# Verificar tipos TypeScript
npm run type-check

# Linting
npm run lint

# Limpiar caché
npm run clean
```

## 🏗️ Estructura del Proyecto

```
MercadoFacil/
├── app/                    # Páginas (App Router)
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   ├── login/             # Autenticación
│   ├── publicar/          # Publicar productos
│   ├── producto/[id]/     # Detalle de producto
│   └── planes/            # Planes de suscripción
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes UI (shadcn/ui)
│   └── disclaimer.tsx    # Aviso legal
├── lib/                  # Utilidades
│   ├── supabase.ts       # Cliente Supabase
│   └── utils.ts          # Funciones utilitarias
├── hooks/                # Custom hooks
├── scripts/              # Scripts SQL
└── public/               # Assets estáticos
```

## 🎨 Convenciones de Código

### TypeScript
- Usar tipos estrictos
- Evitar `any`
- Usar interfaces para objetos complejos

### React
- Componentes funcionales con hooks
- Props tipadas
- Nombres descriptivos

### CSS/Tailwind
- Usar clases de Tailwind
- Componentes reutilizables
- Diseño responsive

## 🔧 Herramientas de Desarrollo

- **TypeScript**: Tipado estático
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Tailwind CSS**: Framework CSS
- **shadcn/ui**: Componentes UI

## 🚀 Despliegue

### Vercel (Recomendado)
1. Conectar repositorio de GitHub
2. Configurar variables de entorno
3. Desplegar automáticamente

### Netlify
1. Conectar repositorio
2. Configurar build command: `npm run build`
3. Configurar publish directory: `.next`

## 📝 Notas de Desarrollo

- El proyecto usa Next.js 15 con App Router
- Supabase para backend y autenticación
- Componentes UI basados en Radix UI
- Diseño responsive y accesible
- SEO optimizado

## 🐛 Solución de Problemas

### Error de permisos en .next
```bash
# Terminar procesos Node.js
taskkill /f /im node.exe

# Eliminar carpeta .next
Remove-Item -Recurse -Force .next

# Limpiar caché
npm cache clean --force
```

### Conflictos de dependencias
```bash
npm install --legacy-peer-deps
```

### Error de TypeScript
```bash
npm run type-check
``` 