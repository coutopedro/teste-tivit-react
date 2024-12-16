import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://api-onecloud.multicloud.tivit.com/fake/token";

const fetchHealth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.status === 200 ? response.data : null;
  } catch (err) {
    console.error("Erro ao verificar saúde do serviço:", err.message);
    return null;
  }
};

const fetchUserData = async (token) => {
  try {
    const response = await axios.get("https://api-onecloud.multicloud.tivit.com/fake/user", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (err) {
    console.error("Erro ao obter dados do usuário:", err.message);
    throw err;
  }
};
const fetchAdminData = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    console.error("Erro ao obter dados do admin:", err.message);
    throw err;
  }
};

// COMPONENTE DE LOGIN
const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Alterar para POST e enviar o corpo com os dados de login
      const response = await axios.post("https://api-onecloud.multicloud.tivit.com/fake/token", {
        username: username,
        password: password
      });

      // Verificar se a resposta contém o token
      if (response.data && response.data.token) {
        setToken(response.data.token);  // Definindo o token
        setError("");  // Limpar erro
      } else {
        setError("Erro ao receber token.");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Credenciais inválidas.");
      console.error("Erro ao realizar login:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-modernGray">
      <div className="w-full max-w-md bg-modernBlack rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-modernRed">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-modernGray">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-700 rounded-md focus:ring-modernRed focus:border-modernRed bg-modernGray"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-modernGray">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-700 rounded-md focus:ring-modernRed focus:border-modernRed bg-modernGray"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-modernRed text-modernGray py-2 px-4 rounded-lg hover:bg-red-700 transition"
          >
            Entrar
          </button>
        </form>
        {error && <p className="text-modernRed text-sm mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

// Proteção de rota
const ProtectedRoute = ({ children, token, role, requiredRole }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

// Paginas
const UserPage = ({ token }) => {
  const [userData, setUserData] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData(token);
        setUserData(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-modernBlack">
      <div className="text-modernGray text-center">
        <h2 className="text-3xl font-bold text-modernRed">Bem-vindo, Usuário!</h2>
        {userData ? (
          <div className="mt-4">
            <p>Nome: {userData.name}</p>
            <p>Email: {userData.email}</p>
          </div>
        ) : (
          <p>Carregando dados do usuário...</p>
        )}
      </div>
    </div>
  );
};

const AdminPage = ({ token }) => {
  const [adminData, setAdminData] = useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdminData(token);
        setAdminData(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-modernBlack">
      <div className="text-modernGray text-center">
        <h2 className="text-3xl font-bold text-modernRed">Bem-vindo, Admin!</h2>
        {adminData ? (
          <div className="mt-4">
            <p>Relatórios: {adminData.reports}</p>
            <p>Equipe: {adminData.team}</p>
          </div>
        ) : (
          <p>Carregando dados do admin...</p>
        )}
      </div>
    </div>
  );
};

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-modernBlack">
    <h2 className="text-3xl font-bold text-modernRed">Seu acesso foi negado!</h2>
  </div>
);

const HomePage = () => {
  const [serviceStatus, setServiceStatus] = useState("Carregando...");

  React.useEffect(() => {
    const checkHealth = async () => {
      const status = await fetchHealth();
      setServiceStatus(status ? "Serviço ativo" : "Serviço indisponível");
    };
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-modernBlack">
      <div className="text-center text-modernGray">
        <h2 className="text-3xl font-bold text-modernRed">Bem-vindo ao nosso portal!</h2>
        <p className="mt-2">{serviceStatus}</p>
      </div>
    </div>
  );
};
// App Componentes
const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    setToken(null);
    setRole(null);
  };

  const handleSetToken = async (newToken) => {
    setToken(newToken);
    try {
      const decodedToken = JSON.parse(atob(newToken.split(".")[1]));
      setRole(decodedToken.role);
    } catch (e) {
      console.error("Erro ao decodificar token:", e);
    }
  };


  return (
    <Router>
      <nav className="bg-modernBlack p-4 text-modernGray flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/" className="hover:text-modernRed">Home</Link>
          <Link to="/user" className="hover:text-modernRed">User</Link>
          <Link to="/admin" className="hover:text-modernRed">Admin</Link>
        </div>
        {token ? (
          <button onClick={handleLogout} className="bg-modernRed text-modernGray px-4 py-2 rounded hover:bg-red-700">
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-modernGray text-modernBlack px-4 py-2 rounded hover:bg-gray-300">
            Login
          </Link>
        )}
      </nav>

      <Routes>
        {/* Rota protegida para a HomePage */}
        <Route
          path="/"
          element={token ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login setToken={handleSetToken} />} />

        <Route path="/user" element={
          <ProtectedRoute token={token} role={role} requiredRole="user">
            <UserPage token={token} />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute token={token} role={role} requiredRole="admin">
            <AdminPage token={token} />
          </ProtectedRoute>
        } />

        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
};


export default App;
