
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
        value={state.email}
        onChange={(event) =>
          dispatch({
            type: "SET_EMAIL",
            payload: event.target.value
          })
        }
      />

      <label>Senha</label>
      <input
        type="password"
        value={state.password}
        onChange={(event) =>
          dispatch({
            type: "SET_PASSWORD",
            payload: event.target.value
          })
        }
      />

      <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Entrar"}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
