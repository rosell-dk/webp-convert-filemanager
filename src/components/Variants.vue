<template>
  <div class="variants">
    <button @click="changeImage()">Change image</button>
    <ul>
      <li>Original</li>
      <li>Existing conversion</li>
    </ul>
    <!--
    <div class="zoom-slider">
      <ZoomSlider
        v-model:zoom="zoom"
      />
    </div>-->
    <!--
    <br><br>
    Zoom level is: {{ zoom }}<br>
    TranslateX is: {{ translateX }}<br>
    TranslateY is: {{ translateY }}<br>-->
    <br><br>
    <div class="images">
      <div v-for="variant in variants">
        {{ variant.title }}
        <ImageViewport :src="imageUrl" v-model:zoom="zoom" v-model:translateX="translateX" v-model:translateY="translateY" />
      </div>
    </div>
  </div>
</template>

<script>
import ImageViewport from './standard/ImageViewport.vue'
//import ZoomSlider from './ZoomSlider.vue'
//import Slider from '@vueform/slider'

export default {
  name: 'Variants',
  components: {
    ImageViewport,
    //ZoomSlider
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
      this.zoom = 1;
      this.translateX = 0;
      this.translateY = 0;
    }

  },
  data() {
    return {
      zoom: 1,
      translateX: 0,
      translateY: 0,
      imageUrl: '',
      variants: [
        {
          'title': 'Original'
        },
        {
          'title': 'Existing conversion'
        }

      ]
    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.variants {
  & .images {
    & > div {
      display: inline-block;
      width: 48%;
      margin-right:2%;
    }
  }
}
</style>
<style>
/*
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
}*/
</style>
