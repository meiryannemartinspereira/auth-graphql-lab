
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import authReducer, { initialState } from "../reducers/authReducer";
import { loginUser } from "../features/auth/authThunks";

function LoginForm() {
  const dispatchRedux = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [state, dispatch] = useReducer(authReducer, initialState);

  function handleChange(event) {
    dispatch({
      type: "SET_FIELD",
      field: event.target.name,
      payload: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatchRedux(
      loginUser({
        email: state.email,
        password: state.password
      })
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Entrar</h2>

      <label>E-mail</label>
      <input
        type="email"
        name="email"
        value={state.email}
        onChange={handleChange}
      />

      <label>Senha</label>
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
