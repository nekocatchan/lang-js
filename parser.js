const parse = (tokens) => {
  let index = 0;

  const parsePrimary = () => {
    const token = tokens[index];
    index += 1;
    if (token.type === "Number") {
      return { type: "Number", value: token.value };
    }
    if (token.type === "Identifier") {
      return { type: "Identifier", name: token.value };
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

  const parseRelational = () => {
    let left = parseAdditive();

    while (
      index < tokens.length &&
      (tokens[index].value === "<" || tokens[index].value === ">" ||
        tokens[index].value === "<=" || tokens[index].value === ">=")
    ) {
      const operator = tokens[index];
      index += 1;
      const right = parseAdditive();
      left = {
        type: "BinaryExpression",
        operator: operator.value,
        left,
        right,
      };
    }

    return left;
  };

  const parseEquality = () => {
    let left = parseRelational();

    while (
      index < tokens.length &&
      (tokens[index].value === "=" || tokens[index].value === "~=")
    ) {
      const operator = tokens[index];
      index += 1;
      const right = parseRelational();
      left = {
        type: "BinaryExpression",
        operator: operator.value,
        left,
        right,
      };
    }

    return left;
  };

  const parseExpression = () => {
    return parseEquality();
  };

  const parseExpressionStatement = () => {
    const expression = parseExpression();
    if (tokens[index].type === "Operator" && tokens[index].value === ";") {
      index += 1;
      return { type: "ExpressionStatement", expression };
    }
    throw new Error("Expected a semicolon");
  };

  const parseLetStatement = () => {
    if (tokens[index].type !== "Keyword" || tokens[index].value !== "let") {
      throw new Error("Expected a let keyword");
    }
    index += 1;
    if (tokens[index].type !== "Identifier") {
      throw new Error("Expected an identifier");
    }
    const identifier = tokens[index].value;
    index += 1;
    if (tokens[index].type !== "Operator" || tokens[index].value !== "=") {
      throw new Error("Expected an equal sign");
    }
    index += 1;
    const expression = parseExpression();
    if (tokens[index].type !== "Operator" || tokens[index].value !== ";") {
      throw new Error("Expected a semicolon");
    }
    index += 1;
    return { type: "LetStatement", identifier, expression };
  };

  const parseStatement = () => {
    if (tokens[index].type === "Keyword" && tokens[index].value === "let") {
      return parseLetStatement();
    }

    return parseExpressionStatement();
  };

  const parseProgram = () => {
    const body = [];
    while (index < tokens.length) {
      body.push(parseStatement());
    }
    return { type: "Program", body };
  };

  return parseProgram();
};

export { parse };
