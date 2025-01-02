import { tokenize } from "./lexer.js";
import { assertEquals } from "jsr:@std/assert";

Deno.test("足し算", () => {
  const tokens = tokenize("42+10");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "+" },
    { type: "Number", value: 10 },
  ]);
});

Deno.test("引き算", () => {
  const tokens = tokenize("42-10");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "-" },
    { type: "Number", value: 10 },
  ]);
});

Deno.test("42 * 8", () => {
  const tokens = tokenize("42 * 8");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "*" },
    { type: "Number", value: 8 },
  ]);
});

Deno.test("42 / 8", () => {
  const tokens = tokenize("42 / 8");
  assertEquals(tokens, [
    { type: "Number", value: 42 },
    { type: "Operator", value: "/" },
    { type: "Number", value: 8 },
  ]);
});
