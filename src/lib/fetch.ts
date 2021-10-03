import { SERVER_URL } from "./constants";

export const postData = async (
  url: string,
  body: formLogin
): Promise<Response> => {
  const data = await fetch(`${SERVER_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return data;
};

export const authGetData = async (
  url: string,
  token: string,
): Promise<Response> => {
  const data = await fetch(`${SERVER_URL}${url}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  return data;
};
