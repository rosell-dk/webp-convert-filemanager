export const FUNCTION_CALL = -1;
export const PRIMITIVE = -4;
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
      [[ PRIMITIVE, 6 ],
      [[ PRIMITIVE, true ],
      [[ RIGHT_PAREN, ')' ],
  ]

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
      [OPERATOR, /^([\&]{1,2}|[\|]{1,2}|[\=]{2,3}|[\!][\=]{0,2}|[\>\<][\=]{0,1}|[\+\-\*\/\%\|\^])/],

      // boolean
      [PRIMITIVE, /^(true|false)/, a => (a == 'true')],

      // number
      [PRIMITIVE, /^([-+]{0,1}(?:(?:[0-9]+[.][0-9]+)|(?:[0-9]+)))/, a => parseFloat(a)],

      // string (single quotes)
      [PRIMITIVE, /^'((?:(\\')|[^'])*)'/],

      // string (double quotes)
      [PRIMITIVE, /^"((?:(\\")|[^"])*)"/],

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

      // colon (part of ternary expression)
      [COLON, /^([\:])/],
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

  static parse(tokens) {

  }
}
