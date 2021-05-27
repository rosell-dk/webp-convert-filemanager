export default class ConditionEvaluator {
  static evaluate(conditionDef, optionValues) {
    /*
    Example of a condition definition:
    {
      'type': 'equals',
      'args': [
        {
          'type': 'option-value',
          'option-id': 'try-supplied-binary-for-os'
        },
        true
      ]
    }
    */
    //console.log('Evaluating condition',  conditionDef);
    if (!conditionDef['function']) {
      return conditionDef;
    }
    switch (conditionDef['function']) {
      case 'equals':
        var arg1 = ConditionEvaluator.evaluate(conditionDef['args'][0], optionValues);
        var arg2 = ConditionEvaluator.evaluate(conditionDef['args'][1], optionValues);
        return (arg1 == arg2);

      case 'not-equals':
        return !(ConditionEvaluator.evaluate(conditionDef, optionValues));

      case 'in-array':
        var val = ConditionEvaluator.evaluate(conditionDef['args'][0], optionValues);
        var arr = ConditionEvaluator.evaluate(conditionDef['args'][1], optionValues);
        return (arr.indexOf(val) > -1);

      case 'and':
        var arg1 = ConditionEvaluator.evaluate(conditionDef['args'][0], optionValues);
        if (!arg1) {
          return false;
        }
        var arg2 = ConditionEvaluator.evaluate(conditionDef['args'][1], optionValues);
        return !!arg2;

      case 'or':
        var arg1 = ConditionEvaluator.evaluate(conditionDef['args'][0], optionValues);
        if (arg1) {
          return true;
        }
        var arg2 = ConditionEvaluator.evaluate(conditionDef['args'][1], optionValues);
        return !!arg2;

      case 'not':
        var arg1 = ConditionEvaluator.evaluate(conditionDef['args'][0], optionValues);
        return !!!arg1;

      case 'option-value':
        var optionId = ConditionEvaluator.evaluate(conditionDef['args'][0], optionValues);
        if (!optionValues) {
          //return '';
        }
        return (optionValues[optionId]);
    }
  }
}
