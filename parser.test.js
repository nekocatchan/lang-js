import { parse } from "./parser.js";
import { assertEquals } from "@std/assert";

Deno.test("42 + 8 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 8 },
        },
      },
    ],
  });
});

Deno.test("42 + 8 + 50 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 50 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "Number", value: 42 },
            right: { type: "Number", value: 8 },
          },
          right: { type: "Number", value: 50 },
        },
      },
    ],
  });
});

Deno.test("42 - 10 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "-" },
    { type: "Number", value: 10 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 10 },
        },
      },
    ],
  });
});

Deno.test("42 + 8*50 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: "*" },
    { type: "Number", value: 50 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: { type: "Number", value: 42 },
          right: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "Number", value: 8 },
            right: { type: "Number", value: 50 },
          },
        },
      },
    ],
  });
});

Deno.test("42 / 8 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "/" },
    { type: "Number", value: 8 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "/",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 8 },
        },
      },
    ],
  });
});

Deno.test("-42 + 10 ;", () => {
  const tokens = [
    { type: "Operator", value: "-" },
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 10 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: {
            type: "UnaryExpression",
            operator: "-",
            argument: { type: "Number", value: 42 },
          },
          right: { type: "Number", value: 10 },
        },
      },
    ],
  });
});

Deno.test("(42 + 8) * 50 ;", () => {
  const tokens = [
    { type: "Operator", value: "(" },
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: ")" },
    { type: "Operator", value: "*" },
    { type: "Number", value: 50 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "Number", value: 42 },
            right: { type: "Number", value: 8 },
          },
          right: { type: "Number", value: 50 },
        },
      },
    ],
  });
});

Deno.test("42 = 38 + 4 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "=" },
    { type: "Number", value: 38 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 4 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "=",
          left: { type: "Number", value: 42 },
          right: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "Number", value: 38 },
            right: { type: "Number", value: 4 },
          },
        },
      },
    ],
  });
});

Deno.test("42 < 32 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "<" },
    { type: "Number", value: 32 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 32 },
        },
      },
    ],
  });
});

Deno.test("42 <= 32 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "<=" },
    { type: "Number", value: 32 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "<=",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 32 },
        },
      },
    ],
  });
});

Deno.test("42 + 8 ; \n 50 - 10 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: ";" },
    { type: "Number", value: 50 },
    { type: "Operator", value: "-" },
    { type: "Number", value: 10 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 8 },
        },
      },
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
          left: { type: "Number", value: 50 },
          right: { type: "Number", value: 10 },
        },
      },
    ],
  });
});

Deno.test("let x = 42 ;", () => {
  const tokens = [
    { type: "Keyword", value: "let" },
    { type: "Identifier", value: "x" },
    { type: "Operator", value: "=" },
    { type: "Number", value: 42 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "LetStatement",
        identifier: "x",
        expression: { type: "Number", value: 42 },
      },
    ],
  });
});
