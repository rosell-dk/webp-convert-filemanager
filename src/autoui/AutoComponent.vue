<template>
  <div>
    <!--<pre>
Local: {{ localModel }}
Global: {{ modelValue }}
</pre>-->
    <Slider v-if="ui.component == 'slider'" v-model="localModel" :schema="componentSchema"/>
    <Group v-if="ui.component == 'group'" v-model="localModel" :schema="componentSchema" :ui="ui">
      <AutoComponent v-for="sub in ui['sub-components']" :ui="sub" :schema="schema" :modelValue="modelValue" @componentDataChange="onComponentDataChange"/>
    </Group>
  </div>
</template>

<script>
import Group from './components/Group.vue'
import Slider from './components/Slider.vue'

export default {
  name: 'AutoComponent',
  components: {
    Group, Slider
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

<style scoped>
</style>
