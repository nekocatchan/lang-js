const isWhitespace = (c) => /[\s]/.test(c);
const isDigit = (c) => /[\d]/.test(c);

const tokenize = (input) => {
  const tokens = [];

  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (isWhitespace(char)) {
      i++;
      continue;
    }

    if (isDigit(char)) {
      let number = "";
      while (i < input.length && isDigit(input[i])) {
        number += input[i];
        i++;
      }
      tokens.push({ type: "Number", value: parseInt(number, 10) });
      continue;
    }

    if (char === "+" || char === "*" || char === "^") {
      tokens.push({ type: "Operator", value: char });
      i++;
      continue;
    }

    if (input.slice(i, i + 3) === "mod") {
      tokens.push({ type: "Operator", value: "mod" });
      i += 3;
      continue;
    }

    throw Error("syntax error");
  }

  return tokens;
};

export { tokenize };
