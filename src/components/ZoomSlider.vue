<template>
  <div class="zoom-slider">
    zoom
    <Slider
      v-model="exp"
      :min="-4"
      :max="4"
      :width="100"
      :step="-1"
      :format="sliderFormat"
    />
  </div>
</template>

<script>
import Slider from '@vueform/slider'

export default {
  name: 'ZoomSlider',
  components: {
    Slider
  },
  emits: ['update:zoom'],
  props: {
    zoom: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    exp(newValue, oldValue) {
      //console.log('model watch');
      //console.log('exp changed to:', newValue);
      //console.log('updating zoom to:', 2 ** newValue);
      this.$emit('update:zoom', 2 ** newValue);


      // Hm, no setScale available :(  - zoomIn doesn't set scale, but zooms in further
      //this.$refs.zoomer.zoomIn(newValue);
      //this.$refs.zoomer.scale = newValue / this.ratio;
    },
    zoom(newValue, oldValue) {
      //console.log('Zoom changed to: ' + newValue)
      //console.log('Updating exp to: ' + Math.log2(newValue))
      this.exp =  Math.log2(newValue);
    }
  },
  methods:{
    sliderFormat(exp) {
      return Math.round(2 ** exp * 100) + '%';
    },
  },
  mounted() {
    //console.log('mounted. zoom is:', this.zoom)
  },
  data() {
    return {
      //zoom: 1,
      exp: 0,
    }
  }
}
</script>

<style>
.zoom-slider {
  & .slider-tooltip {
    display: none;
  }
  &:hover .slider-tooltip {
    display: block;
  }
  & .slider-active .slider-tooltip {
    display: block;
  }
}
</style>
