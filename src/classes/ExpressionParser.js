export default class ExpressionParser {

  /*
  Parses expression string into objects/arrays

  Example:
  input: equals(state('option', 'try-cwebp'), true)
  output:
    {
      'type': 'equals',
      'args': [
        {
          'function': 'state',
          'args': ['option', 'try-supplied-binary-for-os']
        },
        true
      ]
    }


    */

  static parseString(expr) {
    var pos;
    var functionLevel = 0;

    /*
    First, parse into tokens
    -1: function start
    -2: function end
    -4: simple value

    example:
    input: equals(1,22)
    tokens: [-1, "equals", -4, 1, -4, 22, -2]
    */
    //console.log('parse:', expr);

    // We eat up the formula from left to right
    // meal contains what is not yet eaten
    var meal = expr.trim();

    // tokens is an array of parsed tokens
    var tokens = []

    // RegEx's for sniffing (determining if the token at the current position
    var reSniffBoolean = /^(true|false)/
    var reSniffNumber = /^[-+]?[0-9]/
    var reSniffFunction = /^([a-zA-Z_]+)\(/

    // RegEx's for parsing
    var reParseNumber = /^([-+]{0,1}(?:(?:[0-9]+[.][0-9]+)|(?:[0-9]+)))/
    var reFindString = /^"((?:[^"]|"")*)"/
    var reSingleQuoteString = /^'((?:(\\')|[^'])*)'/
    var reDoubleQuoteString = /^"((?:(\\")|[^"])*)"/
    var reUndoublequoteString = /""/

    var i=0;

    mainloop:
    while ((meal != '') && (i<99)) {
      meal = meal.trimLeft();
      //console.log('meal:', meal);
      i++

      // parse function start
      if (reSniffFunction.test(meal)) {
        functionLevel++;

        var fname = reSniffFunction.exec(meal)[1];
        tokens.push(-1);   // -1: FUNCTION_START
        tokens.push(fname)
        meal = meal.substr(meal.indexOf('(') + 1);
        continue;
      }

      // parse boolean
      if (reSniffBoolean.test(meal)) {

        tokens.push(-4);   // -4: Simple value
        if (meal.indexOf('true') == 0) {
            meal = meal.substr(4);
            tokens.push(true);
        } else {
            meal = meal.substr(5);
            tokens.push(false);
        }
        continue;
      }

      // parse number
      if (reSniffNumber.test(meal)) {
        var result = reParseNumber.exec(meal);
  //      console.log('parsing number' + meal);
  //      console.log(result);
        if (result == null) {
          return;
        }
        var n = parseFloat(result[1]);
        if (isNaN(n)) {
          return;
        }
        tokens.push(-4);   // -4: Simple value
        tokens.push(n);
        meal = meal.substr(result[0].length);
        continue;
      }

      if (reSingleQuoteString.test(meal)) {
        var result = reSingleQuoteString.exec(meal);
        tokens.push(-4);   // -4: Simple value
        tokens.push(result[1]);
        meal = meal.substr(result[0].length);
      }

      if (reDoubleQuoteString.test(meal)) {
        var result = reDoubleQuoteString.exec(meal);
        tokens.push(-4);   // -4: Simple value
        tokens.push(result[1]);
        meal = meal.substr(result[0].length);
      }



      // Currently, only doublequotes can be used for strings. Same here
      if ((meal[0] == '"') || (meal[0] == "'")) {


        // doublequotes are escaped with two doublequotes ie: "They call me ""the guy"""
        // we must skip those
        var result = reFindString.exec(meal);
        if (result == null) {
          console.log('Parser found something that looked like a string, but wasnt. Parse error!');
          return;
        }
        var str = result[1].replace(/""/g, '"');
        tokens.push(-4);   // -4: Simple value
        tokens.push(str);
  //      console.log('string value:' + str);

        meal = meal.substr(result[0].length);
        continue;
      }

      // Our parsers haven't found anything.
      // Hand leftovers to the custom parsers
      /*
      var isAtEndOfFunction = ((functionLevel > 0) && ((meal[0] == ',') || (meal[0] == ')')));
      if (!isAtEndOfFunction) {
        // Alas. No match at all. This is a parse error
        console.log('parse error: no match');
        return
      }*/

      if (functionLevel > 0) {
        // we should now be at a "," or a ")"
        if (meal[0] == ',') {
          //console.log('comma found');
          meal = meal.substr(1);
        }
        else if (meal[0] == ')') {
          functionLevel--;
          tokens.push(-2);   // -2: FUNCTION_END;
          meal = meal.substr(1);
        }
        else {
          console.log('parse error: Expected "," or ")", but found:' + meal[0] + ', at:' + meal);
          return;
        }
      }

      /*
      var output = [];
      // Convert tokens to objects/array
      for (var i=0; i<tokens.length; i++) {
        var token = tokens[i];
        switch (token) {
          case -1:

        }
      }
      return output;      */
    }
    //console.log('tokens:', tokens);
    return ExpressionParser.parseTokens(tokens);
  }

  static parseTokens(tokens) {
    var pointer=0;

    function parseExpression() {
      switch (tokens[pointer]) {
        case -1:
          // function start
          var fname = tokens[++pointer];
          //console.log('function found:' + fname);
          var args = [];
          pointer++;

          while ((pointer < tokens.length) && (tokens[pointer] != -2)) {
            args.push(parseExpression());
          }
          if (pointer >= tokens.length) {
            //console.log('Parse error: No function end found');
          }
          pointer++;
          return {'function': fname, 'args': args};
        case -4:
          var simpleValue = tokens[++pointer];
          pointer++;
          //console.log('simple value found:' + simpleValue);
          //console.log('next token' + tokens[pointer]);
          return simpleValue;
      }
    }
    var output = parseExpression();
    //console.log('parse result:', output);
    //console.log('parse result:', JSON.stringify(output));

    return output;

  }

}
