import Order from "../src/Order";

test("Não Deve criar um pedido com cpf inválido", () => {
  expect(() => new Order("111.111.111-11")).toThrow(new Error("Invalid CPF"));
})