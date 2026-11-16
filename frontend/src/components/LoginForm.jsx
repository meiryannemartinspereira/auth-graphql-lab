import { useReducer } from "react";
import authReducer, { initialState } from "../reducers/authReducer";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      message
    }
  }
`;

function LoginForm() {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [login] = useMutation(LOGIN_MUTATION);

  async function handleSubmit(event) {
    event.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      await login({
        variables: {
          email: state.email,
          password: state.password
        },
        refetchQueries: ["Me"],
        awaitRefetchQueries: true
      });

      dispatch({ type: "LOGIN_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message
      });
    }
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

      <button type="submit" disabled={state.loading}>
        {state.loading ? "Entrando..." : "Entrar"}
      </button>

      {state.error && <p>{state.error}</p>}
    </form>
  );
}

export default LoginForm;