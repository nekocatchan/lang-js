import { interpret } from "./interpreter.js";
import { assertEquals } from "@std/assert";

Deno.test("42 + 8 + 50 ;", () => {
  const ast = {
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
  };

  const result = interpret(ast);

  assertEquals(result, 100);
});

Deno.test("42 - 8 - 50 ;", () => {
  const ast = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "-",
          left: {
            type: "BinaryExpression",
            operator: "-",
            left: { type: "Number", value: 42 },
            right: { type: "Number", value: 8 },
          },
          right: { type: "Number", value: 50 },
        },
      },
    ],
  };

  const result = interpret(ast);

  assertEquals(result, -16);
});

Deno.test("42 * 8 * 50 ;", () => {
  const ast = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "*",
          left: {
            type: "BinaryExpression",
            operator: "*",
            left: { type: "Number", value: 42 },
            right: { type: "Number", value: 8 },
          },
          right: { type: "Number", value: 50 },
        },
      },
    ],
  };

  const result = interpret(ast);

  assertEquals(result, 16800);
});

Deno.test("42 / 6 ;", () => {
  const ast = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "/",
          left: { type: "Number", value: 42 },
          right: { type: "Number", value: 6 },
        },
      },
    ],
  };

  const result = interpret(ast);

  assertEquals(result, 7);
});

Deno.test("-42+10 ;", () => {
  const ast = {
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
  };

  const result = interpret(ast);

  assertEquals(result, -32);
});

Deno.test("42 = 38 + 4 ;", () => {
  const ast = {
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
  };

  const result = interpret(ast);

  assertEquals(result, true);
});

Deno.test("42 ~= 38 + 4 ;", () => {
  const ast = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "~=",
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
  };

  const result = interpret(ast);

  assertEquals(result, false);
});

Deno.test("42 < 32 ;", () => {
  const ast = {
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
  };

  const result = interpret(ast);

  assertEquals(result, false);
});

Deno.test("42 <= 32 ;", () => {
  const ast = {
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
  };

  const result = interpret(ast);

  assertEquals(result, false);
});

Deno.test("42 + 8 ; \n 50 - 10 ;", () => {
  const ast = {
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
  };

  const result = interpret(ast);

  assertEquals(result, 40);
});

Deno.test("変数", () => {
  // let x = 42 ;
  // x + 8 ; # expect 50
  const ast = {
    type: "Program",
    body: [
      {
        type: "LetStatement",
        identifier: "x",
        expression: { type: "Number", value: 42 },
      },
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: { type: "Identifier", name: "x" },
          right: { type: "Number", value: 8 },
        },
      },
    ],
  };

  const result = interpret(ast);

  assertEquals(result, 50);
});

Deno.test("変数再代入", () => {
  // let x = 42 ;
  // set x = 50 ;
  // x + 8 ; # expect 58
  const ast = {
    type: "Program",
    body: [
      {
        type: "LetStatement",
        identifier: "x",
        expression: { type: "Number", value: 42 },
      },
      {
        type: "SetStatement",
        identifier: "x",
        expression: { type: "Number", value: 50 },
      },
      {
        type: "ExpressionStatement",
        expression: {
          type: "BinaryExpression",
          operator: "+",
          left: { type: "Identifier", name: "x" },
          right: { type: "Number", value: 8 },
        },
      },
    ],
  };

  const result = interpret(ast);

  assertEquals(result, 58);
});
