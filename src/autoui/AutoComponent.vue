<template>
  <transition name="fade">
    <div class="auto-component" v-if="enabled && ui.component">
      <div>
        <div v-if="ui.component != 'group'">
          <label>{{componentSchema?.title}}</label>
          <HelpIcon v-if="componentSchema?.['description']" :schema="componentSchema" :ui="ui"/>
        </div>
        <div :class="'component-' + ui.component">
          <Toggle v-if="ui.component == 'checkbox'" v-model="localModel" :height="20" :width="40"/>
          <Slider v-if="ui.component == 'slider'" v-model="localModel" :schema="componentSchema"/>
          <Select v-if="ui.component == 'select'" v-model="localModel" :schema="componentSchema" :ui="ui" />
          <div v-if="ui.component == 'multi-select'">
            <MultiSelect v-model="localModel" :schema="componentSchema" :ui="ui"/>
          </div>
          <Input v-if="ui.component == 'input'" v-model="localModel" :schema="componentSchema"/>
          <Group v-if="ui.component == 'group'" v-model="localModel" :schema="componentSchema" :ui="ui">
            <AutoComponent v-for="sub in ui['sub-components']" :ui="sub" :schema="schema" :modelValue="modelValue" :advancedView="advancedView" :expressionContext="expressionContext" @componentDataChange="onComponentDataChange"/>
          </Group>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Group from './components/Group.vue'
import Input from './components/Input.vue'
import MultiSelect from './components/MultiSelect.vue'
import Select from './components/Select.vue'
import Slider from './components/Slider.vue'
import Toggle from './components/Toggle.vue'
import HelpIcon from './HelpIcon.vue'

import JsExpression from '@rosell/js-expression'

export default {
  name: 'AutoComponent',
  components: {
    Group, Input, MultiSelect, Select, Slider, Toggle,
    HelpIcon
  },
  props: {
    ui: Object,
    modelValue: {},
    schema: Object,
    advancedView: Boolean,
    expressionContext: String,
  },
  emits: ['componentDataChange'],
  watch: {
    modelValue(newValue, oldValue) {
      //console.log('model watch');
      this.updateLocalModel(newValue);
    },
    ui() {
      //console.log('ui watch');
      this.updateLocalModel(this.modelValue);
    },
    schema() {
      //console.log('schema watch');
      //this.updateLocalModel(this.modelValue);
    },
    localModel(newValue) {
      //console.log('local watch');
      this.$emit('componentDataChange', {value:this.localModel, 'data-property':this.ui['data-property']});
    }

  },
  computed: {
    componentSchema() {
      if (this.ui.hasOwnProperty('data-property')) {
        if (this.schema.hasOwnProperty('properties')) {
          if (this.schema.properties.hasOwnProperty(this.ui['data-property'])) {
            return this.schema.properties[this.ui['data-property']];
          }
        }
      }
      return null;
    },
    enabled() {
      if (this?.ui.advanced) {
        // TODO: check advancedView. Maybe through the globalContext set in JSExpression?
        //return false;
        //console.log('parent', this.$parent.data);

    //    console.log(this.$parent.$parent.test);
        if (!this.advancedView) {
            return false;
        }
        //return this.$parent.advancedView;
      }

      /*if (this.show == false) {
        return false;
      }*/
      if (this.displayExpr) {
        //console.log('this.expressionContext', this.expressionContext);
        return this.displayExpr.evaluate(this.expressionContext); // general | png
      }
      return true;
    }
    /*
    componentModel() {
      if (this.ui.hasOwnProperty('property')) {
        if (this.modelValue.hasOwnProperty(this.ui.property)) {
          return this.modelValue[this.ui.property];
        }
      }
      return null;
    }*/
  },
  data() {
    return {
      localModel: '',
      displayExpr: null,
      test:'hej',
    }
  },
  mounted() {
    //console.log('mounted:', this.modelValue);
    this.updateLocalModel(this.modelValue);

    if (this?.ui.display) {
      this.displayExpr = new JsExpression(this.ui.display);
    }
  },
  methods: {
    updateLocalModel(modelValue) {
      //console.log('updateLocalModel:', modelValue, this.ui)
      if (this.ui.hasOwnProperty('data-property')) {
        if (modelValue.hasOwnProperty(this.ui['data-property'])) {
          //console.log('updating to:', modelValue[this.ui.property])
          this.localModel = modelValue[this.ui['data-property']];
        }
      }
    },
    onComponentDataChange(obj) {
      //console.log('SUBCHANGE!', obj);
      this.$emit('componentDataChange', obj);
    }

  }
}
</script>

<style type="sass" scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */

/* PS: The parent has "table-table" class, which means that
       this component has "display: table-row */
.auto-component {

   & input.method {
     width: 40px;
   }
}

.auto-component {
  display: table;
  width: 100%;

  & > * {
    display: table-row;

    & > * {
      display: table-cell;
      padding: 0px 0px 10px 0;
    }

    & > div:first-child {
      min-width: 210px;
      vertical-align: top;
      padding-top: 0px; /*was: 10px*/
    }
    & > div:last-child {
      width: 100%;
      box-sizing: border-box;
      /*& * {
        box-sizing: border-box;
        width: 100%;
      }*/
    }
  }
}

.fade-enter-active {
  transition: all 0.5s;
  opacity: 0;
  transform: scale(0.7);
  /*transform: translateX(30px);*/
}
.fade-enter-to {
  opacity: 1;
  /*transform: translateX(0px);*/
  transform: scale(1);
}

.fade-leave-active {
  transition: all 0.5s;
  transform: scale(1);
  opacity: 1;
  /*transform: scale(1) translateX(0px);*/
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
  /*transform: scale(0.9) translateX(30px);*/
}

/* Hm, how to trigger the following when in split-pane with small width? */
@media (max-width: 600px) {
  .auto-component {
    display: block;
    & > * {
      display: block;

      & > * {
        display: block;
      }
    }
  }
}

</style>
