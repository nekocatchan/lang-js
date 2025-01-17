const interpret = (ast, env = {}) => {
  switch (ast.type) {
    case "Program":
      return interpretProgram(ast, {});

    case "Number":
      return ast.value;

    case "Identifier":
      return interpretIdentifier(ast, env);

    case "UnaryExpression":
      return interpretUnaryExpression(ast, env);

    case "BinaryExpression":
      return interpretBinaryExpression(ast, env);

    case "ExpressionStatement":
      return interpretExpressionStatement(ast, env);

    case "VariableDeclaration":
      return interpretVariableDeclaration(ast, env);

    case "Reassignment":
      return interpretReassignment(ast, env);

    default: {
      throw new Error(`Unknown AST node type: ${ast.type}`);
    }
  }
};

const interpretProgram = (ast, env) => {
  let result;

  for (const node of ast.body) {
    result = interpret(node, env);
  }

  return result;
};

const interpretIdentifier = (ast, env) => {
  const name = ast.name;

  if (!(name in env)) {
    throw new Error(`Identifier ${name} has not been declared`);
  }

  return env[name];
};

const interpretUnaryExpression = (ast, env) => {
  const argument = interpret(ast.argument, env);

  if (ast.operator === "-") {
    return -argument;
  } else {
    throw new Error(`Unknown operator: ${ast.operator}`);
  }
};

const interpretBinaryExpression = (ast, env) => {
  const left = interpret(ast.left, env);
  const right = interpret(ast.right, env);

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

const interpretExpressionStatement = (ast, env) => {
  return interpret(ast.expression, env);
};

const interpretVariableDeclaration = (ast, env) => {
  const name = ast.identifier.value;

  if (name in env) {
    throw new Error(`Identifier ${name} has already been declared`);
  }

  const value = interpret(ast.expression, env);

  env[name] = value;

  return null;
};

const interpretReassignment = (ast, env) => {
  const name = ast.identifier.value;

  if (!(name in env)) {
    throw new Error(`Identifier ${identifier} has not been declared`);
  }

  const value = interpret(ast.expression, env);

  env[name] = value;

  return null;
};

export { interpret };
