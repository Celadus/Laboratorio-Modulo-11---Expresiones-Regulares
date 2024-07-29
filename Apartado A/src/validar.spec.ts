import { estaBienFormadoElIban } from "./validar";

describe("estaBienFormadoElIban", () => {
  it.each([
    ["ES21 0081 1098 08 1234567890", true],
    ["ES2100811098081234567890", true],
    ["ES21-0081-1098-08-1234567890", true],
    ["12ES-0000-2222-32-1234567890", false],
    ["ES100 0098 7896 34 1234567890", false],
    ["ES12102345061234567890", false],
  ])(
    "debería devolver para el iban %s el valor %s",
    (iban: string, expected: boolean) => {
      expect(estaBienFormadoElIban(iban)).toBe(expected);
    }
  );
});
