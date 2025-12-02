# ⭐ TaskMaster Pro  
Gestor de tareas fullstack con autenticación, filtros avanzados, dashboard moderno y arquitectura profesional basada en **React + Node.js + Sequelize + MySQL**.

---


# 📌 Descripción General

**TaskMaster Pro** es una aplicación completa para la gestión de tareas personales.  
Incluye inicio de sesión mediante **JWT**, CRUD completo de tareas, filtros avanzados, ordenamientos, buscador en tiempo real y una interfaz moderna construida con **React + TailwindCSS**.

Este proyecto fue desarrollado como entrega final académica siguiendo arquitectura cliente-servidor con deploy profesional en **Vercel + Railway**.

---

# 🧠 Características Principales

✔ Autenticación con JWT  
✔ Registro e inicio de sesión  
✔ CRUD completo de tareas  
✔ Filtros por prioridad, estado y fecha  
✔ Ordenamiento por fecha límite  
✔ Buscador en tiempo real  
✔ Dashboard moderno y responsivo  
✔ API REST en Express  
✔ Base de datos MySQL con Sequelize  
✔ Compatible con Railway y Vercel  

---

# 🏗️ Arquitectura del Proyecto

/TaskMasterPro
├── frontend/ → React + Vite + TailwindCSS
└── backend/ → Node.js + Express + Sequelize + JWT


## 🛰️ Diagrama de Flujo



┌─────────────┐ ┌─────────────────────────┐ ┌──────────────┐
│ Frontend │ │ Backend │ │ MySQL │
│ React/Vite │ <----> │ Express + JWT + ORM │ <----> │ Sequelize │
└─────────────┘ └─────────────────────────┘ └──────────────┘


---

# 📦 Tecnologías Utilizadas

## 🖥️ Frontend
- React 18  
- React Router  
- Vite  
- TailwindCSS  
- CSS personalizado  

## 🖧 Backend
- Node.js  
- Express  
- Sequelize  
- JWT (jsonwebtoken)  
- bcryptjs  
- express-validator  
- CORS  
- Dotenv  

## 🗄️ Base de Datos
- MySQL (Railway)  
- Sequelize ORM  

---

# ⚙️ Instalación y Ejecución Local

## 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/usuario/taskmasterpro.git
cd taskmasterpro

🎨 Frontend
Instalar dependencias
cd frontend
npm install

Ejecutar en modo desarrollo
npm run dev


Acceder a:
👉 http://localhost:5173

🖧 Backend
Instalar dependencias
cd backend
npm install

Crear archivo .env

Dentro de backend/ crea:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=taskmaster
DB_PORT=3306

JWT_SECRET=secret_key
PORT=3000

Ejecutar backend

Modo desarrollo:

npm run dev


Modo producción:

npm start