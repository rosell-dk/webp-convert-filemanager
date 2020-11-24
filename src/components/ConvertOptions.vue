<template>
  <div class="table-table convert-options">
    <div>
      <div><label>Converter</label></div>
      <div>
        <SelectBox v-model="converter" :options="converters" optionsLabel="name" optionsKey="id" placeholder="Select converter" />
      </div>
    </div>
    <div v-show="converter && converterSupportsEncoding">
      <div><label>WebP encoding</label></div>
      <div>
        <EncodingSelector v-model="encoding" :converter="converter" />
      </div>
    </div>
    <div v-show="converter && ((encoding == 'auto') || (encoding == 'lossy') || (!converterSupportsEncoding))">
      <div><label>Quality{{ converterSupportsEncoding && (encoding != 'lossy') ? ' (lossy)' : '' }}</label></div>
      <div>
        <QualityLossy v-model="qualityLossy" :converter="converter" :qualityDetectionSupported="qualityDetectionSupported" />
      </div>
    </div>
    <div v-show="converterSupportsNearLossless && ((encoding == 'auto') || (encoding == 'lossless'))">
      <div><label>Quality{{(encoding != 'lossless') ? ' (lossless)' : '' }}</label></div>
      <div>
        <QualityLossless v-model="qualityLossless" :converter="converter" />
      </div>
    </div>

  </div>
  <pre>



Converter: {{ converter }}
Encoding: {{ encoding }}
Quality (lossy): quality: {{ qualityLossy.quality }}, max: {{ qualityLossy.max }}, default: {{ qualityLossy.default }}
  </pre>
</template>

<script>
import Poster from '../classes/Poster.js'
import SelectBox from './SelectBox.vue'
import EncodingSelector from './EncodingSelector.vue'
import QualityLossy from './QualityLossy.vue'
import QualityLossless from './QualityLossless.vue'

export default {
  name: 'ConvertOptions',
  components: {
    SelectBox, EncodingSelector, QualityLossy, QualityLossless
  },
  props: {
    item: Object
  },
  computed: {
    converterSupportsEncoding() {
      return (this.converter != 'ewww') && (this.converter != 'gd');
      /*
      switch (this.converter) {
        case 'gd':
        case 'ewwww':
          return false;
        default:
          return true;
      }*/
    },
    converterSupportsNearLossless() {
      switch (this.converter) {
        case 'cwebp':
        case 'vips':
        case 'wpc':
          return true;
        default:
          return false;
      }
    }
  },
  data() {
    return {
      qualityDetectionSupported: true,
      converter: 'ewww',
      encoding: 'auto',
      qualityLossy: {
        quality: 'auto',     // auto | number
        max: 85,
        default: 75
      },
      qualityLossless: {
        quality: 60
      },
      converters: [
        {id: 'cwebp', name: 'cwebp', },
        {id: 'vips', name: 'vips'},
        {id: 'ewww', name: 'ewww'},
        {id: 'gd', name: 'gd'},
      ]
    }
  },
  mounted() {
    if (!this.qualityDetectionSupported) {
      this.qualityLossy['quality'] = this.qualityLossy['default'];
    }
    /*
    this.qualityLossy = {
      quality: 'auto',     // auto | number
      max: 25,
      default: 17
    }*/
  },
  watch: {
    converter(newConverter, oldConverter) {
      //alert(newConverter)
      // TODO: Use code below or a local model (like in QualityLossy) ???

      if (this.doesConverterSupportEncoding(newConverter)) {
        if (!this.doesConverterSupportEncoding(oldConverter)) {
          this.encoding = 'auto';
        }
      } else {
        this.encoding = null;
      }
      /*
      if ((newConverter == 'gd') || (newConverter == 'ewww')) {
        this.encoding = null;
      }
      if ((oldConverter == 'gd') || (oldConverter == 'ewww')) {
        this.encoding = null;
      }*/
    }
  },
  methods: {
    doesConverterSupportEncoding(converter) {
      if (converter == 'gd') return false;
      if (converter == 'ewww') return false;
      return true;
    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */

/* Table, - in order to autosize first column */
.convert-options {
 & > div {
   & > div:first-child {
     min-width: 120px;
   }
 }
}



</style>
