import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems } from "../lib/api.js";

export default function Dashboard() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtros
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortByDate, setSortByDate] = useState("none");

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getItems(token);

        setItems(res || []);
        setFilteredItems(res || []);
      } catch (error) {
        console.error("Error al obtener ítems:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ─────────────────────────────────────────────
  // 🔍 FILTRADO / BUSCADOR / ORDENAMIENTO
  // ─────────────────────────────────────────────
  useEffect(() => {
    let data = [...items];

    // Buscador
    if (search.trim() !== "") {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar prioridad
    if (filterPriority !== "all") {
      data = data.filter((item) => item.priority === filterPriority);
    }

    // Filtrar estado
    if (filterStatus !== "all") {
      data = data.filter((item) => item.status === filterStatus);
    }

    // Ordenar por fecha límite
    if (sortByDate !== "none") {
      data.sort((a, b) => {
        const da = a.dueDate ? new Date(a.dueDate) : null;
        const db = b.dueDate ? new Date(b.dueDate) : null;

        if (!da) return 1;
        if (!db) return -1;

        return sortByDate === "asc" ? da - db : db - da;
      });
    }

    setFilteredItems(data);
  }, [search, filterPriority, filterStatus, sortByDate, items]);

  // Colores por prioridad
  const priorityColors = {
    low: "border-blue-400 text-blue-300",
    medium: "border-yellow-400 text-yellow-300",
    high: "border-red-400 text-red-300",
  };

  // Colores de estado
  const statusColors = {
    pending: "bg-gray-600",
    in_progress: "bg-blue-600",
    completed: "bg-green-600",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">

      <div className="max-w-5xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border border-green-500/30 neon-glow">

        {/* Encabezado */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h2 className="text-4xl font-extrabold text-green-400 tracking-wider">
            📋 Panel de Control
          </h2>

          <button
            onClick={handleLogout}
            className="px-4 mt-4 sm:mt-0 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
          >
            Cerrar Sesión
          </button>
        </header>

        {/* Barra superior: búsqueda + filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">

          {/* Buscador */}
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="col-span-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-green-500"
          />

          {/* Filtro prioridad */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
          >
            <option value="all">Todas las prioridades</option>
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>

          {/* Filtro estado */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        {/* Ordenar por fecha */}
        <div className="mb-6">
          <select
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
          >
            <option value="none">Sin ordenar por fecha</option>
            <option value="asc">Más próximas primero</option>
            <option value="desc">Más lejanas primero</option>
          </select>
        </div>

        {/* Botón agregar */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/dashboard/new")}
            className="w-full sm:w-auto px-6 py-3 bg-green-500 text-gray-900 font-bold rounded-lg hover:bg-green-400 transition duration-200 shadow-green-500/50 shadow-md"
          >
            ➕ Agregar nuevo Ítem
          </button>
        </div>

        {/* LISTA → AHORA EN GRID */}
        {loading ? (
          <p className="text-gray-400 text-center py-10">Cargando ítems...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No hay ítems que coincidan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`bg-gray-700 p-5 rounded-xl border shadow-lg hover:bg-gray-600 transition duration-300 ${priorityColors[item.priority]}`}
              >
                <div className="flex justify-between items-start">

                  <div className="w-full">

                    {/* Título */}
                    <strong className="text-2xl block text-green-300 mb-2">
                      {item.title}
                    </strong>

                    {/* Estado */}
                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${statusColors[item.status]}`}
                    >
                      {item.status === "pending"
                        ? "Pendiente"
                        : item.status === "in_progress"
                        ? "En progreso"
                        : "Completada"}
                    </span>

                    {/* Descripción */}
                    {item.description && (
                      <p className="text-gray-300 mt-3">{item.description}</p>
                    )}

                    {/* Fecha límite */}
                    {item.dueDate && (
                      <p className="text-sm text-gray-400 mt-2">
                        ⏳ Fecha límite: {new Date(item.dueDate).toLocaleDateString()}
                      </p>
                    )}

                    {/* Etiquetas */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-gray-600 rounded-full border border-gray-500"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Botón Editar */}
                  <button
                    onClick={() => navigate(`/dashboard/edit/${item.id}`)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 text-sm"
                  >
                    ✏️ Editar
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
