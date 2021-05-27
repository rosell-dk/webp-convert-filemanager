export default class ExpressionEvaluator {

  static evaluate(expr, state) {
    /*
    Example of a condition definition:
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
    //console.log('Evaluating condition',  expr);
    if (!expr['function']) {
      return expr;
    }

    // Evaluate all arguments
    var args = [];
    if (expr['args']) {
      for (var i=0; i<expr['args'].length; i++) {
        args.push(ExpressionEvaluator.evaluate(expr['args'][i], state));
      }
    }

    switch (expr['function']) {
      case 'equals':
        return (args[0] == args[1]);

      case 'notEquals':
        return (args[0] != args[1]);

      case 'inArray':
        var val = args[0];
        var arr = args[1];
        return (arr.indexOf(val) > -1);

      case 'and':
        for (var i=0; i<args.length; i++) {
          if (!args[i]) {
            return false;
          }
        }
        return true;

      case 'or':
        for (var i=0; i<args.length; i++) {
          if (args[i]) {
            return true;
          }
        }
        return false;

      case 'not':
        return !args[0];

      case 'state':
        var key = args[0];
        if (args[1]) {
          var subkey = args[1];
          return state[key][subkey];
        }
        return (state[key]);

      case 'if-else':
        return (args[0] ? args[1] : args[2]);

    }
  }
}
