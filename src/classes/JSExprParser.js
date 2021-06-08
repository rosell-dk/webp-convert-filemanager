export const FUNCTION_CALL = -1;
export const LITERAL = -4;
export const OPERATOR = -3;
export const VARIABLE = -5;
export const LEFT_PAREN = -6;
export const RIGHT_PAREN = -7;
export const DOT = -8;
export const PROPERTY_ACCESSOR_LEFT = -9;
export const PROPERTY_ACCESSOR_RIGHT = -10;

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

      // function start
      [FUNCTION_CALL, /^([a-zA-Z_]+)(\()/],

      //operators: +, -, *, /, %, &, |, ^, !, &&, ||, =, !=, ==, !==, ===, >, <, >=, >=, **, ??, ?, <<, >>, >>>, ~
      // TODO: *=, |=, <<, etc (see https://github.com/lydell/js-tokens#punctuator)
      [OPERATOR, /^([\<]{2}|[\>]{2,3}|[\*]{1,2}|[\?]{1,2}|[\&]{1,2}|[\|]{1,2}|[\=]{2,3}|[\!][\=]{0,2}|[\>\<][\=]|[\+\-\/\%\|\^\>\<\=\~])/],

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
    '^',  // xor
    '&',
    ['==', '!=', '===', '!=='],
    ['<', '>', '<=', '>='],
    ['<<', '>>', '>>>'],
    ['+', '-'],
    ['*', '/', '%'],
    '**',
    ['!', '~']  // todo: unary negation and unary plus
  ];

  static infix = [
    ',',
    '?',
    '??',
    '||',
    '&&',
    '|',
    '^',
    '&',
    '==', '!=', '===', '!==',
    '<', '>', '<=', '>=',
    '<<', '>>', '>>>',
    '+', '-',
    '*', '/', '%',
    '**',
  ];

  static prefix = [
    '!', '~'
  ];

  static rightAssociative = [
    '?',
    '**',
    '!', '~'
  ];

  static ops = {
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
    '~': (a) => ~a
  };

  static isInfix(token) {
    return (JSExprParser.infix.indexOf(token[1]) > -1);
  }

  static isPrefix(token) {
    return (JSExprParser.prefix.indexOf(token[1]) > -1);
  }

  static getPrecedence(token) {
    return JSExprParser.precendenceHash[token[1]];
  }

  static isRightAssociative(token) {
    // TODO: implement.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
    return JSExprParser.rightAssociative.indexOf(token[1]) > -1;
  }

  static precendenceHash = {};

  static createPrecendenceHash(tokens) {
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
    //console.log(tokens);
    JSExprParser.createPrecendenceHash();


    let tokensMoved = [];

    loop1:
    for (let pointer=0; pointer<tokens.length; pointer++) {
      let token = tokens[pointer];
      //console.log('token:', token);

      // Move operators right. [1,'+',2] => [1, 2, '+']'
      if (JSExprParser.isInfix(token) || JSExprParser.isPrefix(token)) {
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
        //while (delta+pointer<tokens.length-1) {
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
          } else if (!(JSExprParser.isInfix(nextToken) || JSExprParser.isPrefix(nextToken))) {
            continue;
          }
          let precendenceNext = JSExprParser.getPrecedence(nextToken);

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
        //console.log(delta);
        if (delta > 0 ) {
          //console.log('moving:', token[1], "after", nextToken[1], "delta:", delta);

          // delete
          let deleted = tokens.splice(pointer, 1);
          //console.log('tokensMoved:', tokensMoved, typeof tokensMoved)
          tokensMoved.push(deleted[0]);

          //console.log('deleted', deleted[0]);
          // insert
          tokens.splice(pointer+delta, 0, deleted[0]);
          //console.log('after move:', tokens.map(function(a) {return a[1]}));

          // move pointer one back, because we have just deleted the token at the place,
          // so the next token is now at pointer
          pointer--;
        }


        /*
        for (let delta=pointer+1; delta<tokens.length; delta++) {
          let nextToken = tokens[delta];
          console.log('2', nextToken, JSExprParser.getPrecedence(nextToken))
          if (JSExprParser.isInfix(nextToken)) {
            console.log('HELLE', precedence, )
          }
        }*/

//        console.log(token);
      }


    }

    // remove paren
    tokens = tokens.filter(a => !((a[1]=='(')||(a[1]==')')));
    //console.log('parens removed:', tokens.map(function(a) {return a[1]}));

    return tokens;
    // https://en.wikipedia.org/wiki/Operator-precedence_parser
    /*
    return parse_expression_1(parse_primary(), 0)
    */
  }

  /**
   *
   *
   */
  static evaluateRpn(rpnTokens) {
    console.log('evaluateRpn', rpnTokens.map(function(a) {return a[1]}));
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
        console.log('Performed infix op:', a, b, tokenValue, 'result:', result, 'stack:', stack);
      } else if (JSExprParser.isPrefix(token)) {
        a=stack.pop();
        let result = JSExprParser.ops[tokenValue](a);
        stack.push(result);
        console.log('Performed prefix op:', a, tokenValue, 'result:', result, 'stack:', stack);
      }

    }
    console.log('result', stack);
    return stack[0];
  }

}
