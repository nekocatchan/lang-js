let environment = {};

const interpret = (ast) => {
  if (ast.type === "Program") {
    environment = {};

    let result;

    for (const node of ast.body) {
      result = interpret(node);
    }
    return result;
  }

  switch (ast.type) {
    case "Number":
      return ast.value;

    case "Identifier":
      return interpretIdentifier(ast);

    case "UnaryExpression":
      return interpretUnaryExpression(ast);

    case "BinaryExpression":
      return interpretBinaryExpression(ast);

    case "ExpressionStatement":
      return interpretExpressionStatement(ast);

    case "LetStatement":
      return interpretLetStatement(ast);

    case "SetStatement":
      return interpretSetStatement(ast);

    default: {
      throw new Error(`Unknown AST node type: ${ast.type}`);
    }
  }
};

const interpretIdentifier = (ast) => {
  const name = ast.name;

  if (!(name in environment)) {
    throw new Error(`Identifier ${name} has not been declared`);
  }

  return environment[name];
};

const interpretUnaryExpression = (ast) => {
  const argument = interpret(ast.argument);

  if (ast.operator === "-") {
    return -argument;
  } else {
    throw new Error(`Unknown operator: ${ast.operator}`);
  }
};

const interpretBinaryExpression = (ast) => {
  const left = interpret(ast.left);
  const right = interpret(ast.right);

  switch (ast.operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    case "<":
      return left < right;
    case "<=":
      return left <= right;
    case ">":
      return left > right;
    case ">=":
      return left >= right;
    case "=":
      return left === right;
    case "~=":
      return left !== right;
    default:
      throw new Error(`Unknown operator: ${ast.operator}`);
  }
};

const interpretExpressionStatement = (ast) => {
  return interpret(ast.expression);
};

const interpretLetStatement = (ast) => {
  const identifier = ast.identifier;

  if (identifier in environment) {
    throw new Error(`Identifier ${identifier} has already been declared`);
  }

  const value = interpret(ast.expression);

  environment[identifier] = value;

  return null;
};

const interpretSetStatement = (ast) => {
  const identifier = ast.identifier;

  if (!(identifier in environment)) {
    throw new Error(`Identifier ${identifier} has not been declared`);
  }

  const value = interpret(ast.expression);

  environment[identifier] = value;

  return null;
};

export { interpret };
