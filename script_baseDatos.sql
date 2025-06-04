
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    created_at TIMESTAMP(6) DEFAULT now()
);

CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_role_id INT REFERENCES user_roles(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    company_id INT REFERENCES companies(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    created_at TIMESTAMP(6) DEFAULT now()
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    company_id INT REFERENCES companies(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    created_at TIMESTAMP(6) DEFAULT now()
);

CREATE TABLE nodes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    project_id INT REFERENCES projects(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    created_at TIMESTAMP(6) DEFAULT now()
);

CREATE TABLE sensor_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    unit VARCHAR(50) NOT NULL
);

CREATE TABLE sensors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type_id INT REFERENCES sensor_types(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    node_id INT REFERENCES nodes(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    created_at TIMESTAMP(6) DEFAULT now()
);

CREATE TABLE thresholds (
    id SERIAL PRIMARY KEY,
    sensor_id INT REFERENCES sensors(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    min_value FLOAT,
    max_value FLOAT
);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    level VARCHAR(50),
    sensor_id INT REFERENCES sensors(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
    created_at TIMESTAMP(6) DEFAULT now()
);

-- 🚀 SENSOR_READINGS como tabla particionada
CREATE TABLE sensor_readings (
  id SERIAL,
  sensor_id INT REFERENCES sensors(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  timestamp TIMESTAMP(6) NOT NULL DEFAULT now(),
  temperature FLOAT NOT NULL,
  humidity FLOAT NOT NULL,
  PRIMARY KEY (id, timestamp)
) PARTITION BY RANGE (timestamp);