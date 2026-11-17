import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

function Header() {
  const user = useSelector(selectCurrentUser);

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
