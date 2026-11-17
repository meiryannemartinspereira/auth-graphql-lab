import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

function UserProfile({ showDetails }) {
  const user = useSelector(selectCurrentUser);

  return (
    <section>
      <h2>Perfil do usuário</h2>

      {showDetails && user && (
        <>
          <p>Nome: {user.name}</p>
          <p>E-mail: {user.email}</p>
        </>
      )}
    </section>
  );
}

export default UserProfile;
