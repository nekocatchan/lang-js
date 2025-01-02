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

Deno.test("42 - 8 - 50", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "-",
    left: {
      type: "BinaryExpression",
      operator: "-",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 8 },
    },
    right: { type: "Number", value: 50 },
  };

  const result = interpret(ast);

  assertEquals(result, -16);
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

Deno.test("42 / 6", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "/",
    left: { type: "Number", value: 42 },
    right: { type: "Number", value: 6 },
  };

  const result = interpret(ast);

  assertEquals(result, 7);
});

Deno.test("-42+10", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "+",
    left: {
      type: "UnaryExpression",
      operator: "-",
      argument: { type: "Number", value: 42 },
    },
    right: { type: "Number", value: 10 },
  };

  const result = interpret(ast);

  assertEquals(result, -32);
});

Deno.test("42 = 38 + 4", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "=",
    left: { type: "Number", value: 42 },
    right: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Number", value: 38 },
      right: { type: "Number", value: 4 },
    },
  };

  const result = interpret(ast);

  assertEquals(result, true);
});

Deno.test("42 ~= 38 + 4", () => {
  const ast = {
    type: "BinaryExpression",
    operator: "~=",
    left: { type: "Number", value: 42 },
    right: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Number", value: 38 },
      right: { type: "Number", value: 4 },
    },
  };

  const result = interpret(ast);

  assertEquals(result, false);
});
