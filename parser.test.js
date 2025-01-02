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

Deno.test("2^3", () => {
  const tokens = [
    { type: "Number", value: 2 },
    { type: "Operator", value: "^" },
    { type: "Number", value: 3 },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "BinaryExpression",
    operator: "^",
    left: { type: "Number", value: 2 },
    right: { type: "Number", value: 3 },
  });
});

Deno.test("2 + 8 mod 3 * 3", () => {
  const tokens = [
    { type: "Number", value: 2 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: "mod" },
    { type: "Number", value: 3 },
    { type: "Operator", value: "*" },
    { type: "Number", value: 3 },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "BinaryExpression",
    operator: "mod",
    left: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Number", value: 2 },
      right: { type: "Number", value: 8 },
    },
    right: {
      type: "BinaryExpression",
      operator: "*",
      left: { type: "Number", value: 3 },
      right: { type: "Number", value: 3 },
    },
  });
});
