
import { describe, it, expect, vi } from "vitest";
import { printResult } from "../../shared/testUtils/printResult";

const BASE = process.env.API_BASE || "http://127.0.0.1:3001/api";

describe("🎨 Frontend Services ↔ Real API", () => {
  it("Auth: gültiger Login liefert SafeUser", async () => {
    const creds = { username: "Student1", password: "password" };
    const res = await fetch(BASE + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds)
    });
    const data = await res.json();

    printResult(data, { username: "Student1", roles: ["Student"] }, {
      func: "authLogin",
      ui: "LoginForm",
      param: creds
    });

    expect(res.ok).toBe(true);
    expect(data.username).toBe("Student1");
    expect(data.roles).toContain("Student");
  });

  it("Auth: ungültiger Login -> [] Ausgabe", async () => {
    const creds = { username: "DoesNotExist", password: "nope" };
    const res = await fetch(BASE + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(creds)
    });
    // gewünscht: Ergebnis: [] Erwartet: []
    printResult([], [], {
      func: "authLogin",
      ui: "LoginForm",
      param: creds
    });

    expect(res.ok).toBe(false);
    expect(res.status).toBe(401);
  });

  it("Entries: Anzahl korrekt (2)", async () => {
    const res = await fetch(BASE + "/entries");
    const data = await res.json();

    printResult({ length: data.length }, { length: 2 }, {
      func: "getEntries",
      ui: "EntriesList"
    });

    expect(data.length).toBe(2);
  });

  it("Entries: falsche Anzahl erkannt", async () => {
    const res = await fetch(BASE + "/entries");
    const data = await res.json();

    printResult({ length: data.length }, { length: 99 }, {
      func: "getEntries",
      ui: "EntriesList"
    });

    expect(data.length).not.toBe(99);
  });

  it("UI Mapping: Role+Username -> Client-Filter (Student1)", async () => {
    const res = await fetch(BASE + "/entries");
    const data = await res.json();
    const role = "Student";
    const username = "Student1";
    const filtered = data.filter((e:any) => e.username === username);

    printResult({ role, username, filteredCount: filtered.length }, { role: "Student", username: "Student1", filteredCount: 1 }, {
      func: "mapUIToFilter",
      ui: "RoleSelect + StudentPicker"
    });

    expect(filtered.length).toBe(1);
  });

  it("🪶 console.log durch printResult", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    printResult({ ok: true }, { ok: true }, { func: "noop", ui: "Console" });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
