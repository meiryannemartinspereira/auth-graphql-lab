
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

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
      <h2>Usuário autenticado</h2>
      <p>Nome: {data.me.name}</p>
      <p>E-mail: {data.me.email}</p>
      <p>ID: {data.me.id}</p>
    </main>
  );
}

export default App;
