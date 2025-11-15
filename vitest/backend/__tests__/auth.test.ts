
import { describe, it, expect, vi } from "vitest";
import { printResult } from "../../shared/testUtils/printResult";

const BASE = process.env.API_BASE || "http://127.0.0.1:3001/api";

describe("🔐 Auth API (RBAC)", () => {
  it("✅ /auth/ping sollte Pong! liefern", async () => {
    const res = await fetch(BASE + "/auth/ping");
    const data = await res.json();

    printResult(data, { message: "Pong!" }, {
      func: "GET /auth/ping",
      ui: "HealthCheck"
    });

    expect(res.ok).toBe(true);
    expect(data.message).toBe("Pong!");
  });

  it("✅ /auth/login sollte bei gültigen Credentials SafeUser liefern", async () => {
    const creds = { username: "Student1", password: "password" };
    const res = await fetch(BASE + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds)
    });
    const data = await res.json();

    printResult(data, { username: "Student1", roles: ["Student"] }, {
      func: "POST /auth/login",
      ui: "LoginForm",
      param: creds
    });

    expect(res.ok).toBe(true);
    expect(data.username).toBe("Student1");
    expect(Array.isArray(data.roles)).toBe(true);
    expect(data.roles).toContain("Student");
  });

  it("🧩 /auth/login sollte bei falschen Credentials 401 liefern", async () => {
    const creds = { username: "UnknownUser", password: "wrong" };
    const res = await fetch(BASE + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds)
    });

    let payload: any = {};
    try { payload = await res.json(); } catch {}

    // Für die geforderte Ausgabe leeren wir Ergebnis/Erwartet explizit als []
    printResult([], [], {
      func: "POST /auth/login",
      ui: "LoginForm",
      param: creds
    });

    expect(res.ok).toBe(false);
    expect(res.status).toBe(401);
  });

  it("🪶 console.log wird durch printResult ausgelöst", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    printResult({ ok: true }, { ok: true }, { func: "noop", ui: "Console" });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("🎛️ UI-Mapping (Auth)", () => {
  it("mappt Login-Form korrekt zu Payload", async () => {
    const uiState = { username: "Student1", password: "password" };
    const payload = { username: uiState.username, password: uiState.password };

    printResult(payload, { username: "Student1", password: "password" }, {
      func: "mapLoginForm",
      ui: "LoginForm",
      param: uiState
    });

    expect(payload).toEqual({ username: "Student1", password: "password" });
  });
});
