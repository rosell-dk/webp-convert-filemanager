<template>
  <div class="file-properties">
    <div class="path">
      Path: <span class="path">{{ file.path }}</span>
    </div>
    <div class="error" v-if="errorMsg != ''"><p>Error: {{ errorMsg }}</p></div>

<!--    <Variant
      title="Original"
      :size="1280"
      url="http://localhost:3000/src/assets/200x100.jpg"
    />-->
    <div v-show="loading">Getting info...</div>
    <Variant
      ref="original"
      title="Original"
      :info="originalInfo"
      :height="height"
      v-model:zoom="zoom"
      :scaleZoomRatio="scaleZoomRatio"
      v-model:translateX="translateX"
      v-model:translateY="translateY"
      v-show="originalInfo"
      @load="onOriginalLoad"
      @resize="onOriginalResize"
    />
    <Variant
      title="Existing conversion"
      :info="convertedInfo"
      :height="height"
      v-model:zoom="zoom"
      :scaleZoomRatio="scaleZoomRatio"
      v-model:translateX="translateX"
      v-model:translateY="translateY"
      v-show="convertedInfo"
    />
    <Modal
        v-show="showingLogDialog"
        title="Conversion log"
        closeButtonText="Ok"
        width="600px"
        height="95%" maxheight="650px"
        alignment="center"
        @close="showingLogDialog = false"
      >
      {{ log }}
    </Modal>
    <div>
      <button @click="onConvertClick">Convert</button>
      <button @click="showingLogDialog = true" v-if="log != ''" class="log-button">View conversion log</button>
    </div>
    <p>
    Above, you see the original image. If it has been converted, you also see the converted image (provided that your browser supports webp).
    </p>
    <p>
      You can zoom in on the image, ie using scroll wheel. Both images will zoom, allowing you to compare the quality.
      Double-click the image to set zoom to 100%.
      You can also drag the image.
    </p>

<!--
    <Variants
      :height="height"
      v-model:zoom="zoom"
      v-model:translateX="translateX"
      v-model:translateY="translateY"
      @select="onVariantSelect"
      v-if="false"
      >
    </Variants>-->
  </div>
</template>

<script>
//import ImageViewport from './standard/ImageViewport.vue'
//import ZoomSlider from './ZoomSlider.vue'
import Variant from './Variant.vue'
import Variants from './Variants.vue'
import Modal from './standard/Modal.vue'
//import Slider from '@vueform/slider'
import Poster from '../classes/Poster.js'

export default {
  name: 'FileProperties',
  components: {
    //ImageViewport,
    //ZoomSlider
    Variant,
    Variants,
    Modal
  },
  props: {
    file: {
      type: Object,
      default: {}
    }
  },
  watch: {
    file(newValue, oldValue) {
      //console.log('file changed:', newValue);
      if (!newValue.isDir) {
        this.changePath(newValue.path);
        console.log('hi');
      }
    }
  },
  methods:{
    onVariantSelect(index) {
      this.selectedVariant = index;
    },
    onOriginalLoad() {
      //console.log('original load')
      //this.$refs.original.zoomToFit()
      this.updateHeight();
      //this.$refs.original.zoomToFit()
      let scaleZoomRatio = this.$refs.original.$refs.theport.calcScaleZoomRatio();
      //console.log('scaleZoomRatio is:', scaleZoomRatio);


      if (scaleZoomRatio > 1) {
        //console.log('shrinking to fit')
        let theport = this.$refs.original.$refs.theport;
        let theimg = theport.$refs.theimg;
        let thecontainer = theport.$refs.root;
        let w = theimg.naturalWidth;
        let h = theimg.naturalHeight;
        let containerWidth = thecontainer.offsetWidth;
        let containerHeight = this.height;
        let zh = containerHeight/h;
        let zw = containerWidth/w;
        //console.log('h', h, 'ch', containerHeight, 'zh', zh, 'cw', containerWidth);

        this.zoom = Math.min(zh, zw);

        //this.zoom = scaleZoomRatio;
      } else {
        //console.log('it fits when 100%')
        this.zoom = 1;
      }
      this.translateX = 0;
      this.translateY = 0;
    },
    onOriginalResize() {
      this.updateHeight();
    },
    onConvertClick() {
      let me = this;

      Poster.post('convert', {path: this.path}, function(response) {

        if (response?.success == false) {
          me.errorMsg = response.data;
        } else {
          //me.reload();
          me.log = response.log;
        }

        //console.log(response);
        //me.selectedInfo = response;
      });

    },
    updateHeight() {
      if (this.$refs.original) {
        //console.log('calling zoomToFit');
        //this.zoom = 2;
        this.height = this.$refs.original.$refs.theport.getGoodContainerHeight();
        this.scaleZoomRatio = this.$refs.original.$refs.theport.calcScaleZoomRatio();
        //console.log('this.scaleZoomRatio', this.scaleZoomRatio);
      }
    },
    reset() {
      //this.zoom = 1;
      //this.translateX = 0;
      //this.translateY = 0;
      this.originalInfo = null;
      this.convertedInfo = null;
      //this.errorMsg = 'reset';

    },
    reload() {
      this.load();
    },
    changePath(path) {
      console.log('there');
      this.reset();
      this.path = path;
      this.loading = true;
      this.errorMsg = '';
      this.load();
      this.log = '';
    },
    load() {
      let me = this;
      Poster.post('info', {path: this.path}, function(response) {
        if (response?.success == false) {
          me.errorMsg = response.data;
        }
        me.loading = false;
        me.originalInfo = response.original;
        if (response.converted) {
          me.convertedInfo = response.converted;
        }

        //console.log(response);
        //me.selectedInfo = response;
      });

    }
  },
  mounted() {
    if (this.file) {
      //this.load(this.file.path);
      this.path = this.file.path;
      this.load();
    }
  },
  data() {
    return {
      zoom: 1,
      scaleZoomRatio: 1,
      translateX: 0,
      translateY: 0,
      height: 100,
      loading: false,
      errorMsg: '',
      originalInfo: null,
      convertedInfo: null,
      path: '',
      log: '',
      showingLogDialog: false,
    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.file-properties {
  & .error {
    color: red;
    font-weight: bold;
  }
  & .path {
    margin-bottom: 20px;
    & .path {
      color: #666;
      font-style: italic;
    }
  }
  & .log-button {
    margin-left: 15px;
  }
}
</style>
