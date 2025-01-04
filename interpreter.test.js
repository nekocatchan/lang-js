import { interpret } from "./interpreter.js";
import { assertEquals } from "@std/assert";

const binaryExpressionTestCases = [
  {
    ast: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: 49,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: "-",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: 35,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: "*",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: 294,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: "/",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: 6,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: "<",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: false,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: "<=",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: false,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: ">",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: true,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: ">=",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: true,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: "=",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: false,
  },
  {
    ast: {
      type: "BinaryExpression",
      operator: "~=",
      left: { type: "Number", value: 42 },
      right: { type: "Number", value: 7 },
    },
    expected: true,
  },
];

Deno.test("BinaryExpression", () => {
  for (const { ast, expected } of binaryExpressionTestCases) {
    const result = interpret(ast);
    assertEquals(result, expected);
  }
});

Deno.test("- 42", () => {
  const ast = {
    type: "UnaryExpression",
    operator: "-",
    argument: { type: "Number", value: 42 },
  };

  const result = interpret(ast);

  assertEquals(result, -42);
});

Deno.test("複数行", () => {
  // 1;
  // 2;
  const ast = {
    type: "Program",
    body: [
      { type: "ExpressionStatement", expression: { type: "Number", value: 1 } },
      { type: "ExpressionStatement", expression: { type: "Number", value: 2 } },
    ],
  };
  const result = interpret(ast);

  assertEquals(result, 2);
});

Deno.test("変数", () => {
  // let x = 42 ;
  // set x = 50 ;
  // x ; # expect 50
  const ast = {
    type: "Program",
    body: [
      {
        type: "VariableDeclaration",
        identifier: { type: "Identifier", value: "x" },
        expression: { type: "Number", value: 42 },
      },
      {
        type: "SetStatement",
        identifier: "x",
        expression: { type: "Number", value: 50 },
      },
      {
        type: "ExpressionStatement",
        expression: { type: "Identifier", name: "x" },
      },
    ],
  };

  const result = interpret(ast);

  assertEquals(result, 50);
});
