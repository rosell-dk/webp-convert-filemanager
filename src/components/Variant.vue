<template>
    <div class="variant">
      <div class="header">
        <div class="title">{{ title }}</div>
        <div class="size">{{ filesize }} </div>
        <!--<div class="zoom">zoom: {{ Math.round(zoom*100) }}%</div>-->
      </div>
      <ImageViewport
        ref="theport"
        :src="imageUrl"
        :height="height"
        v-model:zoom="zoom"
        :scaleZoomRatio="scaleZoomRatio"
        v-model:translateX="translateX"
        v-model:translateY="translateY"
        @load="onLoad"
        @resize="this.$emit('resize')"
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
  emits: ['select', 'update:zoom', 'update:translateX', 'update:translateY', 'load', 'resize'],
  props: {
    title: {type: String},
    info: {type: Object},
    url: {type: String, default: ''},
    height: {type: Number},
    zoom: {type: Number},
    scaleZoomRatio: {type: Number},
    translateX: {type: Number},
    translateY: {type: Number},
    variantIndex: {type: Number},
  },
  computed: {
    imageUrl: function() {
      return this.info?.url;
    },
    filesize: function() {
      if (!this.info?.size) {
        return '';
      }
      let size = this.info.size;
      if (size < 1024) {
        return size + ' bytes';
      }
      size /= 1024;
      if (size < 1024) {
        return Math.round(size*10)/10 + ' kb'
      }
      size /= 1024;
      return Math.round(size*10)/10 + ' MB'
    }
  },
  methods:{
    /*
    sliderFormat(zoom) {
      return Math.round(zoom * 100) + '%';
    },*/
    onVariantSelect() {
      //console.log('variant select')
      this.$emit('select', this.variantIndex);
    },
    onLoad() {
      this.$emit('load')
    },
    zoomToFit() {
      this.$refs.theport.zoomToFit();
    }
  },
  mounted() {
    this.$watch("$refs.theport.zoom", (newValue, oldValue) => {
      //console.log('variant is updating zoom:', newValue);
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
      margin-top:2px;
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
