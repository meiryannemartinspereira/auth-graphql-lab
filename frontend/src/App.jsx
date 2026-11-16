
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import UserProfile from "./components/UserProfile";
import UserContext from "./contexts/UserContext";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;

function App() {
  const [showDetails, setShowDetails] = useState(true);
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) {
    return <p>Verificando autenticação...</p>;
  }

  if (error) {
    return <p>Erro: {error.message}</p>;
  }

  return (
    <UserContext.Provider value={data.me}>
      <Header />

      <main>
        {!data.me ? (
          <LoginForm />
        ) : (
          <>
            <button onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Ocultar perfil" : "Mostrar perfil"}
            </button>

            <UserProfile showDetails={showDetails} />
          </>
        )}
      </main>
    </UserContext.Provider>
  );
}

export default App;
