<template>
  <transition name="fade">
    <div class="convert-option" v-if="enabled">
      <div>
        <label :disabled="!enabled">{{option.schema.title}}</label>
        <ConvertOptionMenu v-if="option.schema['description']" :option="option" />
      </div>
      <div :change="emitChange()">
        <!--<div v-if="option.ui.component == 'checkbox'"><input type="checkbox" v-model="modelValue" /></div>-->
        <div v-if="option.ui.component == 'checkbox'"><Toggle :height="20" :width="40" v-model="modelValue"/></div>
        <InputOption v-if="option.ui.component == 'input'" v-model="modelValue" :option="option"/>
        <SelectOption v-if="option.ui.component == 'select'" v-model="modelValue" :option="option"/>
        <SliderOption v-if="option.ui.component == 'slider'" v-model="modelValue" :option="option"/>
        <template v-if="option.ui.component == 'multi-select'">
          <MultiSelectOption v-if="option.id != 'metadata'" v-model="modelValue" :option="option"/>
          <MetadataOption v-if="option.id == 'metadata'" v-model="modelValue" :option="option"/>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import SelectBox from './standard/SelectBox.vue'
import HelpIcon from './HelpIcon.vue'
import ConvertOptionMenu from './ConvertOptionMenu.vue'
import InputOption from './option-types/InputOption.vue'
import MultiSelectOption from './option-types/MultiSelectOption.vue'
import MetadataOption from './option-types/MetadataOption.vue'
//import VueToggles from 'vue-toggles'
import Toggle from './standard/Toggle.vue'

import SelectOption from './option-types/SelectOption.vue'
import SliderOption from './option-types/SliderOption.vue'

import JsExpression from '@rosell/js-expression'

export default {
  name: 'ConvertOption',
  components: {
    SelectBox,
    HelpIcon,
    InputOption,
    SelectOption,
    MultiSelectOption,
    MetadataOption,
    Toggle,
    SliderOption,
    ConvertOptionMenu
  },
  props: {
    'option': {
      type: Object
    },
    'modelValue': {},
    'optionValues': {
      type: Object
    },
    'show': {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    emitChange() {
      this.$emit('update:modelValue', this.modelValue);
    }
  },
  mounted() {
    if ((this.option.ui) && (this.option.ui['display'])) {
      this.displayExpr = new JsExpression(this.option.ui['display']);
    }
  },
  computed: {
    enabled() {
      //var displayExpr = this.option.ui['display'];
      /*if (this.option.ui['advanced']) {
        return false;
      }*/
      if (this.show == false) {
        return false;
      }
      /*
      if ((this.option.ui) && (this.option.ui['display'])) {
        //console.log('condition', displayExpr);
        return ExpressionEvaluator.evaluate(this.option.ui['display'], {
          'option': this.optionValues,
          'imageType': 'any'
        });
      }*/
      if (this.displayExpr) {
        return this.displayExpr.evaluate()
      }
      if ((this.option.ui) && (this.option.ui['display'])) {
        //console.log('condition', displayExpr);
        //let e = new JsExpression(this.option.ui['display']);
        //return e.evaluate()
/*
        return ExpressionEvaluator.evaluate(
          ExpressionParser.parseString(this.option.ui['display']),
          {
            'option': this.optionValues,
            'imageType': 'any'
          }
        );*/
      }
      return true;
    }
  },
  data() {
    return {
      attrName: 'width',
      displayExpr: null
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
     /*& * {
       box-sizing: border-box;
       width: 100%;
     }*/
   }
   & input.method {
     width: 40px;
   }
}


.fade-enter-active {
  transition: all 1s;
  opacity: 0;
  transform: scale(0);
  transform: translateX(30px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateX(0px);
  transform: scale(1);
}

.fade-leave-active {
  transition: all 1s;
  opacity: 1;
  /*transform: scale(1) translateX(0px);*/
}
.fade-leave-to {
  opacity: 0;
  /*transform: scale(0.9) translateX(30px);*/
}
</style>
