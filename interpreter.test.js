import { interpret } from "./interpreter.js";
import { assertEquals } from "@std/assert";

Deno.test("42 + 8 + 50", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "+",
    left: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 8 },
    },
    right: { type: "Number", value: 50 },
  };

  const result = interpret(ast);

  assertEquals(result, 100);
});

Deno.test("42 * 8 * 50", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "*",
    left: {
      type: "BinaryExpression",
      operator: "*",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 8 },
    },
    right: { type: "Number", value: 50 },
  };

  const result = interpret(ast);

  assertEquals(result, 16800);
});

Deno.test("2^3", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "^",
    left: { type: "Number", value: 2 },
    right: { type: "Number", value: 3 },
  };

  const result = interpret(ast);

  assertEquals(result, 8);
});

Deno.test("10 mod 3", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "mod",
    left: { type: "Number", value: 10 },
    right: { type: "Number", value: 3 },
  };

  const result = interpret(ast);

  assertEquals(result, 1);
});
