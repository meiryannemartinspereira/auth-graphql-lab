import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function Header() {
  const user = useContext(UserContext);

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