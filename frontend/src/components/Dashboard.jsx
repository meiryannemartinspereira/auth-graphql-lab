
import { useState } from "react";
import UserProfile from "./UserProfile";

function Dashboard({ onLogout }) {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <main>
      <button onClick={onLogout}>
        Sair
      </button>

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Ocultar perfil" : "Mostrar perfil"}
      </button>

      <UserProfile showDetails={showDetails} />
    </main>
  );
}

export default Dashboard;
