<template>
  <SelectBox v-model="modelValue" :options="options" optionsLabel="label" optionsKey="id" placeholder="Select" @update:model-value="onLocalChange"/>
</template>

<script>
import SelectBox from '../standard/SelectBox.vue'

export default {
  name: 'SelectOption',
  components: {
    SelectBox
  },
  props: ['modelValue', 'option'],
  emits: ['update:modelValue'],
  methods: {
    updateLocalModel(modelValue) {
    },
    onLocalChange() {
      this.$emit('update:modelValue', this.modelValue);
    },
  },
  computed: {
    options: function() {
      var result = [];
      var ui = this.option.ui;
      if (ui.options) {
        for (var i=0; i<ui.options.length; i++) {
          var id = ui.options[i];
          result.push({'id':id, 'label':ui.optionLabels[id]});
        }
        console.log('result', result);
      }
      return result;
    }
  },
  mounted() {
    this.updateLocalModel(this.modelValue);
  },
  watch: {
    modelValue(newValue, oldValue) {
      this.updateLocalModel(newValue);
    }
  },
  data() {
    return {
      'selected': ''
    }
  }
}
</script>

<style scoped>
</style>
