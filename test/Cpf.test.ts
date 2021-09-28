import Cpf from "../src/Cpf"

test("Deve verificar um cpf inválido", () => {
  expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid CPF"));
});

test("Deve verificar um cpf válido", () => {
  const cpf = "101.834.086-67";
  expect(new Cpf(cpf).value).toEqual(cpf);
});