import { useState } from "react";
import { Link } from "react-router-dom"; // Importamos Link para el enlace de regreso

export default function ItemForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpiar mensaje anterior
    setLoading(true);

    if (!title.trim()) {
      setMessage("El título es obligatorio");
      setLoading(false);
      return;
    }

    try {
      // Nota: Mantengo la URL de ejemplo "http://localhost:5000/api/items"
      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Deberías incluir el token de autorización aquí:
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Item creado correctamente");
        setTitle("");
        setDescription("");
      } else {
        setMessage(`❌ Error: ${data.message || "No se pudo crear el item"}`);
      }
    } catch (error) {
      setMessage("⚠️ Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Contenedor exterior: usa la misma lógica de centrado que el Login
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      
      {/* TARJETA DEL FORMULARIO (Mismo estilo rectangular neón) */}
      <div className="bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-xl border border-green-500/30 transition duration-300 hover:scale-[1.01] neon-glow">
        
        {/* Título */}
        <h2 className="text-4xl font-extrabold text-center text-green-400 mb-8 tracking-wider">
          ➕ Agregar Nuevo Ítem
        </h2>
        
        {/* ZONA DE MENSAJE (Estilo neón si tiene contenido) */}
        {message && (
          <p className={`p-3 mb-4 rounded-lg text-sm text-center font-medium 
            ${message.startsWith('✅') 
              ? 'bg-green-600 text-white shadow-lg shadow-green-500/50' 
              : 'bg-red-600 text-white shadow-lg shadow-red-500/50'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6"> 
          
          {/* Campo de Título */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-2" htmlFor="title">
              Título
            </label>
            <input
              id="title"
              type="text"
              placeholder="Título del producto/ítem"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white transition duration-150 placeholder-gray-400 text-base"
            />
          </div>

          {/* Campo de Descripción */}
          <div>
            <label className="block text-base font-medium text-gray-300 mb-2" htmlFor="description">
              Descripción (opcional)
            </label>
            <textarea
              id="description"
              placeholder="Escribe una descripción completa aquí..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500 text-white transition duration-150 placeholder-gray-400 text-base resize-none"
            />
          </div>
          
          {/* Botón de Guardar/Crear */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-500 text-gray-900 mt-8 py-3 rounded-lg font-bold text-lg hover:bg-green-400 transition duration-200 shadow-green-500/50 shadow-md disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar Ítem"}
          </button>
        </form>

        {/* Enlace de Regreso */}
        <p className="mt-8 text-center text-sm">
          <Link to="/dashboard" className="font-medium text-gray-400 hover:text-green-500 transition duration-150 underline">
            ← Volver al Panel
          </Link>
        </p>
      </div>
    </div>
  );
}