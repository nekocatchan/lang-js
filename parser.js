const parse = (tokens) => {
  let index = 0;

  const parsePrimary = () => {
    const token = tokens[index];
    index += 1;
    if (token.type === "Number") {
      return { type: "Number", value: token.value };
    }
    if (token.type === "Operator" && token.value === "(") {
      const node = parseAdditive();
      if (tokens[index].type === "Operator" && tokens[index].value === ")") {
        index++;
        return node;
      }
      throw new Error("Expected a closing parenthesis");
    }
    throw new Error("Expected a number or an opening parenthesis");
  };

  const parseMultiplicative = () => {
    let left = parsePrimary();

    while (
      index < tokens.length &&
      (tokens[index].value === "*" || tokens[index].value === "/")
    ) {
      const operator = tokens[index];
      index += 1;
      const right = parsePrimary();
      left = {
        type: "BinaryExpression",
        operator: operator.value,
        left,
        right,
      };
    }

    return left;
  };

  const parseUnary = () => {
    if (tokens[index].value === "-") {
      const operator = tokens[index];
      index += 1;
      const argument = parseMultiplicative();
      return {
        type: "UnaryExpression",
        operator: operator.value,
        argument,
      };
    }

    return parseMultiplicative();
  };

  const parseAdditive = () => {
    let left = parseUnary();

    while (
      index < tokens.length &&
      (tokens[index].value === "+" || tokens[index].value === "-")
    ) {
      const operator = tokens[index];
      index += 1;
      const right = parseMultiplicative();
      left = {
        type: "BinaryExpression",
        operator: operator.value,
        left,
        right,
      };
    }

    return left;
  };

  return parseAdditive();
};

export { parse };
