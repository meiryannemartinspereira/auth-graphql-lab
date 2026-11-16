
function UserProfile({ user }) {
  return (
    <section>
      <h2>Perfil do usuário</h2>
      <p>Nome: {user.name}</p>
      <p>E-mail: {user.email}</p>
    </section>
  );
}

export default UserProfile;
