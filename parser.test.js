import { parse } from "./parser.js";
import { assertEquals } from "@std/assert";

Deno.test("42 + 7 - 6 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 7 },
    { type: "Operator", value: "-" },
    { type: "Number", value: 6 },
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
          left: {
            type: "BinaryExpression",
            operator: "+",
            left: { type: "Number", value: 42 },
            right: { type: "Number", value: 7 },
          },
          right: { type: "Number", value: 6 },
        },
      },
    ],
  });
});

Deno.test("42 * 7 / 6 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "*" },
    { type: "Number", value: 7 },
    { type: "Operator", value: "/" },
    { type: "Number", value: 6 },
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
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "Number", value: 42 },
            right: { type: "Number", value: 7 },
          },
          right: { type: "Number", value: 6 },
        },
      },
    ],
  });
});

Deno.test("42 + 7 * 6 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 7 },
    { type: "Operator", value: "*" },
    { type: "Number", value: 6 },
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
            left: { type: "Number", value: 7 },
            right: { type: "Number", value: 6 },
          },
        },
      },
    ],
  });
});

Deno.test("(42 + 7) * 6 ;", () => {
  const tokens = [
    { type: "Operator", value: "(" },
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 7 },
    { type: "Operator", value: ")" },
    { type: "Operator", value: "*" },
    { type: "Number", value: 6 },
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
            right: { type: "Number", value: 7 },
          },
          right: { type: "Number", value: 6 },
        },
      },
    ],
  });
});

Deno.test("- 42 + ( - 7 ) ;", () => {
  const tokens = [
    { type: "Operator", value: "-" },
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Operator", value: "(" },
    { type: "Operator", value: "-" },
    { type: "Number", value: 7 },
    { type: "Operator", value: ")" },
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
          right: {
            type: "UnaryExpression",
            operator: "-",
            argument: { type: "Number", value: 7 },
          },
        },
      },
    ],
  });
});

Deno.test("42 = 7 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "=" },
    { type: "Number", value: 7 },
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
          right: { type: "Number", value: 7 },
        },
      },
    ],
  });
});

Deno.test("42 ~= 7 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "~=" },
    { type: "Number", value: 7 },
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
          operator: "~=",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 7 },
        },
      },
    ],
  });
});

Deno.test("42 < 7 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "<" },
    { type: "Number", value: 7 },
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
          right: { type: "Number", value: 7 },
        },
      },
    ],
  });
});

Deno.test("42 <= 7 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: "<=" },
    { type: "Number", value: 7 },
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
          right: { type: "Number", value: 7 },
        },
      },
    ],
  });
});

Deno.test("42 > 7 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: ">" },
    { type: "Number", value: 7 },
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
          operator: ">",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 7 },
        },
      },
    ],
  });
});

Deno.test("42 >= 7 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: ">=" },
    { type: "Number", value: 7 },
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
          operator: ">=",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 7 },
        },
      },
    ],
  });
});

Deno.test("42 ; 7 ;", () => {
  const tokens = [
    { type: "Number", value: 42 },
    { type: "Operator", value: ";" },
    { type: "Number", value: 7 },
    { type: "Operator", value: ";" },
  ];

  const ast = parse(tokens);

  assertEquals(ast, {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: { type: "Number", value: 42 },
      },
      { type: "ExpressionStatement", expression: { type: "Number", value: 7 } },
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
        type: "VariableDeclaration",
        identifier: { type: "Identifier", value: "x" },
        expression: { type: "Number", value: 42 },
      },
    ],
  });
});

Deno.test("set x = 42 ;", () => {
  const tokens = [
    { type: "Keyword", value: "set" },
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
        type: "SetStatement",
        identifier: "x",
        expression: { type: "Number", value: 42 },
      },
    ],
  });
});
