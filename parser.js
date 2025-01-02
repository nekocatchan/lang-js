const parse = (tokens) => {
  let index = 0;

  const parsePrimary = () => {
    const token = tokens[index++];
    if (token.type === "Number") {
      return { type: "Number", value: token.value };
    }
    throw new Error("Expected a number");
  };

  const parseMultiplicative = () => {
    let left = parsePrimary();

    while (index < tokens.length && tokens[index].value === "*") {
      const operator = tokens[index++];

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

  const parseAdditive = () => {
    let left = parseMultiplicative();

    while (index < tokens.length && tokens[index].value === "+") {
      const operator = tokens[index++];

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
