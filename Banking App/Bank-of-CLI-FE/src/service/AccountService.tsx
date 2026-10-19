import { wait, fail, db } from "../utils/Database";

export const AccountService = {
  async getAccount() {

    let response : Response;
    try {
    response = await fetch("http://localhost:8080/transaction/");
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
};
  },

  async getTransactions() {
    await wait(900);
    return { ok: true, data: [...db.txs] };
  },

  async submit(type: string, amount: number, toEmail: string) {
    await wait();

    if (type !== "DEPOSIT" && amount > db.account.balance) {
      return fail("INSUFFICIENT_FUNDS", "Not enough funds for this transaction.");
    }

    db.account.balance += type === "DEPOSIT" ? amount : -amount;

    const tx = {
      id: "t" + Date.now(),
      type,
      amount,
      date: new Date().toISOString(),
      description:
        type === "TRANSFER"
          ? "Transfer to " + toEmail
          : type === "DEPOSIT"
          ? "Deposit"
          : "Withdrawal"
    };

    db.txs.unshift(tx);

    return { ok: true, data: tx };
  }
};
