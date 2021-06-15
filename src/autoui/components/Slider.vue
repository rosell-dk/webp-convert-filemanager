<template>
  <div class="slider">

    <VueSlider
      v-model="modelValue"
      @update:model-value="onLocalChange"
    />
    :min="schema.minimum"
    :max="schema.maximum"

    SLIDER
    {{ modelValue }}
    schema: {{ schema }}
  </div>
</template>

<script>
import VueSlider from '@vueform/slider'

export default {
  name: 'Slider',
  components: {
    VueSlider
  },
  props: {
    'modelValue': {},
    'ui': Object,
    'schema': Object
  },
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
