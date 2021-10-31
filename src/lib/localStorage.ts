export const setTokenToLC = (token: string): void => {
  localStorage.setItem("app", token);
};

export const tryToReadTokenFromLC = (): string | null => {
  const res = localStorage.getItem("app");
  if (res != null) {
    return res;
  } else {
    return null;
  }
};

export const removeTokenFromLC = (): void => {
  localStorage.removeItem("app");
};
