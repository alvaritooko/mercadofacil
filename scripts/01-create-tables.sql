-- Crear tabla de usuarios
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nombre VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  email_verificado BOOLEAN DEFAULT FALSE,
  telefono_verificado BOOLEAN DEFAULT FALSE,
  plan VARCHAR(20) DEFAULT 'gratuito', -- 'gratuito' o 'premium'
  fecha_plan TIMESTAMP,
  publicaciones_mes INTEGER DEFAULT 0,
  ultima_publicacion TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de categorías
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

-- Insertar categorías
INSERT INTO categorias (nombre, slug) VALUES
('Electrónica', 'electronica'),
('Hogar y Jardín', 'hogar'),
('Ropa y Accesorios', 'ropa'),
('Deportes', 'deportes'),
('Vehículos', 'vehiculos'),
('Libros y Música', 'libros'),
('Otros', 'otros');

-- Crear tabla de productos
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria_id INTEGER REFERENCES categorias(id),
  estado VARCHAR(50) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  codigo_postal VARCHAR(10),
  telefono_contacto VARCHAR(20),
  email_contacto VARCHAR(255),
  activo BOOLEAN DEFAULT TRUE,
  destacado BOOLEAN DEFAULT FALSE,
  vistas INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de imágenes de productos
CREATE TABLE imagenes_producto (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de pagos
CREATE TABLE pagos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  monto DECIMAL(10,2) NOT NULL,
  moneda VARCHAR(3) DEFAULT 'COP',
  estado VARCHAR(20) DEFAULT 'pendiente', -- 'pendiente', 'completado', 'fallido'
  metodo_pago VARCHAR(50),
  referencia_externa VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_productos_ciudad ON productos(ciudad);
CREATE INDEX idx_productos_precio ON productos(precio);
CREATE INDEX idx_productos_created_at ON productos(created_at);
CREATE INDEX idx_productos_activo ON productos(activo);
