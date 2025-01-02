const isWhitespace = (c) => /\s/.test(c);
const isDigit = (c) => /\d/.test(c);

const tokenize = (input) => {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (isWhitespace(char)) {
      i += 1;
      continue;
    }

    if (char === ";") {
      while (i < input.length && input[i] !== "\n") {
        i += 1;
      }
      continue;
    }

    if (isDigit(char)) {
      let number = "";
      while (i < input.length && isDigit(input[i])) {
        number += input[i];
        i += 1;
      }
      tokens.push({ type: "Number", value: parseInt(number, 10) });
      continue;
    }

    if (input.slice(i, i + 2) === "<=") {
      tokens.push({ type: "Operator", value: "<=" });
      i += 2;
      continue;
    }

    if (input.slice(i, i + 2) === ">=") {
      tokens.push({ type: "Operator", value: ">=" });
      i += 2;
      continue;
    }

    if ("+-*/()=<>".includes(char)) {
      tokens.push({ type: "Operator", value: char });
      i++;
      continue;
    }

    if (input.slice(i, i + 2) === "~=") {
      tokens.push({ type: "Operator", value: "~=" });
      i += 2;
      continue;
    }

    throw Error(`Unexpected character: ${char}`);
  }

  return tokens;
};

export { tokenize };
