import { somar } from "../models/calculadora";

test("Somar 2 + 2 deverá retornar 4", () => {
  const resultado = somar(2, 2);

  expect(somar(2, 2)).toBe(resultado);
});
