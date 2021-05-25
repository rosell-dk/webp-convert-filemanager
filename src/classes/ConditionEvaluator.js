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
    if (!conditionDef['type']) {
      return conditionDef;
    }
    switch (conditionDef['type']) {
      case 'equals':
      console.log('equals?');
        var arg1 = ConditionEvaluator.evaluate(conditionDef['arg1'], optionValues);
        var arg2 = ConditionEvaluator.evaluate(conditionDef['arg2'], optionValues);
        return (arg1 == arg2);
        break;

      case 'option-value':
        var optionId = conditionDef['option-id'];
        if (!optionValues) {
          //return '';
        }
        return (optionValues[optionId]);
    }
  }
}
