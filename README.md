📡 Sistema de Gestión de Sensores IoT

Sistema web que permite la gestión de empresas, proyectos, nodos y sensores IoT, con recepción de datos en tiempo real, visualización en dashboards y configuración de alertas inteligentes.

---

🚀 Funcionalidades principales

- Autenticación con JWT y roles (Administrador / Usuario)
- Gestión de empresas, proyectos, nodos y sensores
- Asociación de tipos de datos a sensores
- Registro automático de lecturas cada 2 segundos
- Visualización dinámica de los datos en gráficos
- Configuración de umbrales por tipo de sensor
- API RESTful documentada con Swagger
- Interfaz moderna con Angular y Angular Material

---

🏗️ Tecnologías utilizadas

Backend:

- Node.js + Express.js
- Prisma ORM
- MySQL
- MQTT (Mosquitto)
- JWT para autenticación
- Swagger para documentación

Frontend:

- Angular 19
- Chart.js para gráficos
- Angular Material

---

📦 Instalación

1. Clonar el proyecto

   git clone https://github.com/tu-usuario/tu-repositorio.git  
   cd tu-repositorio

2. Backend

   cd backend  
   npm install  
   npx prisma generate  
   npx prisma migrate dev --name init  
   npm run dev

3. Frontend

   cd frontend  
   npm install  
   ng serve

---

🔐 Variables de entorno `.env`

Crea un archivo `.env` en la carpeta `backend`:

eje:
DATABASE_URL=mysql://usuario:contraseña@localhost:3306/iot_system
JWT_SECRET=miClaveSuperSecreta
MQTT_BROKER_URL=mqtt://localhost:1883

---

📘 Documentación de la API

Una vez iniciado el backend, visita:  
http://localhost:3000/api-docs

---

📊 Visualización de datos

Las lecturas de los sensores se registran automáticamente cada 2 segundos y se actualizan en tiempo real en los dashboards del usuario.

---

👥 Roles del sistema

| Rol           | Permisos principales                                        |
| ------------- | ----------------------------------------------------------- |
| Administrador | Gestión completa del sistema (empresas, nodos, sensores)    |
| Usuario       | Acceso a dashboards de su proyecto y configuración personal |

---

🔔 Funcionalidades futuras

- Integración de algoritmos de predicción de fallos con ML
- Alertas en tiempo real por correo o notificaciones push
- Exportación de reportes en PDF
