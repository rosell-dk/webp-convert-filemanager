export default class ConditionEvaluator {
  static evaluate(conditionDef, optionValues) {
    /*
    Example of a condition definition:
    {
        'type': 'equals',
        'arg1': {
            'type': 'option-value',
            'option-id': 'try-supplied-binary-for-os'
        },
        'arg2': true
    }*/
    //console.log('Evaluating condition',  conditionDef);
    if (!conditionDef['type']) {
      return conditionDef;
    }
    switch (conditionDef['type']) {
      case 'equals':
        var arg1 = ConditionEvaluator.evaluate(conditionDef['arg1'], optionValues);
        var arg2 = ConditionEvaluator.evaluate(conditionDef['arg2'], optionValues);
        return (arg1 == arg2);
        break;

      case 'in-array':
        var val = ConditionEvaluator.evaluate(conditionDef['value'], optionValues);
        var arr = ConditionEvaluator.evaluate(conditionDef['array'], optionValues);
        return (arr.indexOf(val) > -1);

      case 'and':
        var arg1 = ConditionEvaluator.evaluate(conditionDef['arg1'], optionValues);
        if (!arg1) {
          return false;
        }
        var arg2 = ConditionEvaluator.evaluate(conditionDef['arg2'], optionValues);
        return !!arg2;

      case 'or':
        var arg1 = ConditionEvaluator.evaluate(conditionDef['arg1'], optionValues);
        if (arg1) {
          return true;
        }
        var arg2 = ConditionEvaluator.evaluate(conditionDef['arg2'], optionValues);
        return !!arg2;

      case 'option-value':
        var optionId = conditionDef['option-id'];
        if (!optionValues) {
          //return '';
        }
        return (optionValues[optionId]);
    }
  }
}
