<template>
  <!--<img :src="src" :style="{width:width}"/>-->
  <div ref="root" class="image-viewport" >
    <!--
    Current scale: {{$refs.zoomer?.scale }}<br>
    Zoom: {{ zoom }}<br>
    TranslateX: {{$refs.zoomer?.translateX }} <br>
    TranslateY: {{$refs.zoomer?.translateY }} <br>-->
<!--
    <div v-if="$refs.zoomer && $refs.root && $refs.theimg">
      Current scale: {{$refs.zoomer.scale }}<br>
      Container width: {{$refs.zoomer.containerWidth }} / {{$refs.root.offsetWidth }} <br>
      Natural width: {{$refs.theimg.naturalWidth }}<br>
      Ratio: {{ ratio }} <br>
      Container height: {{ height }} <br>
    </div>-->

    <v-zoomer
      ref="zoomer"
      class="zoomer"
      :minScale="0.1"
      :maxScale="8"
      @resize="onResize"
      :doubleClickToZoom="false"
      :style="{height:height+'px'}"
      pivot="cursor"
      :limitTranslation="false"
      :lockPanOnNoScale="false"
    >
      <img ref="theimg" :src="src" @load="onImgLoad">
    </v-zoomer>

    <div class="zoom-info">

      zoom: {{ Math.round(zoom*100) }}%
{{ scaleZoomRatio }}
    </div>


    <!--
    <div class="zoom-slider">
      <ZoomSlider
        v-model:zoom="zoom"
      />
    </div>-->
  </div>

</template>

<script>
import VueZoomer from 'vue-zoomer' // https://github.com/jarvisniu/vue-zoomer/tree/next
import ZoomSlider from './ZoomSlider.vue'

export default {
  name: 'ImageViewport',
  components: {
    VueZoomer,
    ZoomSlider
  },
  emits: ['update:zoom', 'update:translateX', 'update:translateY', 'load', 'resize'],
  props: {
    src: {type: String},
    /*
    width: {
      type: [Number, String],
      default: '95%',
    },
    height: {
      type: [Number, String],
      default: '30px',
    },*/
    height: {type: Number, default: 500},
    zoom: {type: Number, default: 1},
    scaleZoomRatio: {type: Number},
    translateX: {type: Number, default: 1},
    translateY: {type: Number, default: 1},
  },
  data() {
    return {
//      hover: false
      ratio: 1,
      ro: null,
    }
  },
  watch: {
    height(newValue, oldValue) {
      if (this.$refs?.zoomer) {
        this.$refs.zoomer.onWindowResize()
        this.$refs.zoomer.refreshContainerPos()
      }
    },
    scaleZoomRatio(newValue) {
      //console.log('scale/zoom ratio changed to:', newValue);
      if (this.$refs?.zoomer) {
        this.$refs.zoomer.onWindowResize()
        this.$refs.zoomer.refreshContainerPos()
      }
      this.$refs.zoomer.scale = this.zoom * this.scaleZoomRatio
    },
    zoom(newValue, oldValue) {
      //console.log('model watch');
      //console.log('zoom changed to:', newValue);
      //console.log('updating scale to:', newValue * this.ratio);
      // Hm, no setScale available :(  - zoomIn doesn't set scale, but zooms in further
      //this.$refs.zoomer.zoomIn(newValue);
      if (this.isImageReady()) {
        //console.log('scale should be:', newValue * this.scaleZoomRatio)
      }
      this.$refs.zoomer.scale = newValue * this.scaleZoomRatio
      //this.updateScale()
    },
    translateX(newValue, oldValue) {
      if (this.$refs.zoomer.translateX != newValue) {
        this.$refs.zoomer.translateX = newValue;
      }
    },
    translateY(newValue, oldValue) {
      if (this.$refs.zoomer.translateY != newValue) {
        this.$refs.zoomer.translateY = newValue;
      }
    },
  },
  methods: {
    getGoodContainerHeight() {
      if (this.$refs?.theimg?.naturalWidth) {
        let imageRatio = this.$refs.theimg.naturalWidth / this.$refs.theimg.naturalHeight
        //let ratio = this.$refs.theimg.naturalWidth / this.$refs.zoomer?.containerWidth;

        //let containerWidth = this.$refs.root?.offsetWidth;
        let containerWidth = this.$refs.root?.offsetWidth
        //console.log('containerWidth', containerWidth, this.$refs.root?.offsetWidth);  // this.$refs.zoomer?.containerWidth ?

        let containerHeight = containerWidth / imageRatio
        if (containerHeight > 300) {
          containerHeight = 300
        }
        return containerHeight
      }
      return 300;
    },
    updateContainerHeight() {
      //console.log('image ready', this.$refs.theimg.naturalWidth);
      return
      if (this.$refs?.theimg?.naturalWidth) {
        this.height = this.getGoodContainerHeight()

        if (this.$refs?.zoomer) {
          this.$refs.zoomer.onWindowResize()
          this.$refs.zoomer.refreshContainerPos()
        }

        this.updateRatio()
        //this.updateScale()
      }
    },
    isImageReady() {
      if (!this.$refs?.theimg?.naturalWidth) {
        return false
      }
      if (!this.$refs.root?.offsetWidth) {
        return false
      }
      return true
    },
    calcScaleZoomRatio() {
      if (!this.isImageReady()) {
        return 1
      }

      let ratioW = this.$refs.theimg.naturalWidth / this.$refs.root?.offsetWidth
      let ratioH = this.$refs.theimg.naturalHeight / this.$refs.root?.offsetHeight
      let ratio = Math.max(ratioW, ratioH)
      if (isNaN(ratio)) {
        return 1
      }
      return ratio
    },
    updateRatio() {
      return
      //this.ratio = this.$refs.theimg.naturalWidth / this.$refs.zoomer?.containerWidth;
      if (this.$refs?.theimg?.naturalWidth) {
        let ratioW = this.$refs.theimg.naturalWidth / this.$refs.root?.offsetWidth
        let ratioH = this.$refs.theimg.naturalHeight / this.$refs.root?.offsetHeight
        let ratio = Math.max(ratioW, ratioH)
        if (!isNaN(ratio)) {
          this.ratio = ratio
          //console.log('ratio updated:', this.ratio);
        }
        //this.ratio = this.$refs.zoomer?.containerWidth / this.$refs.theimg.naturalWidth;
      } else {
        //console.log('ratio not updated', this.$refs.zoomer?.containerWidth);

      }
    },
    updateScale() {
      if (this.zoom) {
        this.$refs.zoomer.scale = this.zoom * this.scaleZoomRatio
      }
    },
    zoomToFit() {
      return;
      //this.updateContainerHeight();
      //this.$refs.zoomer.scale = 1;
      if (this.scaleZoomRatio > 1) {
        console.log('zoom to fit - shrinking')
        //this.$emit('update:zoom', 1 / this.scaleZoomRatio)
        //this.$refs.zoomer.reset()
        /*this.$emit('update:zoom', 0.5)
        this.$emit('update:translateX', 0)
        this.$emit('update:translateY', 0)*/

        //this.$emit('update:zoom', 0.2)
        this.$emit('update:zoom', 1)
        this.$emit('update:translateX', 0)
        this.$emit('update:translateY', 0)
      } else {
        console.log('zoom to fit - it fits, so 100%')
        this.$emit('update:zoom', 1)
        this.$emit('update:translateX', 0)
        this.$emit('update:translateY', 0)
        //this.$emit('update:zoom', 1)
      }
      //console.log('this.scaleZoomRatio', this.scaleZoomRatio)
    },
    onImgLoad() {
      //console.log('img load');
      //this.updateContainerHeight();

      if (this.$refs?.theimg?.naturalWidth) {
        //console.log('img is ready');
        this.$emit('load');
      }
    },
    onResize() {
      this.$emit('resize');
      //console.log('resize');
      //this.updateRatio();
      //this.updateScale()
      //this.updateContainerHeight();
    },
    onDoubleTap() {
      //console.log('double tab');
      //this.$refs.zoomer.scale = 1;
      //this.$refs.zoomer.panLocked = true
      //this.$refs.zoomer.translateX = 0
      //this.$refs.zoomer.translateY = 0

      //this.zoomToFit()
      //this.$emit('update:zoom', 0.5);
      //return
      if ((Math.round(this.$refs.zoomer.scale*10000)/10000) == 1) {
        //console.log('DoubleTab, zooming to 100%', this.$refs.zoomer.scale)
        this.$emit('update:zoom', 1);
      } else {
        // zoom to fit
        //console.log('DoubleTab, zooming to fit')
        //console.log('update:zoom', 1 / this.ratio)
        //this.$emit('update:zoom', 1 / this.ratio);
        this.zoomToFit();
      }
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
    if (window.ResizeObserver) {
      this.ro = new ResizeObserver(this.onResize).observe(this.$refs.root)
    }

    this.$refs.zoomer.tapDetector.onDoubleTap(this.onDoubleTap)

    this.$watch("$refs.zoomer.scale", (newValue, oldValue) => {
       //console.log('scale changed to:', newValue);
       //console.log('scale/zoom ratio is:', this.scaleZoomRatio)
       if (this.isImageReady()) {

       }
       //console.log('updating zoom to:', newValue / this.scaleZoomRatio)
       this.$emit('update:zoom', newValue / this.scaleZoomRatio)
    });

    this.$watch("$refs.zoomer.translateX", (newValue, oldValue) => {
       this.$emit('update:translateX', newValue)
    });

    this.$watch("$refs.zoomer.translateY", (newValue, oldValue) => {
       this.$emit('update:translateY', newValue)
    });


  },
  beforeDestroy () {
    if (window.ResizeObserver) {
      this.ro.unobserve(this.$refs.zoomer)
    }
  },
}
</script>

<style>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.image-viewport {
  position: relative;

  & > .zoomer {
    width: 100%;
    /*height: 600px;*/
    border: solid 1px silver;
    overflow: hidden;

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
  /*& .zoom-slider {
    margin-top:10px;
    width: 100px;
    float: right;
  }*/

  & .zoom-info {
    display: none;
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 1px 4px;
    font-size: 9px;
    background-color: white;
  }

  &:hover .zoom-info {
    display: block;
    cursor: pointer;
  }

}
</style>
