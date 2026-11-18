
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import authReducer, { initialState } from "../reducers/authReducer";
import { registerUser } from "../features/auth/authThunks";

function RegisterForm() {
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

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await dispatchRedux(
                registerUser({
                    name: state.name,
                    email: state.email,
                    password: state.password
                })
            ).unwrap();

            dispatch({ type: "RESET" });
        } catch {
            return;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastrar</h2>

            <label>Nome</label>
            <input
                type="text"
                name="name"
                value={state.name}
                onChange={handleChange}
            />

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
                {loading ? "Cadastrando..." : "Cadastrar"}
            </button>

            {error && <p>{error}</p>}
        </form>
    );
}

export default RegisterForm;
