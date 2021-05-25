<template>
  <div @input="onLocalChange()">
    <input v-if="option.type == 'string'" v-model="stringValue" />
    <input v-if="option.type == 'float'" type="number" v-model="stringValue" />
    <input v-if="option.type == 'int'" type="number" v-model="stringValue" />
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
      switch (this.option.type) {
        case 'int':
          var intVal = parseInt(this.stringValue, 10);
          this.$emit('update:modelValue', intVal);
          break;
        case 'int':
          var floatVal = parseFloat(this.stringValue);
          this.$emit('update:modelValue', floatVal);
          break;
        default:
          this.$emit('update:modelValue', this.stringValue);
          break;
      }
    },
  },
  computed: {
    valueAsString: function() {
      return this.modelValue.toString();
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
      'stringValue': ''
    }
  }
}
</script>

<style scoped>
</style>
