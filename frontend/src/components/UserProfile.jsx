import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function UserProfile({ showDetails }) {
    const user = useContext(UserContext);

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
