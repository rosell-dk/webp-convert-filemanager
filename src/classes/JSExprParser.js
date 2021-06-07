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

  static precendence = [
    '+',
    '*'
  ];

  static infix = [
    '+',
    '*'
  ];

  static isInfix(token) {
    return (JSExprParser.infix.indexOf(token[1]) > -1);
  }

  static getPrecedence(token) {
    return JSExprParser.precendenceHash[token[1]];
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

  /**
   *  Generate parse tree based on precedence
   */
  static parseTokens(tokens) {
    JSExprParser.precendence.forEach(function(op, precendence) {
      JSExprParser.precendenceHash[op] = precendence;
    });
    JSExprParser.pointer = 0;
    return JSExprParser.parse1(tokens, tokens[0], -1);
    // https://en.wikipedia.org/wiki/Operator-precedence_parser
    /*
    return parse_expression_1(parse_primary(), 0)
    */
  }
}
