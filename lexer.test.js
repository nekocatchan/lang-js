import { tokenize } from "./lexer.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("足し算", () => {
  const tokens = tokenize("42+10;");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 10 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("引き算", () => {
  const tokens = tokenize("42-10;");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "-" },
    { type: "Number", value: 10 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("42 * 8;", () => {
  const tokens = tokenize("42 * 8;");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "*" },
    { type: "Number", value: 8 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("42 / 8;", () => {
  const tokens = tokenize("42 / 8;");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "/" },
    { type: "Number", value: 8 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("-42;", () => {
  const tokens = tokenize("-42;");
  assertEquals(tokens, [
    { type: "Operator", value: "-" },
    { type: "Number", value: 42 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("(42 + 8) * 50;", () => {
  const tokens = tokenize("(42 + 8) * 50;");
  assertEquals(tokens, [
    { type: "Operator", value: "(" },
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: ")" },
    { type: "Operator", value: "*" },
    { type: "Number", value: 50 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("42 = 38 + 4;", () => {
  const tokens = tokenize("42 = 38 + 4;");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "=" },
    { type: "Number", value: 38 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 4 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("42 ~= 30 + 8;", () => {
  const tokens = tokenize("42 ~= 30 + 8;");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "~=" },
    { type: "Number", value: 30 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 8 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("42 < 32;", () => {
  const tokens = tokenize("42 < 32;");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "<" },
    { type: "Number", value: 32 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("42 <= 32;", () => {
  const tokens = tokenize("42 <= 32;");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "<=" },
    { type: "Number", value: 32 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("comment", () => {
  const tokens = tokenize("42; # comment");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("let x = 42 ;", () => {
  const tokens = tokenize("let x = 42 ;");
  assertEquals(tokens, [
    { type: "Keyword", value: "let" },
    { type: "Identifier", value: "x" },
    { type: "Operator", value: "=" },
    { type: "Number", value: 42 },
    { type: "Operator", value: ";" },
  ]);
});

Deno.test("set x = 42 ;", () => {
  const tokens = tokenize("set x = 42 ;");
  assertEquals(tokens, [
    { type: "Keyword", value: "set" },
    { type: "Identifier", value: "x" },
    { type: "Operator", value: "=" },
    { type: "Number", value: 42 },
    { type: "Operator", value: ";" },
  ]);
});
