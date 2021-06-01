<template>
  <div class="slider">
    <Slider
      v-model="modelValue"
      @update:model-value="onLocalChange"
      :min="option.schema.minimum"
      :max="option.schema.maximum"
    />
  </div>
</template>

<script>
import Slider from '@vueform/slider'

export default {
  name: 'SliderOption',
  components: {
    Slider
  },
  props: ['modelValue', 'option'],
  emits: ['update:modelValue'],
  methods: {
    onLocalChange() {
      this.$emit('update:modelValue', this.modelValue);
    },
  },
  mounted() {
  },
  data() {
    return {
    }
  }
}
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.slider {
  padding: 10px 0;
}
</style>

<style>
.slider .slider-connect {
  background-color: #0075ff;
}
.slider .slider-tooltip {
  background-color: #0075ff;
  border-color: #0075ff;
  display: none;
}
.slider:hover .slider-tooltip {
  display: block;
}
.slider .slider-active .slider-tooltip {
  display: block;
}

</style>
