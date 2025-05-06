-- Tabla: Usuarios
CREATE TABLE Usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL,
    rol TEXT CHECK (rol IN ('admin', 'tecnico', 'visualizador')) NOT NULL DEFAULT 'visualizador',
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Sensores
CREATE TABLE Sensores (
    id_sensor SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('voltaje', 'corriente', 'potencia', 'temperatura', 'otros')) NOT NULL,
    modelo TEXT,
    ubicacion TEXT,
    estado TEXT CHECK (estado IN ('activo', 'inactivo', 'mantenimiento')) NOT NULL DEFAULT 'activo',
    fecha_instalacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Microcontroladores
CREATE TABLE Microcontroladores (
    id_microcontrolador SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    direccion_ip TEXT,
    protocolo TEXT CHECK (protocolo IN ('MQTT', 'HTTP')) NOT NULL,
    estado TEXT CHECK (estado IN ('activo', 'inactivo')) NOT NULL DEFAULT 'activo',
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Sensor_Microcontrolador (Relación Sensores-Microcontroladores)
CREATE TABLE Sensor_Microcontrolador (
    id_sensor INT NOT NULL,
    id_microcontrolador INT NOT NULL,
    fecha_conexion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_sensor, id_microcontrolador),
    FOREIGN KEY (id_sensor) REFERENCES Sensores(id_sensor) ON DELETE CASCADE,
    FOREIGN KEY (id_microcontrolador) REFERENCES Microcontroladores(id_microcontrolador) ON DELETE CASCADE
);

-- Tabla: Datos_Sensores
CREATE TABLE Datos_Sensores (
    id_dato BIGSERIAL PRIMARY KEY,
    id_sensor INT NOT NULL,
    valor FLOAT NOT NULL,
    unidad TEXT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado_lectura TEXT CHECK (estado_lectura IN ('normal', 'anomalo', 'pendiente')) NOT NULL DEFAULT 'pendiente',
    FOREIGN KEY (id_sensor) REFERENCES Sensores(id_sensor) ON DELETE CASCADE
);
CREATE INDEX idx_sensor_fecha ON Datos_Sensores(id_sensor, fecha_hora);

-- Tabla: Modelos_ML
CREATE TABLE Modelos_ML (
    id_modelo SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    tipo TEXT CHECK (tipo IN ('regresion', 'clasificacion', 'deteccion_anomalias')) NOT NULL,
    algoritmo TEXT NOT NULL,
    fecha_entrenamiento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ruta_archivo TEXT,
    metricas JSONB
);

-- Tabla: Predicciones_ML
CREATE TABLE Predicciones_ML (
    id_prediccion BIGSERIAL PRIMARY KEY,
    id_modelo INT NOT NULL,
    id_dato BIGINT NOT NULL,
    prediccion TEXT NOT NULL,
    probabilidad FLOAT,
    fecha_prediccion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_modelo) REFERENCES Modelos_ML(id_modelo) ON DELETE CASCADE,
    FOREIGN KEY (id_dato) REFERENCES Datos_Sensores(id_dato) ON DELETE CASCADE
);
CREATE INDEX idx_dato ON Predicciones_ML(id_dato);

-- Tabla: Alertas
CREATE TABLE Alertas (
    id_alerta SERIAL PRIMARY KEY,
    id_dato BIGINT,
    id_prediccion BIGINT,
    tipo TEXT CHECK (tipo IN ('critica', 'advertencia', 'informativa')) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado TEXT CHECK (estado IN ('pendiente', 'resuelta', 'ignorada')) NOT NULL DEFAULT 'pendiente',
    FOREIGN KEY (id_dato) REFERENCES Datos_Sensores(id_dato) ON DELETE SET NULL,
    FOREIGN KEY (id_prediccion) REFERENCES Predicciones_ML(id_prediccion) ON DELETE SET NULL
);

-- Tabla: Notificaciones
CREATE TABLE Notificaciones (
    id_notificacion SERIAL PRIMARY KEY,
    id_alerta INT NOT NULL,
    id_usuario INT NOT NULL,
    canal TEXT CHECK (canal IN ('correo', 'telegram', 'web')) NOT NULL,
    fecha_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    estado TEXT CHECK (estado IN ('enviado', 'fallido', 'pendiente')) NOT NULL DEFAULT 'pendiente',
    FOREIGN KEY (id_alerta) REFERENCES Alertas(id_alerta) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE CASCADE
);

-- Tabla: Paneles_Solares
CREATE TABLE Paneles_Solares (
    id_panel SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    potencia_nominal FLOAT NOT NULL,
    ubicacion TEXT,
    fecha_instalacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Panel_Sensor (Relación Paneles-Sensores)
CREATE TABLE Panel_Sensor (
    id_panel INT NOT NULL,
    id_sensor INT NOT NULL,
    fecha_asignacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_panel, id_sensor),
    FOREIGN KEY (id_panel) REFERENCES Paneles_Solares(id_panel) ON DELETE CASCADE,
    FOREIGN KEY (id_sensor) REFERENCES Sensores(id_sensor) ON DELETE CASCADE
);

-- Tabla: Logs_Sistema
CREATE TABLE Logs_Sistema (
    id_log BIGSERIAL PRIMARY KEY,
    tipo TEXT CHECK (tipo IN ('error', 'info', 'advertencia')) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario) ON DELETE SET NULL
);

-- Insertar datos iniciales de ejemplo
INSERT INTO Usuarios (nombre, correo, contraseña, rol) 
VALUES ('Admin Principal', 'admin@fotovoltaico.com', '$2b$12$hashedPassword', 'admin');

INSERT INTO Sensores (nombre, tipo, modelo, ubicacion, estado, fecha_instalacion)
VALUES ('Sensor Voltaje Panel 1', 'voltaje', 'INA219', 'Tejado Norte', 'activo', '2025-04-30 10:00:00');

INSERT INTO Microcontroladores (nombre, direccion_ip, protocolo, estado)
VALUES ('ESP32 Panel 1', '192.168.1.100', 'MQTT', 'activo');

INSERT INTO Sensor_Microcontrolador (id_sensor, id_microcontrolador)
VALUES (1, 1);

INSERT INTO Paneles_Solares (nombre, potencia_nominal, ubicacion)
VALUES ('Panel Solar Tejado 1', 300.5, 'Tejado Norte');

INSERT INTO Panel_Sensor (id_panel, id_sensor)
VALUES (1, 1);