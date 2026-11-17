
import { useSelector } from "react-redux";

function UserProfile({ showDetails }) {
  const user = useSelector((state) => state.auth.user);

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
