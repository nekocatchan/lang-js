const parse = (tokens) => {
  let index = 0;

  const parsePrimary = () => {
    const token = tokens[index++];
    if (token.type === "Number") {
      return { type: "Number", value: token.value };
    }
    throw new Error("Expected a number");
  };

  const parseExpression = () => {
    let left = parsePrimary();

    while (index < tokens.length) {
      const operator = tokens[index++];
      if (operator.type !== "Operator") {
        throw new Error("Expected an operator");
      }

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

  return parseExpression();
};

export { parse };
