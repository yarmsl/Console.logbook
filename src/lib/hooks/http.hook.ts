import { useState, useCallback } from "react";
import { postProps } from "../../pages/AddPost";
import { badResponse, formLogin, useHttpTypes } from "../../types/types";
import { SERVER_URL } from "../constants";

export const useHttp = (): useHttpTypes => {
  const [loading, setLoading] = useState(false);
  const [sse, setSse] = useState<badResponse | null>(null);
  const request = useCallback(
    async <T>(
      url: string,
      method: "GET" | "POST" | "PUT" | "DELETE" | undefined = "GET",
      body: formLogin | postProps | null = null,
      headers: HeadersInit = {}
    ): Promise<T> => {
      setLoading(true);
      try {
        console.log(headers);
        const response = await fetch(`${SERVER_URL}${url}`, {
          method,
          body: JSON.stringify(body),
          headers,
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          console.log(data);
          setSse(data);
          throw new Error(JSON.stringify(data) || "server error");
        }
        setLoading(false);
        return data;
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === "Failed to fetch") {
            setSse({ message: "server error" });
          }
          console.log(e);
        }
        setLoading(false);
        throw e;
      }
    },
    []
  );

  const clearError = () => setSse(null);

  return { loading, request, sse, clearError };
};
