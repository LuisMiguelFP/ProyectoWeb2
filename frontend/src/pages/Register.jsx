import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../lib/api.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // NUEVO: Estado para manejar el mensaje de notificación
  const [message, setMessage] = useState({ text: "", type: "" }); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); // Limpiar mensaje anterior

    if (!name || !email || !password) {
      setMessage({ text: "Por favor, llena todos los campos.", type: "error" });
      return;
    }

    // Llamada a la API para registrar al usuario
    const res = await registerUser({ name, email, password });

    if (res.token) {
      // Mostrar mensaje de éxito por 3 segundos antes de redirigir
      setMessage({ text: "¡Usuario registrado correctamente!", type: "success" });
      setTimeout(() => {
        navigate("/"); 
      }, 3000); // Redirige después de 3 segundos
    } else {
      // Mostrar mensaje de error
      setMessage({ 
        text: res.message || "Error al registrarse. Intenta con otro correo.", 
        type: "error" 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      <div className="bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-xl border border-green-500/30 transition duration-300 hover:scale-[1.01] neon-glow">
        
        <h2 className="text-4xl font-extrabold text-center text-green-400 mb-8 tracking-wider">
          Crear cuenta
        </h2>

        {/* 1. ZONA DE NOTIFICACIÓN */}
        {message.text && (
          <div className={`p-3 mb-4 rounded-lg text-sm text-center font-medium
            ${message.type === 'success' 
              ? 'bg-green-600 text-white shadow-lg shadow-green-500/50' 
              : 'bg-red-600 text-white shadow-lg shadow-red-500/50'
            }`}
          >
            {message.text}
          </div>
        )}
        {/* FIN ZONA DE NOTIFICACIÓN */}

        <form onSubmit={handleSubmit} className="space-y-6"> 
          
          {/* Campo de Nombre */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-2" htmlFor="name">
              Nombre de Usuario
            </label>
            <input
              id="name"
              placeholder="Tu nombre"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white transition duration-150 placeholder-gray-400 text-base"
            />
          </div>

          {/* Campo de Correo */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              id="email"
              placeholder="tu@correo.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white transition duration-150 placeholder-gray-400 text-base"
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              placeholder="Mínimo 6 caracteres"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white transition duration-150 placeholder-gray-400 text-base"
            />
          </div>
          
          {/* Botón de Enviar */}
          <button 
            type="submit" 
            className="w-full bg-green-500 text-gray-900 mt-8 py-3 rounded-lg font-bold text-lg hover:bg-green-400 transition duration-200 shadow-green-500/50 shadow-md"
          >
            Regístrate
          </button>
        </form>
        
        {/* Enlace de Login */}
        <p className="mt-8 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/" className="font-medium text-green-500 hover:text-green-400 transition duration-150 underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}