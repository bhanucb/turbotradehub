type AuthData = {
  token: string;
};

export function login(username: string, password: string): Promise<AuthData> {
  console.log("logging in with", username);
  return new Promise((resolve) =>
    setTimeout(() => resolve({ token: "2342f2f1d131rf12" }), 2000)
  );
}

export function logout(username: string): Promise<void> {
  console.log("logging out", username);
  return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}
