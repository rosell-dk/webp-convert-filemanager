<template>
  <div class="properties">
    File: {{ file }}<br><br>


<!--    <Variant
      title="Original"
      :size="1280"
      url="http://localhost:3000/src/assets/200x100.jpg"
    />-->
    <Variant
      :variant="{title: 'Original', size:1280, url:'http://localhost:3000/src/assets/200x100.jpg'}"
      v-model:zoom="zoom"
      v-model:translateX="translateX"
      v-model:translateY="translateY"
      v-if="originalReady"
    />

    <Variant
      :variant="{title: 'Existing conversion', size:720, url:'http://localhost:3000/src/assets/200x100.jpg'}"
      v-model:zoom="zoom"
      v-model:translateX="translateX"
      v-model:translateY="translateY"
      v-show="convertedReady"
    />

    <hr>
    <Variants
      v-model:zoom="zoom"
      v-model:translateX="translateX"
      v-model:translateY="translateY"
      @select="onVariantSelect"
      >
    </Variants>
  </div>
</template>

<script>
//import ImageViewport from './standard/ImageViewport.vue'
//import ZoomSlider from './ZoomSlider.vue'
import Variant from './Variant.vue'
import Variants from './Variants.vue'
//import Slider from '@vueform/slider'

export default {
  name: 'Properties',
  components: {
    //ImageViewport,
    //ZoomSlider
    Variant,
    Variants
  },
  props: {
    file: {
      type: Object
    }
  },
  watch: {
    file(newValue, oldValue) {
      console.log('file changed:', newValue);
      this.originalReady = false;
      this.convertedReady = false;
    }
  },
  methods:{
    onVariantSelect(index) {
      this.selectedVariant = index;
    }
  },
  data() {
    return {
      zoom: 1,
      translateX: 0,
      translateY: 0,
      originalReady: false,
      convertedReady: false,
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
  }
}
</style>
