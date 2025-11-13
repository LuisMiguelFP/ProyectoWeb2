import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../lib/api.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      // Usar un modal o un mensaje en el futuro, no alert()
      console.error("Por favor, ingresa correo y contraseña.");
      return;
    }
    
    // Asumo que la función loginUser maneja la llamada a la API
    const res = await loginUser({ email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } else {
      // Usar un modal o un mensaje en el futuro, no alert()
      console.error(res.message || "Error al iniciar sesión"); 
    }
  };

  return (
    // DIV EXTERIOR: Centra el contenido en la pantalla.
    // Asume que AuthLayout (en App.jsx) se encarga del fondo negro global.
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* 1. TARJETA DEL FORMULARIO (Rectángulo Mediano) */}
      {/* Claves: max-w-xl para ancho rectangular, p-10 para más volumen, neon-glow */}
      <div className="bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-xl border border-green-500/30 transition duration-300 hover:scale-[1.01] neon-glow">
        
        {/* Título - Ajustado a 4xl y tracking para más impacto */}
        <h2 className="text-4xl font-extrabold text-center text-green-400 mb-8 tracking-wider">
          Iniciar sesión
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6"> 
          
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
              // Inputs mejorados con más padding y borde verde en focus
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
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              // Inputs mejorados con más padding y borde verde en focus
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white transition duration-150 placeholder-gray-400 text-base"
            />
          </div>
          
          {/* Botón de Enviar - Más grande y con sombra sutil */}
          <button 
            type="submit" 
            className="w-full bg-green-500 text-gray-900 mt-8 py-3 rounded-lg font-bold text-lg hover:bg-green-400 transition duration-200 shadow-green-500/50 shadow-md"
          >
            Entrar
          </button>
        </form>
        
        {/* Enlace de Registro - Subrayado para mayor visibilidad */}
        <p className="mt-8 text-center text-sm text-gray-400">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="font-medium text-green-500 hover:text-green-400 transition duration-150 underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}