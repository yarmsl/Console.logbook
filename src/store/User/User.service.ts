import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/user`,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (build) => ({
    sendUserData: build.mutation<ISendUserDataResponse, FormData>({
      query: (sendData) => ({
        url: "/",
        method: "POST",
        body: sendData,
      }),
    }),
    sendName: build.mutation<ISendName, ISendName>({
      query: (sendData) => ({
        url: "/",
        method: "PUT",
        body: sendData,
      }),
    }),
  }),
});

export const { useSendUserDataMutation, useSendNameMutation } = userAPI;