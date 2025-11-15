
# mitarbeiter2_vitest

Vitest-Testpaket für **PLF MERN RBAC MitarbeitBlog (Light)** – getestet gegen reale Endpunkte deines Backends.

## Endpunkte (aus deinem Projekt)
- `GET /api/auth/ping` → `{ message: "Pong!" }`
- `POST /api/auth/login` → Input: `{ username, password }` → Output: `ISafeUser` oder `401`
- `GET /api/entries` → `IMitarbeitEntry[]` (mock: 2 Elemente: Student1, Student2)

## Ausführen
Backend muss lokal laufen (Port 3001).
```bash
# Backend-Tests
cd backend
npm i
npm run test

# Frontend-Tests (service-level)
cd ../frontend
npm i
npm run test
```

**Basis-URL anpassen:**
```bash
API_BASE=http://127.0.0.1:3001/api npm run test
```

## Abgedeckte Testfälle
1. Gültige ID/Creds → Daten vorhanden
2. Ungültige ID/Creds → `[]`-Ausgabe (explizit in der Konsole)
3. Richtige Elementanzahl
4. Falsche Elementanzahl erkannt
5. Proxy-/Strategie-Wechsel (`setStrategy` im Test)
6. `console.log`-Nachweis via `printResult`
7. UI-Mapping (Login-Payload, Client-Filter)
