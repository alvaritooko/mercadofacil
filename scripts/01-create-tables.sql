-- Crear tabla de perfiles de usuario (se conecta automáticamente con auth.users)
CREATE TABLE perfiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  plan VARCHAR(20) DEFAULT 'gratuito',
  publicaciones_mes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Crear tabla de productos simplificada
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  estado VARCHAR(50) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  imagenes TEXT[], -- Array de URLs de imágenes
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Función para crear perfil automáticamente cuando se registra un usuario
CREATE OR REPLACE FUNCTION crear_perfil_usuario()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO perfiles (id, nombre)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nombre', 'Usuario'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para crear perfil automáticamente
CREATE TRIGGER trigger_crear_perfil
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION crear_perfil_usuario();

-- Políticas de seguridad RLS
ALTER TABLE perfiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Política para perfiles
CREATE POLICY "Los usuarios pueden ver y editar su propio perfil" ON perfiles
  FOR ALL USING (auth.uid() = id);

-- Política para productos
CREATE POLICY "Cualquiera puede ver productos activos" ON productos
  FOR SELECT USING (activo = true);

CREATE POLICY "Los usuarios pueden crear sus propios productos" ON productos
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Los usuarios pueden editar sus propios productos" ON productos
  FOR UPDATE USING (auth.uid() = usuario_id);

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
