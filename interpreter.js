const interpret = (ast) => {
  switch (ast.type) {
    case "Number":
      return ast.value;

    case "UnaryExpression":
      return interpretUnaryExpression(ast);

    case "BinaryExpression": {
      return interpretBinaryExpression(ast);
    }

    default: {
      throw new Error(`Unknown AST node type: ${ast.type}`);
    }
  }
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
    case "=":
      return left === right;
    case "~=":
      return left !== right;
    default:
      throw new Error(`Unknown operator: ${ast.operator}`);
  }
};

export { interpret };
