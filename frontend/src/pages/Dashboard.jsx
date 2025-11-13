import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems } from "../lib/api.js";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getItems();
        setItems(res || []);
      } catch (error) {
        console.error("Error al obtener ítems:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Función de logout simulada (para salir de la sesión)
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    // Contenedor principal: ocupa toda la pantalla con fondo oscuro
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      
      {/* Panel de Contenido Centrado (Rectángulo flotante) */}
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 sm:p-10 rounded-xl shadow-2xl border border-green-500/30 neon-glow">
        
        {/* Encabezado y Botones */}
        <header className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-4xl font-extrabold text-green-400 tracking-wider">
            📋 Panel de Control
          </h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* Botón de Agregar Ítem */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard/new")}
            className="w-full sm:w-auto px-6 py-3 bg-green-500 text-gray-900 font-bold rounded-lg hover:bg-green-400 transition duration-200 shadow-green-500/50 shadow-md flex items-center justify-center space-x-2"
          >
            <span className="text-xl">+</span>
            <span>Agregar nuevo Ítem</span>
          </button>
        </div>

        {/* Lista de Ítems */}
        {loading ? (
          <p className="text-gray-400 text-center py-10">Cargando ítems...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No hay ítems registrados todavía.</p>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="bg-gray-700 p-5 rounded-lg border border-gray-600 shadow-lg 
                           hover:bg-gray-600 hover:border-green-500 transition duration-300 group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-xl font-semibold text-green-300 group-hover:text-green-200 transition duration-300 block">
                      {item.title}
                    </strong>
                    <p className="text-gray-300 mt-1 text-sm">{item.description}</p>
                  </div>
                  
                  <button
                    onClick={() => navigate(`/dashboard/edit/${item.id}`)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg 
                               hover:bg-blue-700 transition duration-200 text-sm"
                  >
                    ✏️ Editar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
}