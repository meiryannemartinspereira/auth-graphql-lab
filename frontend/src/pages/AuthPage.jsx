
import LoginForm from "../components/LoginForm";
import Dashboard from "../components/Dashboard";
import RegisterForm from "../components/RegisterForm";

function AuthPage({ user, onLogout }) {
  return user ? (
    <Dashboard onLogout={onLogout} />
  ) : (
    <>
    <LoginForm />
    <RegisterForm />
    </>
  );
}

export default AuthPage;
