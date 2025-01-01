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
