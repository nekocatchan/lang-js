import { interpret } from "./interpreter.js";
import { tokenize } from "./lexer.js";
import { parse } from "./parser.js";

const fn = Deno.args[0];

const program = await Deno.readTextFile(fn);

const tokens = tokenize(program);
const ast = parse(tokens);
const result = interpret(ast);

console.log("Result: ", result);
