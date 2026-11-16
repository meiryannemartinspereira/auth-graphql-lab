import {gql} from "@apollo/client";
import { useQuery } from "@apollo/client/react";


const HEALTH_QUERY = gql`
  query {
    health
  }
`;

function App() {
  const {loading, error, data} = useQuery(HEALTH_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>GraphQL Health Check</h1>
      <p>Status: {data.health}</p>
    </div>
  );
}

export default App;