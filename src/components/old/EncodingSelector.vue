<template>
  <div class="encoding-selector">
    <div v-show="converter == 'gd'">lossy (gd can only produce lossy webp)</div>
    <div v-show="converter == 'ewww'">lossy for jpeg, lossy for png (ewww behaviour)</div>
    <div v-show="encodingSupported()">
      <SelectBox v-model="encoding" :options="encodings" optionsLabel="name" optionsKey="id" placeholder="Select" @update:model-value="onUpdate"/>
    </div>
  </div>
</template>

<script>
import SelectBox from './SelectBox.vue'

export default {
  name: 'EncodingSelector',
  components: {
    SelectBox
  },
  props: {
    converter: String,
    modelValue: String
  },
  emits: ['update:modelValue'],
  data() {
    return {
      encoding: this.modelValue,
      encodings: [
        {id: 'auto', name: 'Auto'},
        {id: 'lossy', name: 'Lossy'},
        {id: 'lossless', name: 'Lossless'},
      ]
    }
  },
  watch: {
    modelValue(newValue, oldValue) {
      this.encoding = newValue;
    }
  },
  methods: {
    onUpdate() {
      this.$emit('update:modelValue', this.encoding);
    },
    encodingSupported() {
      return ((this.converter != 'gd') && (this.converter != 'ewww'));
    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.encoding-selector {
}
</style>
