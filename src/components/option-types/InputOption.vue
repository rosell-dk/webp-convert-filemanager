<template>
  <div @input="onLocalChange()">
    <input v-if="dataType == 'string'" v-model="stringValue" />
    <input v-if="dataType == 'float'" type="number" v-model="stringValue" />
    <input v-if="dataType == 'int'" type="number" v-model="stringValue" class="small"/>
  </div>
</template>

<script>
export default {
  name: 'InputOption',
  props: ['modelValue', 'option'],
  emits: ['update:modelValue'],
  methods: {
    updateLocalModel(modelValue) {
      this.stringValue = modelValue.toString();
    },
    onLocalChange() {
      //console.log('local change')
      switch (this.option.schema['type'][0]) {
        case 'integer':
          var intVal = parseInt(this.stringValue, 10);
          this.$emit('update:modelValue', intVal);
          break;
        /*case 'int':
          var floatVal = parseFloat(this.stringValue);
          this.$emit('update:modelValue', floatVal);
          break;*/
        default:
          this.$emit('update:modelValue', this.stringValue);
          break;
      }
    },
  },
  computed: {
    valueAsString: function() {
      return this.modelValue.toString();
    },
    dataType: function() {
      if (this.option['schema']['type']) {
        switch (this.option['schema']['type'][0]) {
          case 'integer':
            return 'int';
          default:
            return 'string';
        }
      } else {
        return '';
      }
    }

  },
  mounted() {
    this.updateLocalModel(this.modelValue);
  },
  watch: {
    modelValue(newValue, oldValue) {
      //console.log('model value changed to', newValue);
      this.updateLocalModel(newValue);
    },
    option(newValue, oldValue) {
      //this.inputType = newValue;
      //console.log('option changed to', newValue);
    }
  },
  data() {
    return {
      'stringValue': '',
    }
  }
}
</script>

<style scoped>
  input {
    width: 100%
  }
  input.small {
    max-width: 100px;
  }
</style>
