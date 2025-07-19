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
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de categorías
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  icono VARCHAR(50),
  descripcion TEXT,
  activa BOOLEAN DEFAULT TRUE
);

-- Insertar categorías
INSERT INTO categorias (nombre, slug, icono, descripcion) VALUES
('Electrónica', 'electronica', '📱', 'Teléfonos, computadoras, tablets y más'),
('Hogar y Jardín', 'hogar', '🏠', 'Muebles, decoración, jardín'),
('Ropa y Accesorios', 'ropa', '👕', 'Ropa, calzado, accesorios'),
('Deportes', 'deportes', '⚽', 'Equipos deportivos, ropa deportiva'),
('Vehículos', 'vehiculos', '🚗', 'Carros, motos, bicicletas'),
('Libros y Música', 'libros', '📚', 'Libros, música, instrumentos'),
('Otros', 'otros', '📦', 'Otros productos');

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
  moneda VARCHAR(3) DEFAULT 'ARS',
  estado VARCHAR(20) DEFAULT 'pendiente', -- 'pendiente', 'completado', 'fallido'
  metodo_pago VARCHAR(50),
  referencia_externa VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de favoritos
CREATE TABLE favoritos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, producto_id)
);

-- Crear tabla de mensajes
CREATE TABLE mensajes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  remitente_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  destinatario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
  producto_id UUID REFERENCES productos(id) ON DELETE CASCADE,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_productos_ciudad ON productos(ciudad);
CREATE INDEX idx_productos_precio ON productos(precio);
CREATE INDEX idx_productos_created_at ON productos(created_at);
CREATE INDEX idx_productos_activo ON productos(activo);
CREATE INDEX idx_productos_usuario ON productos(usuario_id);
CREATE INDEX idx_imagenes_producto ON imagenes_producto(producto_id);
CREATE INDEX idx_favoritos_usuario ON favoritos(usuario_id);
CREATE INDEX idx_mensajes_remitente ON mensajes(remitente_id);
CREATE INDEX idx_mensajes_destinatario ON mensajes(destinatario_id);

-- Crear función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para actualizar updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_productos_updated_at BEFORE UPDATE ON productos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Crear función para contar vistas
CREATE OR REPLACE FUNCTION incrementar_vistas()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE productos SET vistas = vistas + 1 WHERE id = NEW.id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para incrementar vistas (se ejecutará desde el frontend)
-- CREATE TRIGGER incrementar_vistas_trigger BEFORE UPDATE ON productos FOR EACH ROW EXECUTE FUNCTION incrementar_vistas();

-- Habilitar Row Level Security (RLS)
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE imagenes_producto ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para productos (lectura pública, escritura autenticada)
CREATE POLICY "Productos visibles públicamente" ON productos FOR SELECT USING (activo = true);
CREATE POLICY "Usuarios pueden crear productos" ON productos FOR INSERT WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "Usuarios pueden editar sus productos" ON productos FOR UPDATE USING (auth.uid() = usuario_id);
CREATE POLICY "Usuarios pueden eliminar sus productos" ON productos FOR DELETE USING (auth.uid() = usuario_id);

-- Políticas RLS para usuarios
CREATE POLICY "Usuarios pueden ver su propio perfil" ON usuarios FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Usuarios pueden actualizar su perfil" ON usuarios FOR UPDATE USING (auth.uid() = id);

-- Políticas RLS para favoritos
CREATE POLICY "Usuarios pueden ver sus favoritos" ON favoritos FOR SELECT USING (auth.uid() = usuario_id);
CREATE POLICY "Usuarios pueden agregar favoritos" ON favoritos FOR INSERT WITH CHECK (auth.uid() = usuario_id);
CREATE POLICY "Usuarios pueden eliminar sus favoritos" ON favoritos FOR DELETE USING (auth.uid() = usuario_id);

-- Políticas RLS para mensajes
CREATE POLICY "Usuarios pueden ver mensajes enviados" ON mensajes FOR SELECT USING (auth.uid() = remitente_id);
CREATE POLICY "Usuarios pueden ver mensajes recibidos" ON mensajes FOR SELECT USING (auth.uid() = destinatario_id);
CREATE POLICY "Usuarios pueden enviar mensajes" ON mensajes FOR INSERT WITH CHECK (auth.uid() = remitente_id);
