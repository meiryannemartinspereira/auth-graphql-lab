
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, logout } from "./authSlice";

const ME_QUERY = gql`
  query Me {
    me {
      id
      name
      email
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { loading, error, data } = useQuery(ME_QUERY);
  const [logoutUser] = useMutation(LOGOUT_MUTATION);

  useEffect(() => {
    if (data?.me) {
      dispatch(loginSuccess(data.me));
    } else if (data?.me === null) {
      dispatch(logout());
    }
  }, [data, dispatch]);

  async function handleLogout() {
    await logoutUser({
      refetchQueries: ["Me"],
      awaitRefetchQueries: true
    });

    dispatch(logout());
  }

  return {
    user,
    loading,
    error,
    handleLogout
  };
}

export default useAuth;
