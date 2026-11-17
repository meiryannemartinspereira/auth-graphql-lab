
import Header from "./components/Header";
import AuthPage from "./pages/AuthPage";
import useAuth from "./features/auth/useAuth";

function App() {
  const { user, loading, error, handleLogout } = useAuth();

  if (loading) {
    return <p>Verificando autenticação...</p>;
  }

  if (error) {
    return <p>Erro: {error.message}</p>;
  }

  return (
    <>
      <Header />
      <AuthPage user={user} onLogout={handleLogout} />
    </>
  );
}

export default App;
