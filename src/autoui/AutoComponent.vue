<template>
  <transition name="fade">
    <div class="auto-component">
      <div>
        <div v-if="ui.component != 'group'">
          <label>{{componentSchema?.title}}</label>
          <HelpIcon v-if="componentSchema?.['description']" :schema="componentSchema" :ui="ui"/>
        </div>
        <div :class="'component-' + ui.component">
          <Slider v-if="ui.component == 'slider'" v-model="localModel" :schema="componentSchema"/>
          <Group v-if="ui.component == 'group'" v-model="localModel" :schema="componentSchema" :ui="ui">
            <AutoComponent v-for="sub in ui['sub-components']" :ui="sub" :schema="schema" :modelValue="modelValue" @componentDataChange="onComponentDataChange"/>
          </Group>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Group from './components/Group.vue'
import Slider from './components/Slider.vue'
import HelpIcon from './HelpIcon.vue'

export default {
  name: 'AutoComponent',
  components: {
    Group, Slider, HelpIcon
  },
  props: {
    ui: Object,
    modelValue: {},
    schema: Object
  },
  emits: ['componentDataChange'],
  watch: {
    modelValue(newValue, oldValue) {
      console.log('model watch');
      this.updateLocalModel(newValue);
    },
    ui() {
      console.log('ui watch');
      this.updateLocalModel(this.modelValue);
    },
    schema() {
      console.log('schema watch');
      //this.updateLocalModel(this.modelValue);
    },
    localModel(newValue) {
      //console.log('local watch');
      this.$emit('componentDataChange', {value:this.localModel, property:this.ui.property});
    }

  },
  computed: {
    componentSchema() {
      if (this.ui.hasOwnProperty('property')) {
        if (this.schema.hasOwnProperty('properties')) {
          if (this.schema.properties.hasOwnProperty(this.ui.property)) {
            return this.schema.properties[this.ui.property];
          }
        }
      }
      return null;
    },/*
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
      localModel: ''
    }
  },
  mounted() {
    console.log('mounted:', this.modelValue);
    this.updateLocalModel(this.modelValue);
  },
  methods: {
    updateLocalModel(modelValue) {
      console.log('updateLocalModel:', modelValue, this.ui)
      if (this.ui.hasOwnProperty('property')) {
        if (modelValue.hasOwnProperty(this.ui.property)) {
          console.log('updating to:', modelValue[this.ui.property])
          this.localModel = modelValue[this.ui.property];
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
      padding: 5px 20px 5px 0;
    }

    & > div:first-child {
      min-width: 210px;
      vertical-align: top;
      padding-top: 10px;
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
