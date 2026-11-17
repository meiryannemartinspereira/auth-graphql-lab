
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";

function AuthPage({ user, onLogout }) {
  return user ? (
    <Dashboard onLogout={onLogout} />
  ) : (
    <LoginForm />
  );
}

export default AuthPage;
