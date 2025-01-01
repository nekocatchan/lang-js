const fn = Deno.args[0];

const program = await Deno.readTextFile(fn);

console.log(program);
