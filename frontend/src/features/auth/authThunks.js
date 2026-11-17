
import { createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import client from "../../apollo";

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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const response = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: credentials,
      refetchQueries: ["Me"],
      awaitRefetchQueries: true
    });

    return response.data.login.user;
  }
);
