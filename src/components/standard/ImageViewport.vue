<template>
  <!--<img :src="src" :style="{width:width}"/>-->
  <div ref="root">
    Current scale: {{$refs.zoomer?.scale }}<br>
    Zoom: {{ zoom }}<br>
    Container width: {{$refs.zoomer?.containerWidth }}<br>
    Natural width: {{$refs.theimg?.naturalWidth }}<br>

    <v-zoomer ref="zoomer" class="image-viewport" :maxScale="8" @resize="onResize">
      <img ref="theimg" :src="src" @load="onImgLoad">
    </v-zoomer>
  </div>

</template>

<script>
import VueZoomer from 'vue-zoomer' // https://github.com/jarvisniu/vue-zoomer/tree/next
import { reactive } from 'vue';

export default {
  name: 'ImageViewport',
  components: {
    VueZoomer
  },
  emits: ['update:zoom'],
  props: {
    src: {
      type: String,
    },
    width: {
      type: [Number, String],
      default: '95%',
    },
    height: {
      type: [Number, String],
      default: '30px',
    },
    zoom: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
//      hover: false
      ratio: 1,
      ro: null,
    }
  },
  watch: {
    zoom(newValue, oldValue) {
      //console.log('model watch');
      //console.log('zoom changed to:', newValue);
      //console.log('updating scale to:', newValue * this.ratio);
      // Hm, no setScale available :(  - zoomIn doesn't set scale, but zooms in further
      //this.$refs.zoomer.zoomIn(newValue);
      //this.$refs.zoomer.scale = newValue / this.ratio;
      this.updateScale()
    },
  },
  methods: {
    onImgLoad() {
      //console.log('image ready', this.$refs.theimg.naturalWidth);
      this.updateRatio();
    },
    updateRatio() {
      this.ratio = this.$refs.theimg.naturalWidth / this.$refs.zoomer?.containerWidth;
      this.updateScale()
      //console.log('ratio:', this.ratio);
    },
    updateScale() {
      this.$refs.zoomer.scale = this.zoom * this.ratio;
    },
    onResize() {
      console.log('resize');
    }

  },
  mounted() {
    //this.$refs.zoomer.zoomIn(this.zoom);
    //const { proxy: ctx } = getCurrentInstance();
    //console.log('prox', ctx.$el);
    //const el = getCurrentInstance().ctx.$el;
    //console.log('element:',el);
    //console.log('element:', this.$refs.root.getBoundingClientRect());
    // https://v3.vuejs.org/api/basic-reactivity.html#isreactive
    //console.log('raw', toRaw(this.$refs.zoomer));
    this.ro = new ResizeObserver(this.onResize).observe(reactive(this.$refs.root))

    this.$watch(
      "$refs.zoomer.scale",
      (newValue, oldValue) => {
         //execute your code here
         //console.log('scale changed to:', newValue);
         //console.log('updating zoom to:', newValue / this.ratio);

         this.$emit('update:zoom', newValue / this.ratio);
      }
    );

    this.$watch(
      "$refs.theimg.naturalWidth",
      (newValue, oldValue) => {
         //execute your code here
         console.log('natural width change:', newValue);
         //this.$emit('update:zoom', newValue);
      }
    );

    console.log('width:', this.$refs.zoomer);
/*
    this.$watch(
      "$refs.theimg.naturalWidth",
      (newValue, oldValue) => {
         //execute your code here
         console.log('natural width change:', newValue);
         //this.$emit('update:zoom', newValue);
      }
    );*/
  },
  beforeDestroy () {
    this.ro.unobserve(this.$refs.zoomer)
  },
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.image-viewport {
  width: 100%;
  height: 300px;
  border: solid 1px silver;

  & img {
    vertical-align: top;
    object-fit: contain;
    width: 100%;
    height: 100%;
    user-drag: none;
    -webkit-user-drag: none;
    -moz-user-drag: none;
  }
}

</style>
