export const FUNCTION_CALL = -1;
export const FUNCTION_CALL_NO_ARGS = -2;
export const LITERAL = -4;
export const VARIABLE = -5;
export const LEFT_PAREN = -6;
export const RIGHT_PAREN = -7;
export const DOT = -8;
export const PROPERTY_ACCESSOR_LEFT = -9;
export const PROPERTY_ACCESSOR_RIGHT = -10;
export const INFIX_OP = -11;
export const PREFIX_OP = -12;

export class JSExprParser {

  /*
  Tokenize js expression

  Example:
  input: "isTrue(6==true)"
  output:
  [
      [[ FUNCTION_CALL, 'isTrue' ],
      [[ LEFT_PAREN, '(' ],
      [[ LITERAL, 6 ],
      [[ LITERAL, true ],
      [[ RIGHT_PAREN, ')' ],
  ]

  ECMA spec:
  https://tc39.es/ecma262/#sec-punctuators
  Look in chapter 12

    */

  static tokenize(expr) {
    var pos;
    var functionLevel = 0;

    // We eat up the formula from left to right
    // meal contains what is not yet eaten
    var meal = expr.trim();

    var tokens = []

    var reSniffFunction = /^([a-zA-Z_]+)\(/


    // PS: The token value will be set to the first match
    var regExes = [

      // function call without arguments
      [FUNCTION_CALL_NO_ARGS, /^([a-zA-Z_]+)\(\s*\)/],

      // function call
      [FUNCTION_CALL, /^([a-zA-Z_]+)(\()/],

      //operators: +, -, *, /, %, &, |, ^, !, &&, ||, =, !=, ==, !==, ===, >, <, >=, >=, **, ??, ?, <<, >>, >>>, ~ and comma (,)
      // TODO: *=, |=, <<, etc (see https://github.com/lydell/js-tokens#punctuator)
      //[OPERATOR, /^([\<]{2}|[\>]{2,3}|[\*]{1,2}|[\?]{1,2}|[\&]{1,2}|[\|]{1,2}|[\=]{2,3}|[\!][\=]{0,2}|[\>\<][\=]|[\+\-\/\%\|\^\>\<\=\~])/],

      // infix operator
      [INFIX_OP, /^([\<]{2}|[\>]{2,3}|[\*]{1,2}|[\?]{1,2}|[\&]{1,2}|[\|]{1,2}|[\=]{2,3}|[\!][\=]{1,2}|[\>\<][\=]|[\+\-\/\%\|\^\>\<\=\,])/],

      // prefix operator
      [PREFIX_OP, /^([\!\~])/],

      // boolean
      [LITERAL, /^(true|false)/, a => (a == 'true')],

      // null
      [LITERAL, /^(null)/, a => null],

      // undefined
      [LITERAL, /^(undefined)/, a => undefined],

      // NaN
      [LITERAL, /^(NaN)/, a => NaN],

      // number
      [LITERAL, /^([-+]{0,1}(?:(?:[0-9]+[.][0-9]+)|(?:[0-9]+)))/, a => parseFloat(a)],

      // string (single quotes)
      [LITERAL, /^'((?:(\\')|[^'])*)'/],

      // string (double quotes)
      [LITERAL, /^"((?:(\\")|[^"])*)"/],

      // variable
      [VARIABLE, /^([a-zA-Z_]+)/],

      // left paren
      [LEFT_PAREN, /^([\(])/],

      // right paren
      [RIGHT_PAREN, /^([\)])/],

      // property accessor (dot)
      [DOT, /^([\.])/],

      // property accessor (left)
      [PROPERTY_ACCESSOR_LEFT, /^([\[])/],

      // property accessor (right)
      [PROPERTY_ACCESSOR_RIGHT, /^([\]])/],

      // ternary
      //[TERNARY, /^([\?])/],

      // colon (part of ternary expression or )
      //[COLON, /^([\:])/],

      // TODO:
      // Object literals, array litterals
    ]

    var i=0;

    mainloop:
    while ((meal != '') && (i<99)) {
      meal = meal.trimLeft();
      //console.log('meal:', meal);
      i++


      for (var j=0; j<regExes.length; j++) {
        let arr = regExes[j];
        let re = arr[1];

        if (re.test(meal)) {
          var result = re.exec(meal);
          if (result != null) {
            //console.log('regex result:', result);
            let wholeMatch = result[0];
            let tokenValue = result[1];
            let eat = wholeMatch.length;
            if (result[2]) {
              eat -= result[2].length;
            }

            meal = meal.substr(eat);

            // If a translation function is defined, run it
            if (arr[2]) {
              tokenValue = arr[2](tokenValue);
            }
            //console.log('got:' + tokenValue + '(type:' + arr[0] + '). meal is now:' + meal);
            tokens.push([arr[0], tokenValue]);
            continue mainloop;
          }
        }
      }
    }

    return tokens;
    //return ExpressionParser.parseTokens(tokens);
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
  static precendence = [
    ',',
    '?',
    '??',
    '||',
    '&&',
    '|',
    '^',
    '&',
    ['==', '!=', '===', '!=='],
    ['<', '>', '<=', '>='],
    ['<<', '>>', '>>>'],
    ['+', '-'],
    ['*', '/', '%'],
    '**',
    ['!', '~']  // todo: unary negation and unary plus
  ];

  static rightAssociative = [
    '?',
    '**',
    '!', '~'
  ];

  static ops = {
    ',': (a,b) => {
      if (a.forEach) {
        a.push(b);
        return a;
      } else {
        return [a,b];
      }
    },
    '??': (a, b) => a ?? b,
    '||': (a, b) => a || b,
    '&&': (a, b) => a && b,
    '|': (a, b) => a | b,
    '^': (a, b) => a ^ b,
    '&': (a, b) => a & b,
    '==': (a, b) => a == b,
    '!=': (a, b) => a != b,
    '===': (a, b) => a === b,
    '!==': (a, b) => a !== b,
    '<': (a, b) => a < b,
    '>': (a, b) => a > b,
    '<=': (a, b) => a <= b,
    '>=': (a, b) => a >= b,
    '<<': (a, b) => a << b,
    '>>': (a, b) => a >> b,
    '>>>': (a, b) => a >>> b,
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
    '**': (a, b) => a ** b,
    '!': (a) => !a,
    '~': (a) => ~a,
  };

  static functions = {
    'inArray': (arr, value) => b.inArray(a),
  }

  static addFunction(functionName, f) {
    JSExprParser.functions[functionName] = f;
  }

  static isInfix(token) {
    return (token[0] == INFIX_OP);
  }

  static isPrefix(token) {
    return (token[0] == PREFIX_OP);
  }

  static isOperator(token) {
    return ((token[0] == INFIX_OP) || (token[0] == PREFIX_OP));
  }

  static isFunctionCall(token) {
    return ((token[0] == FUNCTION_CALL) || (token[0] == FUNCTION_CALL_NO_ARGS));
  }

  static isOperatorOrFunctionCall(token) {
    return JSExprParser.isOperator(token) || JSExprParser.isFunctionCall(token);
  }

  static getPrecedence(token) {
    switch (token[0]) {
      case FUNCTION_CALL:
      case FUNCTION_CALL_NO_ARGS:
        return 100;
      case INFIX_OP:
      case PREFIX_OP:
        return JSExprParser.precendenceHash[token[1]];
      case LITERAL:
        return -1
    }
  }

  static isRightAssociative(token) {
    // TODO: implement.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
    return JSExprParser.rightAssociative.indexOf(token[1]) > -1;
  }

  static precendenceHash = null;

  static createPrecendenceHash(tokens) {
    if (JSExprParser.precendenceHash !== null) {
      return;
    }
    JSExprParser.precendenceHash = {};
    JSExprParser.precendence.forEach(function(op, precendence) {
      if (op.forEach) {
        op.forEach(function(op) {
          JSExprParser.precendenceHash[op] = precendence;
        });
      } else {
        JSExprParser.precendenceHash[op] = precendence;
      }
    });
  }

  /**
   *  Generate parse tree based on precedence
   */
  static parseTokens(tokens) {
    JSExprParser.pointer = 0;
    return JSExprParser.parse1(tokens, tokens[0], -1);
    // https://en.wikipedia.org/wiki/Operator-precedence_parser
    /*
    return parse_expression_1(parse_primary(), 0)
    */
  }

  /**
   *  Reorder tokens to create reverse polish notation
   *
   */
  static stringToRpn(s) {
    let tokens = JSExprParser.tokenize(s);

    // Strip off token meta
    //tokens = tokens.map(function(a) {return a[1]});


    return JSExprParser.tokensToRpn(tokens);
    // https://en.wikipedia.org/wiki/Operator-precedence_parser
    /*
    return parse_expression_1(parse_primary(), 0)
    */
  }

  /**
   *  Reorder tokens to create reverse polish notation
   *
   */
  static tokensToRpn(tokens) {
    //console.log('tokensToRpn', tokens.map(function(a) {return a[1]}));
    //console.log('tokensToRpn', tokens);
    JSExprParser.createPrecendenceHash();


    let tokensMoved = [];

    loop1:
    for (let pointer=0; pointer<tokens.length; pointer++) {
      let token = tokens[pointer];
      //console.log('token:', token);

      // Move operators right. [1,'+',2] => [1, 2, '+']'
      if (JSExprParser.isOperatorOrFunctionCall(token)) {
        let precedence = JSExprParser.getPrecedence(token);


        let delta = 0;
        let nextToken = '';


        // - Do not move past operators with lower precedence, but move past operators
        //     with highter precendence.
        //     ie: 1+2*3=4. First + must be moved past the *, but not past the =.
        // - In case of same precedence:
        //     if operator is left associative: stop
        //     ie: 1+2-3 must be treated as (1+2)-3, outputting 1 2 + 3 -
        //     if operator is right associative: continue
        //     ie: 1<2>3 must be treated as 1<(2>3), outputting: 1 2 3 > <
        // - Do not move past more closing paren than opening paren. And when opening paren
        //     > closing, move past it all.
        //     ie: (1+2)*3. Plus is only moved to closing paren
        //     ie: (1+(2=3)*4)*5. Plus is moved after 4 - passing the "="

        let parenDepth = 0;

        loop2:
        for (delta=0; (pointer+delta)<tokens.length-1; delta++) {
          nextToken = tokens[pointer+delta+1];
          //console.log('examining:', nextToken, 'parenDepth:', parenDepth);
          if (nextToken[1] == ')') {
            parenDepth--;
            if (parenDepth < 0) {
              break;
            } else {
              continue;
            }
          } else if (nextToken[1] == '(') {
            parenDepth++;
            continue;
          }
          if (parenDepth>0) {
            continue;
          }

          if (nextToken == undefined) {
            console.log('Warning: ran too long. This should not happen');
            break;
          }

          if (!JSExprParser.isOperatorOrFunctionCall(nextToken)) {
            continue;
          }
          let precendenceNext = JSExprParser.getPrecedence(nextToken);
          //console.log('precedences:', precedence, precendenceNext)

          if (precedence < precendenceNext) {
            continue;
          }
          if (precedence == precendenceNext) {
            if (!JSExprParser.isRightAssociative(nextToken)) {
              break;
            }
            if (tokensMoved.indexOf(nextToken) >= 0) {
              break;
            }
            continue;
          }

          break;
        }

        if (delta > 0 ) {
          //console.log('moving:', token[1], "after", nextToken[1], "delta:", delta);

          // delete
          let deleted = tokens.splice(pointer, 1);
          tokensMoved.push(deleted[0]);

          //console.log('deleted', deleted[0]);
          // insert
          tokens.splice(pointer+delta, 0, deleted[0]);
          //console.log('after move:', tokens.map(function(a) {return a[1]}));

          // move pointer one back, because we have just deleted the token at the place,
          // so the next token is now at pointer
          pointer--;
        }
      }
    }

    // remove paren
    tokens = tokens.filter(a => !((a[1]=='(')||(a[1]==')')));
    //console.log('parens removed:', tokens.map(function(a) {return a[1]}));

    return tokens;
  }

  /**
   *
   *
   */
  static evaluateRpn(rpnTokens) {
    //console.log('evaluateRpn', rpnTokens);
    //console.log('evaluateRpn', rpnTokens.map(function(a) {return a[1]}));
    let stack = [];
    let a,b;
    for (let i=0; i<rpnTokens.length; i++) {
      let token = rpnTokens[i];
      let tokenType = token[0];
      let tokenValue = token[1];
      if (tokenType == LITERAL) {
        stack.push(tokenValue)
      } else if (JSExprParser.isInfix(token)) {
        b=stack.pop();
        a=stack.pop();
        let result = JSExprParser.ops[tokenValue](a, b);
        stack.push(result);
        //console.log('Performed infix op:', a, b, tokenValue, 'result:', result, 'stack:', stack);
      } else if (JSExprParser.isPrefix(token)) {
        a=stack.pop();
        let result = JSExprParser.ops[tokenValue](a);
        stack.push(result);
        //console.log('Performed prefix op:', a, tokenValue, 'result:', result, 'stack:', stack);
      } else if (JSExprParser.isFunctionCall(token)) {
        let functionName = token[1];
        if (token[0] == FUNCTION_CALL_NO_ARGS) {
          stack.push(JSExprParser.functions[functionName]());
        } else {
          let popped = stack.pop();
          let arr = [];
          if (Array.isArray(popped)) {
            arr = popped;
          } else {
            arr.push(popped);
          }
          stack.push(JSExprParser.functions[functionName](... arr));

        }
      }
    }
    //console.log('result', stack);
    return stack[0];
  }

}
