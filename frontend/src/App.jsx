import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ItemForm from "./components/ItemForm.jsx";


function AuthLayout({ children }) {
  return (
    // CLASE CLAVE: Aplicamos el fondo negro (bg-gray-900) y aseguramos el tamaño completo
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      {children}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout> {/* Usar el nuevo AuthLayout */}
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout> {/* Usar el nuevo AuthLayout */}
            <Register />
          </AuthLayout>
        }
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/new" element={<ItemForm />} />
      <Route path="/dashboard/edit/:id" element={<ItemForm />} />
    </Routes>
  );
}

export default App;