<template>
  <div>
    <pre>
Local: {{ localModel }}
Global: {{ modelValue }}
    </pre>
    <Slider v-if="ui.component == 'slider'" v-model="localModel" :schema="componentSchema"/>
    <Group v-if="ui.component == 'group'" v-model="localModel" :schema="componentSchema" :ui="ui">
      <AutoComponent v-for="sub in ui['sub-components']" :ui="sub" :schema="schema" :modelValue="modelValue"/>
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
  emits: ['update:modelValue', 'componentDataChange'],
  watch: {
    modelValue(newValue, oldValue) {
      console.log('model watch');
      this.updateLocalModel(newValue);
    },
    schema() {
      console.log('schema watch');
      this.updateLocalModel(this.modelValue);
    },
    localModel(newValue) {
      console.log('local watch');
      this.$emit('componentDataChange', {value:this.localModel, property:this.ui.property});

      //this.modelValue['quality'] = newValue;
      //this.$emit('update:modelValue', this.selectedOption[this.optionsKey]);
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
      if (this.ui.hasOwnProperty('property')) {
        if (modelValue.hasOwnProperty(this.ui.property)) {
          this.localModel = modelValue[this.ui.property];
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
