<template>
  <div class="variants-component">
    <button @click="changeImage()">Change image</button>
    <!--
    <div class="zoom-slider">
      <ZoomSlider
        v-model:zoom="zoom"
      />
    </div>-->

    <!--<br><br>
    Zoom level is: {{ zoom }}<br>
    TranslateX is: {{ translateX }}<br>
    TranslateY is: {{ translateY }}<br>-->
    <br><br>
    <div class="variants">
      <Variant
        v-for="(variant,i) in variants"
        :variant="variant"
        :variantIndex="i"
        :class="{'selected': (i==selectedVariant)}"
        v-model:zoom="zoom"
        v-model:translateX="translateX"
        v-model:translateY="translateY"
        @select="onVariantSelect"
        >
      </Variant>
    </div>
  </div>
</template>

<script>
//import ImageViewport from './standard/ImageViewport.vue'
//import ZoomSlider from './ZoomSlider.vue'
import Variant from './Variant.vue'
//import Slider from '@vueform/slider'

export default {
  name: 'Variants',
  components: {
    //ImageViewport,
    //ZoomSlider
    Variant
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
      this.selectedVariant = -1;
    },
    onVariantSelect(index) {
      this.selectedVariant = index;
    }

  },
  data() {
    var url = 'http://localhost:3000/src/assets/200x100.jpg';
    return {
      zoom: 1,
      translateX: 0,
      translateY: 0,
      imageUrl: '',
      selectedVariant: -1,
      variants: [
        {
          'title': 'Original (JPG)',
          'size': 1280,
          'url': url
        },
        {
          'title': 'Existing conversion',
          'size': 732,
          'url': url,
        },
        {
          'title': 'Lossy, q:20',
          'size': 3500000,
          'url': url
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
.variants-component {
  & .variants {
    & .variant.selected {
      background-color: #ccc;
    }
    & .variant {
      display: inline-block;
      width: 47%;
      margin-right:1%;
      padding: 1%;
      margin-bottom: 20px;

      & .header {
        & .title {
          display: inline-block;
        }
        & .size {
          display: inline-block;
          float: right;
        }
        & .zoom {
          display: inline-block;
          float: right;
          visibility: hidden;
        }
      }

      & .footer {
        font-style: italic;
        & .select {
          float: right;
          & button {
            padding: 3px 10px;
          }
        }
      }
    }
    & .variant:hover {
      & .header {
        & .zoom {
          visibility: visible;
        }
      }
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
