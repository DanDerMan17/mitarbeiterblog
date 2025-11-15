
import { describe, it, expect, vi } from "vitest";
import { printResult } from "../../shared/testUtils/printResult";

const BASE = process.env.API_BASE || "http://127.0.0.1:3001/api";

// Simple strategy switch for demonstration
type Strategy = "real" | "proxy";
let current: Strategy = "real";
export function setStrategy(next: Strategy) { current = next; }

describe("📚 Entries API", () => {
  it("✅ /entries liefert Einträge (2 Elemente laut mock_entries)", async () => {
    const res = await fetch(BASE + "/entries");
    const data = await res.json();

    printResult({ length: data.length, users: data.map((d:any)=>d.username) }, { length: 2, users: ["Student1","Student2"] }, {
      func: "GET /entries",
      ui: "EntriesList"
    });

    expect(res.ok).toBe(true);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(2);
    expect(data.map((d:any)=>d.username)).toEqual(expect.arrayContaining(["Student1","Student2"]));
  });

  it("⚠️ falsche Elementanzahl wird erkannt", async () => {
    const res = await fetch(BASE + "/entries");
    const data = await res.json();

    printResult({ length: data.length }, { length: 3 }, {
      func: "GET /entries",
      ui: "EntriesList"
    });

    expect(data.length).not.toBe(3);
  });

  it("🔄 Proxy-Strategie kann gewechselt werden", async () => {
    setStrategy("real");
    const before = current;
    setStrategy("proxy");
    const after = current;

    printResult({ before, after }, { before: "real", after: "proxy" }, {
      func: "setStrategy",
      ui: "Dropdown: strategy"
    });

    expect(before).toBe("real");
    expect(after).toBe("proxy");
  });

  it("🪶 console.log wird durch printResult aufgerufen", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});
    printResult({ ok: true }, { ok: true }, { func: "noop", ui: "Console" });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("🎛️ UI-Mapping (Filter) — Username zu Query (Clientseitig)", async () => {
    // Das BE hat kein Filter-Query – wir testen das FE-Mapping-Konzept:
    const username = "Student1";
    const ui = { role: "Student", username };

    // Angenommen FE filtert lokal nach username
    const expectedClientFilter = (list:any[]) => list.filter(x => x.username === username);

    const res = await fetch(BASE + "/entries");
    const data = await res.json();
    const filtered = expectedClientFilter(data);

    printResult({ filteredCount: filtered.length, first: filtered[0]?.username }, { filteredCount: 1, first: "Student1" }, {
      func: "clientFilter(username)",
      ui: "StudentPicker + List",
      param: ui
    });

    expect(filtered.length).toBe(1);
    expect(filtered[0].username).toBe("Student1");
  });
});
