import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import { SERVER_URL } from "../../lib/constants";

export const postsAPI = createApi({
  reducerPath: "postsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api/post`,
    prepareHeaders: (headers, {getState}) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: (build) => ({
    addPost: build.mutation<IPost, postProps>({
      query: (post) => ({
        url: "/add",
        method: "POST",
        body: post,
      }),
    }),
    getPosts: build.query<IPost[], string>({
      query: () => ({
        url: "/",
      })
    })
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = postsAPI;