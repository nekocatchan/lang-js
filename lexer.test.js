import { tokenize } from "./lexer.js";
import { assertEquals } from "jsr:@std/assert";

const testCases = [
  {
    input: "42",
    expected: [{ type: "Number", value: 42 }],
  },
  {
    input: "42 + 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: "+" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "42 - 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: "-" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "42 * 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: "*" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "42 / 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: "/" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "-42",
    expected: [
      { type: "Operator", value: "-" },
      { type: "Number", value: 42 },
    ],
  },
  {
    input: "(42 + 7)",
    expected: [
      { type: "Operator", value: "(" },
      { type: "Number", value: 42 },
      { type: "Operator", value: "+" },
      { type: "Number", value: 7 },
      { type: "Operator", value: ")" },
    ],
  },
  {
    input: "42 < 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: "<" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "42 <= 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: "<=" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "42 > 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: ">" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "42 >= 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: ">=" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "42 = 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: "=" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "42 ~= 7",
    expected: [
      { type: "Number", value: 42 },
      { type: "Operator", value: "~=" },
      { type: "Number", value: 7 },
    ],
  },
  {
    input: "# comment",
    expected: [],
  },
  {
    input: "x + y",
    expected: [
      { type: "Identifier", value: "x" },
      { type: "Operator", value: "+" },
      { type: "Identifier", value: "y" },
    ],
  },
  {
    input: "let x = 42 ;",
    expected: [
      { type: "Keyword", value: "let" },
      { type: "Identifier", value: "x" },
      { type: "Operator", value: "=" },
      { type: "Number", value: 42 },
      { type: "Operator", value: ";" },
    ],
  },
  {
    input: "set x = 42 ;",
    expected: [
      { type: "Keyword", value: "set" },
      { type: "Identifier", value: "x" },
      { type: "Operator", value: "=" },
      { type: "Number", value: 42 },
      { type: "Operator", value: ";" },
    ],
  },
];

for (const { input, expected } of testCases) {
  Deno.test(input, () => {
    const tokens = tokenize(input);
    assertEquals(tokens, expected);
  });
}
