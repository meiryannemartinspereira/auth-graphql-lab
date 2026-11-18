
export const initialState = {
  name: "",
  email: "",
  password: ""
};

function authReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.payload
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default authReducer;
