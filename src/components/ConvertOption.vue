<template>
  <div v-show="enabled">
    <div>
      <label :disabled="!enabled">{{option.ui.label}}</label>
      <HelpIcon v-if="option.ui['help-text']">
        {{ option.ui['help-text'] }}
      </HelpIcon>
    </div>
    <div :change="emitChange()">
      <input v-if="option.ui.type == 'checkbox'" type="checkbox" v-model="modelValue" />
      <InputOption v-if="option.ui.type == 'input'" v-model="modelValue" :option="option"/>
      <SelectOption v-if="option.ui.type == 'select'" v-model="modelValue" :option="option"/>
    </div>
  </div>
</template>

<script>
import SelectBox from './standard/SelectBox.vue'
import HelpIcon from './HelpIcon.vue'
import InputOption from './option-types/InputOption.vue'
import SelectOption from './option-types/SelectOption.vue'
import ConditionEvaluator from '../classes/ConditionEvaluator.js'


export default {
  name: 'ConvertOption',
  components: {
    SelectBox, HelpIcon, InputOption, SelectOption
  },
  props: ['option', 'modelValue', 'disabled', 'optionValues'],
  methods: {
    emitChange() {
      this.$emit('update:modelValue', this.modelValue);
    }
  },
  computed: {
    enabled() {
      var displayConditionDef = this.option.ui['display-condition'];
      if (displayConditionDef) {
        return ConditionEvaluator.evaluate(displayConditionDef, this.optionValues);
      }
      return true;
    }
  },
  data() {
    return {
      attrName: 'width'
    }
  }
}
</script>

<style scoped>

</style>
