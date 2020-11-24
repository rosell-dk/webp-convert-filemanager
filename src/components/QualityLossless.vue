<template>
  <div class="quality-lossless">
    <input class="input-quality" v-model="quality" type="number" @input="onLocalChange()"/>
  </div>
</template>

<script>
import SelectBox from './SelectBox.vue'

export default {
  name: 'QualityLossless',
  components: {

  },
  props: {
    modelValue: Object
  },
  emits: ['update:modelValue'],
  mounted() {
    this.updateLocalModel(this.modelValue);
  },
  data() {
    return {
      quality: 60
    }
  },
  watch: {
    modelValue(newValue, oldValue) {
      this.updateLocalModel(newValue);
    }
  },
  methods: {
    updateLocalModel(modelValue) {
      this.quality = modelValue.quality;
    },
    onLocalChange() {
      this.$emit('update:modelValue', {
        quality: this.quality,
      });
    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.quality-lossless {
  & .input-quality {
    width: 40px;
    padding: 3px 5px;
  }
}
label {}
</style>
