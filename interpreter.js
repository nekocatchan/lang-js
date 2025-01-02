const interpret = (ast) => {
  switch (ast.type) {
    case "Number": {
      return ast.value;
    }

    case "UnaryExpression": {
      const argument = interpret(ast.argument);

      switch (ast.operator) {
        case "-": {
          return -argument;
        }
        default: {
          throw new Error(`Unknown operator: ${ast.operator}`);
        }
      }
    }

    case "BinaryExpression": {
      const left = interpret(ast.left);
      const right = interpret(ast.right);

      switch (ast.operator) {
        case "+": {
          return left + right;
        }
        case "-": {
          return left - right;
        }
        case "*": {
          return left * right;
        }
        case "/": {
          return left / right;
        }
        default: {
          throw new Error(`Unknown operator: ${ast.operator}`);
        }
      }
    }

    default: {
      throw new Error(`Unknown AST node type: ${ast.type}`);
    }
  }
};

export { interpret };
