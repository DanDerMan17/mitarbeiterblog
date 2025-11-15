
import { expect } from 'vitest';

export type PrintContext = {
  func: string;
  ui: string;
  param?: any;
};

export function printResult(result: any, expected: any, context: PrintContext) {
  const testName = expect.getState().currentTestName;
  console.log(`\n🧩 Aktueller Test: ${testName}`);
  const param = context.param !== undefined ? `(${JSON.stringify(context.param)})` : "";
  console.log(`📘 Funktion/Event : ${context.func}${param}`);
  console.log(`🖥️  UI-Element    : ${context.ui}`);
  console.log(`Ergebnis          :`, JSON.stringify(result, null, 2));
  console.log(`Erwartet          :`, JSON.stringify(expected, null, 2));
  if (Array.isArray(result) && result.length === 0 && Array.isArray(expected) && expected.length === 0) {
    console.log("Ergebnis: []\nErwartet: []");
  }
}
