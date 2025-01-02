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
