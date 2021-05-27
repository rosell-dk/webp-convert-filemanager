<template>
  <div class="convert-option" v-show="enabled">
    <div>
      <label :disabled="!enabled">{{option.ui.label}}</label>
      <HelpIcon v-if="option.ui['help-text']">
        {{ option.ui['help-text'] }}
      </HelpIcon>
    </div>
    <div :change="emitChange()">
      <input v-if="option.ui.component == 'checkbox'" type="checkbox" v-model="modelValue" />
      <InputOption v-if="option.ui.component == 'input'" v-model="modelValue" :option="option"/>
      <SelectOption v-if="option.ui.component == 'select'" v-model="modelValue" :option="option"/>
      <template v-if="option.ui.component == 'multi-select'">
        <MultiSelectOption v-if="option.id != 'metadata'" v-model="modelValue" :option="option"/>
        <MetadataOption v-if="option.id == 'metadata'" v-model="modelValue" :option="option"/>
      </template>
    </div>
  </div>
</template>

<script>
import SelectBox from './standard/SelectBox.vue'
import HelpIcon from './HelpIcon.vue'
import InputOption from './option-types/InputOption.vue'
import MultiSelectOption from './option-types/MultiSelectOption.vue'
import MetadataOption from './option-types/MetadataOption.vue'
import SelectOption from './option-types/SelectOption.vue'
import ExpressionEvaluator from '../classes/ExpressionEvaluator.js'


export default {
  name: 'ConvertOption',
  components: {
    SelectBox, HelpIcon, InputOption, SelectOption, MultiSelectOption, MetadataOption
  },
  props: ['option', 'modelValue', 'disabled', 'optionValues'],
  methods: {
    emitChange() {
      this.$emit('update:modelValue', this.modelValue);
    }
  },
  computed: {
    enabled() {
      var displayConditionDef = this.option.ui['display'];
      if (displayConditionDef) {
        //console.log('condition', displayConditionDef);
        return ExpressionEvaluator.evaluate(displayConditionDef, {
          'option': this.optionValues
        });
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
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */

/* PS: The parent has "table-table" class, which means that
       this component has "display: table-row */
.convert-option {
   & > div:first-child {
     min-width: 210px;
     vertical-align: top;
     padding-top: 10px;
   }
   & > div:last-child {
     width: 300px;
     box-sizing: border-box;
     & * {
       box-sizing: border-box;
       width: 100%;
     }
   }
   & input.method {
     width: 40px;
   }
}

</style>
