import { tokenize } from "./lexer.js";

const fn = Deno.args[0];

const program = await Deno.readTextFile(fn);

const tokens = tokenize(program);

let result = 0;

if (tokens[0].type === "Number") {
  result = tokens[0].value;
} else {
  throw new Error("syntax error");
}

let i = 1;
while (i < tokens.length) {
  const token = tokens[i];

  if (token.value === "+") {
    i++;
    if (i < tokens.length && tokens[i].type === "Number") {
      result += tokens[i].value;
      i++;
    } else {
      throw new Error("syntax error");
    }
  }
}

console.log("Result: ", result);
