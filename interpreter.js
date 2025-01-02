const interpret = (ast) => {
  switch (ast.type) {
    case "Number": {
      return ast.value;
    }

    case "BinaryExpression": {
      const left = interpret(ast.left);
      const right = interpret(ast.right);

      if (ast.operator === "+") {
        return left + right;
      }

      throw new Error(`Unknown operator: ${ast.operator}`);
    }

    default: {
      throw new Error(`Unknown AST node type: ${ast.type}`);
    }
  }
};

export { interpret };
