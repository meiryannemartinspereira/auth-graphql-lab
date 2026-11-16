const initialState = {
  email: "",
  password: "",
  loading: false,
  error: null
};

function authReducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload
      };

    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        password: "",
        error: null
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export { initialState };
export default authReducer;