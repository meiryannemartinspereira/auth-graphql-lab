
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector((state) => state.auth.user);

  return (
    <header>
      <h1>Auth GraphQL Lab</h1>
      <p>
        {user ? `Olá, ${user.name}!` : "Visitante"}
      </p>
    </header>
  );
}

export default Header;
