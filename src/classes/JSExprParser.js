export const FUNCTION_CALL = -1;
export const LITERAL = -4;
export const OPERATOR = -3;
export const VARIABLE = -5;
export const LEFT_PAREN = -6;
export const RIGHT_PAREN = -7;
export const DOT = -8;
export const PROPERTY_ACCESSOR_LEFT = -9;
export const PROPERTY_ACCESSOR_RIGHT = -10;
export const TERNARY = -11;
export const COLON = -12;

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

      //operators: +, -, *, /, %, &, |, ^, !, &&, ||, =, !=, ==, !==, ===, >, <, >=, >=
      // TODO: *=, |=, <<, etc (see https://github.com/lydell/js-tokens#punctuator)
      [OPERATOR, /^([\&]{1,2}|[\|]{1,2}|[\=]{2,3}|[\!][\=]{0,2}|[\>\<][\=]{0,1}|[\+\-\*\/\%\|\^])/],

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
      [TERNARY, /^([\?])/],

      // colon (part of ternary expression or )
      [COLON, /^([\:])/],

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
    '<',
    '+',
    '*',
    '/',
    '!'
  ];

  static infix = [
    '+',
    '*',
    '<',
  ];

  static prefix = [
    '!',
  ];

  static isInfix(token) {
    return (JSExprParser.infix.indexOf(token[1]) > -1);
  }

  static isInfix1(token) {
    return (JSExprParser.infix.indexOf(token) > -1);
  }

  static isPrefix(token) {
    return (JSExprParser.prefix.indexOf(token) > -1);
  }

  static getPrecedence(token) {
    return JSExprParser.precendenceHash[token[1]];
  }

  static getPrecedence1(token) {
    return JSExprParser.precendenceHash[token];
  }

  static associativity(token) {
    // TODO: implement.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
    return 'left';
  }

  static precendenceHash = {};

  static pointer = 0;

  /**
   *  Generate parse tree based on precedence
   *
   */
  static parse1(tokens, lhs, minPrecedence) {

    // NO, it seems it is not necessary to create tree after all.
    // We can convert to RPN without making tree.
    // Check out "tokensToRpn" method in ExpressionParser - we can base our
    // code on that code.
    // (ternary will have to be added)

    console.log('parse1');
    console.log('lhs:', lhs[1]);
    console.log('current:', tokens[JSExprParser.pointer][1]);

    let lookahead = tokens[JSExprParser.pointer + 1];

    while (
      (JSExprParser.pointer<tokens.length) &&
      JSExprParser.isInfix(lookahead) &&
      (JSExprParser.getPrecedence(lookahead) >= minPrecedence)
    ) {

      console.log('lookahead:', lookahead[1])


      let op = lookahead;
      JSExprParser.pointer++;

      if (JSExprParser.pointer+2 < tokens.length) {
        let rhs = tokens[JSExprParser.pointer + 1];
        console.log('rhs:', rhs[1])
        JSExprParser.pointer++;

        lookahead = tokens[JSExprParser.pointer + 1];

        console.log('look:', lookahead[1])

        while (
          (JSExprParser.pointer<tokens.length) &&
          JSExprParser.isInfix(lookahead) &&
          (JSExprParser.getPrecedence(lookahead) > JSExprParser.getPrecedence(op))
        ) {
          console.log('entering inner loop')
          rhs = JSExprParser.parse1(tokens, rhs, minPrecedence+1, JSExprParser.pointer+3)

          JSExprParser.pointer++;
          lookahead = tokens[JSExprParser.pointer];
        }
        lhs = {left: lhs, op: op, right: rhs};
        //console.log(op, precendence);
      }

    }
    return lhs;

    // https://en.wikipedia.org/wiki/Operator-precedence_parser
    /*
  parse_expression_1(lhs, min_precedence)
    lookahead := peek next token
    while lookahead is a binary operator whose precedence is >= min_precedence
        op := lookahead
        advance to next token
        rhs := parse_primary ()
        lookahead := peek next token
        while lookahead is a binary operator whose precedence is greater
                 than op's, or a right-associative operator
                 whose precedence is equal to op's
            rhs := parse_expression_1 (rhs, min_precedence + 1)
            lookahead := peek next token
        lhs := the result of applying op with operands lhs and rhs
    return lhs
    */


  }


  static parse(s) {
    console.log('tokens', JSExprParser.tokenize(s));
    return JSExprParser.parseTokens(
      JSExprParser.tokenize(s)
    )
  }

  static createPrecendenceHash(tokens) {
    JSExprParser.precendence.forEach(function(op, precendence) {
      JSExprParser.precendenceHash[op] = precendence;
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
    tokens = tokens.map(function(a) {return a[1]});


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
    console.log(tokens);
    JSExprParser.createPrecendenceHash();

    loop1:
    for (let pointer=0; pointer<tokens.length; pointer++) {
      let token = tokens[pointer];
      if (JSExprParser.isInfix1(token) || JSExprParser.isPrefix(token)) {
        let precedence = JSExprParser.getPrecedence1(token);


        let delta = 0;
        let nextToken = '';


        loop2:
        //for (let delta=pointer+1; delta<tokens.length; delta++) {

        while (delta+pointer<tokens.length-1) {
          nextToken = tokens[pointer+delta+1];
          //console.log('next:', nextToken, 'delta:', delta);
          if (!(JSExprParser.isInfix1(nextToken) || JSExprParser.isPrefix(nextToken))) {
            delta++;
            continue loop2;
          }

          if (precedence < JSExprParser.getPrecedence1(nextToken)) {
            delta++;
            continue loop2;
          }
          break;
        }
        //console.log(delta);
        if (delta > 0 ) {
          console.log('moving:', token, delta, nextToken);

          // delete
          let deleted = tokens.splice(pointer, 1);
console.log('deleted', deleted[0]);
          // insert
          tokens.splice(pointer+delta, 0, deleted[0]);
          console.log('after move:', tokens);

          // move pointer one back, because we have just deleted the token at the place,
          // so the next token is now at pointer
          pointer--;
        }


        /*
        for (let delta=pointer+1; delta<tokens.length; delta++) {
          let nextToken = tokens[delta];
          console.log('2', nextToken, JSExprParser.getPrecedence1(nextToken))
          if (JSExprParser.isInfix1(nextToken)) {
            console.log('HELLE', precedence, )
          }
        }*/

//        console.log(token);
      }
    }
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
    let stack = [];
    let a,b;
    for (let i=0; i<rpnTokens.length; i++) {
      let token = rpnTokens[i];
      switch (token) {
        case '+':
          a=stack.pop();
          b=stack.pop();
          stack.push(a+b);
          break;
        case '*':
          a=stack.pop();
          b=stack.pop();
          stack.push(a*b);
          break;
        default:
          stack.push(token)
      }
    }
    console.log('result', stack[0]);
    return stack[0];
  }

}
