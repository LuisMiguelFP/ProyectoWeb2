import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createItem, getSingleItem, updateItem } from "../lib/api";

export default function ItemForm() {
  const { id } = useParams(); // Si existe → modo edición
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Nuevos campos
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Token
  const token = localStorage.getItem("token");

  // ─────────────────────────────────────────────
  // 🔄 Cargar datos si estamos editando
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;

    (async () => {
      const res = await getSingleItem(id, token);
      if (!res || res.error) {
        setMessage("❌ No se pudo cargar el ítem");
        return;
      }

      setTitle(res.title);
      setDescription(res.description || "");
      setPriority(res.priority || "medium");
      setStatus(res.status || "pending");
      setDueDate(res.dueDate ? res.dueDate.split("T")[0] : "");
      setTags(res.tags ? res.tags.join(", ") : "");
    })();
  }, [id]);

  // ─────────────────────────────────────────────
  // 📝 Guardar (crear o actualizar)
  // ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      title,
      description,
      priority,
      status,
      dueDate,
      tags: tags.split(",").map(t => t.trim()).filter(t => t.length > 0),
    };

    const res = id
      ? await updateItem(id, payload, token)
      : await createItem(payload, token);

    if (res.error || res.message?.includes("Error")) {
      setMessage("❌ Error: " + (res.message || "No se pudo guardar"));
      setLoading(false);
      return;
    }

    setMessage("✅ Guardado correctamente");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 p-10 rounded-xl shadow-2xl w-full max-w-xl border border-green-500/30 transition duration-300 hover:scale-[1.01] neon-glow">

        <h2 className="text-4xl font-extrabold text-center text-green-400 mb-8 tracking-wider">
          {id ? "✏️ Editar Ítem" : "➕ Agregar Ítem"}
        </h2>

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

          {/* Título */}
          <div>
            <label className="block text-base text-gray-300 mb-2">Título</label>
            <input
              type="text"
              placeholder="Título del ítem"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg 
              focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-base text-gray-300 mb-2">Descripción</label>
            <textarea
              rows="4"
              placeholder="Descripción completa..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg 
              focus:ring-green-500 focus:border-green-500 text-white resize-none"
            />
          </div>

          {/* Prioridad */}
          <div>
            <label className="block text-base text-gray-300 mb-2">Prioridad</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-base text-gray-300 mb-2">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value="pending">Pendiente</option>
              <option value="in_progress">En progreso</option>
              <option value="completed">Completada</option>
            </select>
          </div>

          {/* Fecha límite */}
          <div>
            <label className="block text-base text-gray-300 mb-2">Fecha Límite</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          {/* Etiquetas */}
          <div>
            <label className="block text-base text-gray-300 mb-2">
              Etiquetas (separadas por coma)
            </label>
            <input
              type="text"
              placeholder="Ej: trabajo, urgente, casa"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-5 py-3 bg-gray-700 border border-gray-600 rounded-lg 
              focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-gray-900 mt-8 py-3 rounded-lg font-bold text-lg 
            hover:bg-green-400 transition duration-200 shadow-green-500/50 shadow-md 
            disabled:opacity-50"
          >
            {loading ? "Guardando..." : id ? "Actualizar Ítem" : "Crear Ítem"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm">
          <Link to="/dashboard" className="text-gray-400 hover:text-green-500 underline">
            ← Volver al Panel
          </Link>
        </p>
      </div>
    </div>
  );
}
