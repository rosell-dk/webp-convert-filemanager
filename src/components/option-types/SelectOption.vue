<template>

  <!--<SelectBox v-model="modelValue" :options="options" optionsLabel="label" optionsKey="id"
  placeholder="Select"
  @update:model-value="onLocalChange"
  />-->
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
  />
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'SelectOption',
  components: {
    VueMultiselect
  },
  props: ['modelValue', 'option'],
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
      var result = [];
      var ui = this.option.ui;

      var options = [];
      if (this.option.schema['enum']) {
        options = this.option.schema['enum'];
      }
      if (ui.options) {
        options = this.option.ui.options;
      }
      return options;
      /*
      for (var i=0; i<options.length; i++) {
        var id = options[i];
        result.push({'id':id, 'label':ui.optionLabels[id]});
      }
      console.log('result', result);
      return result;
      */
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
