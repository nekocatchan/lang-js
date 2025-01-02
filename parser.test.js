import { parse } from "./parser.js";
import { assertEquals } from "@std/assert";

Deno.test("足し算", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "BinaryExpression",
    operator: "+",
    left: { type: "Number", value: 42 },
    right: { type: "Number", value: 8 },
  });
});

Deno.test("足し算連続", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 50 },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "BinaryExpression",
    operator: "+",
    left: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 8 },
    },
    right: { type: "Number", value: 50 },
  });
});

Deno.test("42 + 8*50", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: "*" },
    { type: "Number", value: 50 },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "BinaryExpression",
    operator: "+",
    left: { type: "Number", value: 42 },
    right: {
      type: "BinaryExpression",
      operator: "*",
      left: { type: "Number", value: 8 },
      right: { type: "Number", value: 50 },
    },
  });
});
