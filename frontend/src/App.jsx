
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import UserProfile from "./components/UserProfile";

const ME_QUERY = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) {
    return <p>Verificando autenticação...</p>;
  }

  if (error) {
    return <p>Erro: {error.message}</p>;
  }

  if (!data.me) {
    return <p>Nenhum usuário autenticado.</p>;
  }

  return (
    <main>
      <h1>Auth GraphQL Lab</h1>
      <UserProfile user={data.me} />
    </main>
  );
}

export default App;
