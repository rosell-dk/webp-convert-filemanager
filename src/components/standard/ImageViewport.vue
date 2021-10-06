<template>
  <!--<img :src="src" :style="{width:width}"/>-->

 Current scale: {{$refs.zoomer?.scale }}<br>
 Zoom: {{ zoom }}<br>
 Container width: {{$refs.zoomer?.containerWidth }}<br>
 Natural width: {{$refs.theimg?.naturalWidth }}<br>


  <v-zoomer ref="zoomer" class="image-viewport" :maxScale="8">
    <img ref="theimg" :src="src" @load="onImgLoad">
  </v-zoomer>

</template>

<script>
import VueZoomer from 'vue-zoomer' // https://github.com/jarvisniu/vue-zoomer/tree/next

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
    }
  },
  watch: {
    zoom(newValue, oldValue) {
      //console.log('model watch');
      //console.log('hello', newValue);
      // Hm, no setScale available :(  - zoomIn doesn't set scale, but zooms in further
      //this.$refs.zoomer.zoomIn(newValue);
      this.$refs.zoomer.scale = newValue;
    },
  },
  methods: {
    onImgLoad() {
      console.log('image ready', this.$refs.theimg.naturalWidth)
    }
  },
  mounted() {
    //this.$refs.zoomer.zoomIn(this.zoom);

    this.$watch(
      "$refs.zoomer.scale",
      (newValue, oldValue) => {
         //execute your code here
         //console.log('emitting:', newValue);
         this.$emit('update:zoom', newValue);
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
  }
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
