<template>
  <VueMultiselect
    v-model="modelValue"
    :options="options"
    :multiple="false"
    :close-on-select="true"
    :clear-on-select="false"
    :preserve-search="false"
    :preselect-first="false"
    :searchable="false"
    @update:model-value="onLocalChange"
    selectLabel=""
    deselectLabel=""
    :allowEmpty="false"
  />
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'Select',
  components: {
    VueMultiselect
  },
  props: {
    'modelValue': {},
    'ui': Object,
    'schema': Object
  },
  emits: ['update:modelValue'],
  methods: {
    updateLocalModel(modelValue) {
      //this.modelValue = modelValue;
    },
    onLocalChange() {
      this.$emit('update:modelValue', this.modelValue);
    },
  },
  computed: {
    options: function() {
      var options = [];
      if (this?.schema?.enum) {
        options = this.schema['enum'];
      }
      if (this?.ui?.options) {
        options = this.ui.options;
      }
      return options;
    }
  },
  mounted() {
    //this.updateLocalModel(this.modelValue);
  },
  watch: {
    modelValue(newValue, oldValue) {
      //this.updateLocalModel(newValue);
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
</style>
