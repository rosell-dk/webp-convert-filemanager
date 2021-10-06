<template>
  <div class="variants">
    <ul>
      <li>Original</li>
      <li>Existing conversion</li>
    </ul>
    <div class="zoom-slider">
      zoom
      <Slider
        v-model="zoom"
        :min="1"
        :max="8"
        :width="100"
        :step="-1"
        :format="sliderFormat"
      />
    </div>
    <br><br>
    Zoom level is: {{ zoom }}<br>
    <button @click="changeImage()">Change image</button>
    <div style="width:30%">
      <ImageViewport ref="img1" :src="imageUrl" width="30%" v-model:zoom="zoom" />
    </div>
  </div>
</template>

<script>
import ImageViewport from './standard/ImageViewport.vue'
import Slider from '@vueform/slider'

export default {
  name: 'Variants',
  components: {
    ImageViewport,
    Slider
  },
  props: {
  },
  methods:{
    sliderFormat(zoom) {
      return Math.round(zoom * 100) + '%';
    },
    changeImage() {
      if (this.imageUrl == 'http://localhost:3000/src/assets/dummy.jpg') {
        this.imageUrl = 'http://localhost:3000/src/assets/dummy2.jpg';
      } else {
        this.imageUrl = 'http://localhost:3000/src/assets/dummy.jpg';
      }
    }

  },
  data() {
    return {
      zoom: 1,
      imageUrl: ''
    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.variants {
  & .zoom-slider {
    width: 100px;
    float: right;
  }
  & * {
  }
}
</style>
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
