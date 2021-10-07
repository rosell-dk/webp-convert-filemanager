<template>
    <div class="variant">
      <div class="header">
        <div class="title">{{ variant.title }}</div>
        <div class="size">{{ variant.size }} kb</div>
        <!--<div class="zoom">zoom: {{ Math.round(zoom*100) }}%</div>-->
      </div>
      <ImageViewport
        ref="theport"
        :src="variant.url"
        v-model:zoom="zoom"
        v-model:translateX="translateX"
        v-model:translateY="translateY"
      />
      <div class="footer">
        <div class="select"><button @click="onVariantSelect">select</button></div>
      </div>
    </div>
</template>

<script>
import ImageViewport from './standard/ImageViewport.vue'
//import ZoomSlider from './ZoomSlider.vue'
//import Slider from '@vueform/slider'

export default {
  name: 'Variant',
  components: {
    ImageViewport,
    //ZoomSlider
  },
  emits: ['select', 'update:zoom', 'update:translateX', 'update:translateY'],
  props: {
    zoom: {
      type: Number,
    },
    translateX: {
      type: Number,
    },
    translateY: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
    variantIndex: {
      type: Number,
    },
    variant: {
      type: Object,
    },

  },
  methods:{
    /*
    sliderFormat(zoom) {
      return Math.round(zoom * 100) + '%';
    },*/
    onVariantSelect() {
      console.log('variant select')
      this.$emit('select', this.variantIndex);
    }
  },
  mounted() {
    this.$watch("$refs.theport.zoom", (newValue, oldValue) => {
      //console.log('zoom change');
      this.$emit('update:zoom', newValue);
    });
    this.$watch("$refs.theport.translateX", (newValue, oldValue) => {
      this.$emit('update:translateX', newValue);
    });
    this.$watch("$refs.theport.translateY", (newValue, oldValue) => {
      this.$emit('update:translateY', newValue);
    });
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.variant {
    display: inline-block;
    width: 48%;
    margin-right:2%;
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
.variant:hover {
  & .header {
    & .zoom {
      visibility: visible;
    }
  }
}

</style>
