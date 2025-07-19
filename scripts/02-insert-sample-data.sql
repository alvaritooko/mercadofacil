-- Insertar usuarios de ejemplo
INSERT INTO usuarios (id, email, nombre, telefono, email_verificado, telefono_verificado, plan) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'carlos.mendoza@email.com', 'Carlos Mendoza', '+54 11 1234-5678', true, true, 'premium'),
('550e8400-e29b-41d4-a716-446655440002', 'ana.lopez@email.com', 'Ana López', '+54 351 987-6543', true, true, 'gratuito'),
('550e8400-e29b-41d4-a716-446655440003', 'miguel.rodriguez@email.com', 'Miguel Rodríguez', '+54 341 555-1234', true, false, 'gratuito'),
('550e8400-e29b-41d4-a716-446655440004', 'laura.perez@email.com', 'Laura Pérez', '+54 261 777-8888', true, true, 'premium'),
('550e8400-e29b-41d4-a716-446655440005', 'david.sanchez@email.com', 'David Sánchez', '+54 221 444-5555', true, false, 'gratuito');

-- Insertar productos de ejemplo
INSERT INTO productos (id, usuario_id, titulo, descripcion, precio, categoria_id, estado, ciudad, codigo_postal, telefono_contacto, email_contacto, activo, destacado, vistas) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'iPhone 13 Pro Max 256GB', 'iPhone 13 Pro Max de 256GB en excelente estado. Usado por solo 8 meses, siempre con funda y protector de pantalla. Incluye: iPhone, cargador original, cable Lightning, caja original, funda Apple y protector instalado. Batería al 95%. Sin golpes ni rayones. Funciona perfectamente. Motivo de venta: Cambio por modelo más reciente.', 850000, 1, 'Como nuevo', 'Buenos Aires', '1425', '+54 11 1234-5678', 'carlos.m@email.com', true, true, 156),

('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Bicicleta de Montaña Trek', 'Bicicleta de montaña Trek en muy buen estado. Ideal para principiantes o uso recreativo. Incluye luces LED, canasto trasero y candado. Mantenimiento reciente. Motivo de venta: Cambio por bicicleta de ruta.', 320000, 5, 'Buen estado', 'Córdoba', '5000', '+54 351 987-6543', 'ana.l@email.com', true, false, 23),

('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Sofá 3 Plazas Cuero', 'Sofá de 3 plazas en cuero sintético. Color marrón oscuro, muy cómodo. Incluye cojines decorativos. Perfecto para sala de estar. Motivo de venta: Mudanza.', 180000, 2, 'Usado', 'Rosario', '2000', '+54 341 555-1234', 'miguel.r@email.com', true, false, 12),

('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Laptop Gaming ASUS ROG', 'Laptop gaming ASUS ROG Strix G15. RTX 3060, 16GB RAM, 512GB SSD, Ryzen 7 5800H. Excelente para gaming y trabajo. Incluye mouse gaming y mochila. Motivo de venta: Actualización.', 450000, 1, 'Nuevo', 'Mendoza', '5500', '+54 261 777-8888', 'laura.p@email.com', true, true, 67),

('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Mesa de Comedor Madera', 'Mesa de comedor de madera maciza. 6 sillas incluidas. Color natural, muy elegante. Perfecta para familia. Motivo de venta: Cambio de decoración.', 95000, 2, 'Buen estado', 'La Plata', '1900', '+54 221 444-5555', 'david.s@email.com', true, false, 18),

('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 'Cámara Canon EOS R6', 'Cámara Canon EOS R6 mirrorless. Incluye lente 24-105mm f/4L. Excelente para fotografía profesional. Incluye trípode, flash y mochila. Motivo de venta: Cambio de sistema.', 680000, 1, 'Como nuevo', 'Mar del Plata', '7600', '+54 11 1234-5678', 'carlos.m@email.com', true, false, 34),

('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'Zapatillas Nike Air Max', 'Zapatillas Nike Air Max 270. Talla 42, color blanco y negro. Usadas solo 3 veces. Incluye caja original. Motivo de venta: No me quedaron bien.', 85000, 3, 'Nuevo', 'Tucumán', '4000', '+54 351 987-6543', 'ana.l@email.com', true, false, 29),

('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440003', 'Guitarra Eléctrica Fender', 'Guitarra eléctrica Fender Stratocaster. Incluye amplificador pequeño y cable. Perfecta para principiantes. Motivo de venta: Cambio de instrumento.', 220000, 6, 'Buen estado', 'Salta', '4400', '+54 341 555-1234', 'miguel.r@email.com', true, false, 41),

('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440004', 'Microondas Samsung 28L', 'Microondas Samsung de 28 litros. Funciones automáticas, grill incluido. Excelente estado. Incluye manual y garantía. Motivo de venta: Duplicado.', 65000, 2, 'Como nuevo', 'Neuquén', '8300', '+54 261 777-8888', 'laura.p@email.com', true, false, 15),

('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440005', 'Tablet Samsung Galaxy Tab', 'Tablet Samsung Galaxy Tab S7. 128GB, WiFi. Incluye funda y stylus. Perfecta para trabajo y entretenimiento. Motivo de venta: Cambio por iPad.', 120000, 1, 'Usado', 'Santa Fe', '3000', '+54 221 444-5555', 'david.s@email.com', true, false, 22);

-- Insertar imágenes de ejemplo para los productos
INSERT INTO imagenes_producto (producto_id, url, orden) VALUES
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=400&width=400&text=📱+iPhone+Frontal', 1),
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=400&width=400&text=📱+iPhone+Trasero', 2),
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=400&width=400&text=📱+iPhone+Lateral', 3),
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=400&width=400&text=📦+Accesorios', 4),
('660e8400-e29b-41d4-a716-446655440001', '/placeholder.svg?height=400&width=400&text=📋+Caja+Original', 5),

('660e8400-e29b-41d4-a716-446655440002', '/placeholder.svg?height=400&width=400&text=🚴+Bicicleta+Frontal', 1),
('660e8400-e29b-41d4-a716-446655440002', '/placeholder.svg?height=400&width=400&text=🚴+Bicicleta+Lateral', 2),
('660e8400-e29b-41d4-a716-446655440002', '/placeholder.svg?height=400&width=400&text=🚴+Bicicleta+Detalle', 3),

('660e8400-e29b-41d4-a716-446655440003', '/placeholder.svg?height=400&width=400&text=🛋️+Sofá+Completo', 1),
('660e8400-e29b-41d4-a716-446655440003', '/placeholder.svg?height=400&width=400&text=🛋️+Sofá+Detalle', 2),

('660e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=400&width=400&text=💻+Laptop+Abierta', 1),
('660e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=400&width=400&text=💻+Laptop+Cerrada', 2),
('660e8400-e29b-41d4-a716-446655440004', '/placeholder.svg?height=400&width=400&text=💻+Accesorios', 3),

('660e8400-e29b-41d4-a716-446655440005', '/placeholder.svg?height=400&width=400&text=🪑+Mesa+Comedor', 1),
('660e8400-e29b-41d4-a716-446655440005', '/placeholder.svg?height=400&width=400&text=🪑+Sillas', 2);

-- Insertar algunos favoritos de ejemplo
INSERT INTO favoritos (usuario_id, producto_id) VALUES
('550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440004'),
('550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001'),
('550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002'),
('550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440006'),
('550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440008');

-- Insertar algunos mensajes de ejemplo
INSERT INTO mensajes (remitente_id, destinatario_id, producto_id, mensaje) VALUES
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'Hola! ¿El iPhone aún está disponible? ¿Podrías hacer un descuento?'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '¿La bicicleta incluye casco? ¿Cuál es el precio mínimo?'),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '¿El sofá tiene manchas? ¿Puedo verlo en persona?'),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', '¿La laptop tiene garantía? ¿Puedo probarla antes de comprar?'); 