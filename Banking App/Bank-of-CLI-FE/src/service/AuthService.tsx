type AuthData = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type AuthResult =
  | { ok: true; data: AuthData }
  | { ok: false; error: { code: string; message: string } };

async function authenticate(
  path: string,
  body: Record<string, string>
): Promise<AuthResult> {
  let response: Response;
  try {
    response = await fetch(`http://localhost:8080${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  } catch (error) {
    console.error("Unable to reach the banking API:", error);
    return { ok: false, error: { code: "NETWORK_ERROR", message: "Unable to connect to the banking server." } };
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (error) {
    console.error("Invalid response from the banking API:", error);
    return { ok: false, error: { code: "INVALID_RESPONSE", message: "The banking server returned an invalid response." } };
  }

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : `Request failed (${response.status}).`;
    return { ok: false, error: { code: "AUTH_FAILED", message } };
  }

  if (
    typeof payload !== "object" || payload === null ||
    !("id" in payload) || !("name" in payload) || !("email" in payload) || !("token" in payload) ||
    typeof payload.id !== "string" || typeof payload.name !== "string" ||
    typeof payload.email !== "string" || typeof payload.token !== "string"
  ) {
    return { ok: false, error: { code: "INVALID_RESPONSE", message: "The banking server returned incomplete account details." } };
  }

  return {
    ok: true,
    data: { id: payload.id, name: payload.name, email: payload.email, token: payload.token }
  };
}

export const AuthService = {
  login(email: string, password: string) {
    return authenticate("/user/login", { email, password });
  },

  register(name: string, email: string, password: string) {
    return authenticate("/user/register", { name, email, password });
  }
};
