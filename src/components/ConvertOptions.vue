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
      <div>
        <label>Quality{{ converterSupportsEncoding && (encoding != 'lossy') ? ' (lossy)' : '' }}</label>
        <HelpIcon v-if="qualityDetectionSupported">
          <p>
          Set quality when converting to a webp with lossy encoding.
          The "autolimit" option limits the quality setting of the webp
          so it doesn't exceed that of the jpeg being converted.
          </p>
          <p>
            Example:
            You have set the quality to 85.
            The jpeg that is going to be converted has quality 42.
            With "autolimit" on, the converted image will be of quality 42 rather than 85.
            Visually, the result will be the same, but converting with quality 42 rather than 85 produces a much lighter file.
          </p>
          <p>
            Note that the "autolimitter" only applies to Jpegs. PNGs doesn't have a quality setting, as they are lossless.
          </p>
          <p>
            PS:
            The fact that the autolimit option is available to you here
            means that webpconvert has the means to detect the quality of jpeg files.
          </p>
        </HelpIcon>
      </div>
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
    <div v-show="converterSupportsMethod">
      <div><label>Method (0-5)</label></div>
      <div>
        <input type="number" class="method" v-model="method" />
      </div>
    </div>
    <div v-if="converter == 'ewww'">
      <div><label>Api key</label></div>
      <div>
        <input v-model="converterOptions.ewww['api-key']" />
      </div>
    </div>

  </div>
  <pre>
  Converter: {{ converter }}
  Encoding: {{ encoding }}
  Quality (lossy):
    quality: {{ qualityLossy.quality }},
    max: {{ qualityLossy.max }},
    default: {{ qualityLossy.default }}
</pre>
</template>

<script>
import Poster from '../classes/Poster.js'
import SelectBox from './SelectBox.vue'
import EncodingSelector from './EncodingSelector.vue'
import QualityLossy from './QualityLossy.vue'
import QualityLossless from './QualityLossless.vue'
import HelpIcon from './HelpIcon.vue'

export default {
  name: 'ConvertOptions',
  components: {
    SelectBox, EncodingSelector, QualityLossy, QualityLossless, HelpIcon
  },
  props: {
    item: Object
  },
  computed: {
    converterSupportsEncoding() {
      return this.converterSupports('encoding');
    },
    converterSupportsNearLossless() {
      return this.converterSupports('nearLossless');
    },
    converterSupportsMethod() {
      return this.converterSupports('method');
    }

  },
  data() {
    return {
      // Global "constants"
      converters: [
        {id: 'cwebp', name: 'cwebp'},
        {id: 'vips', name: 'vips'},
        {id: 'ewww', name: 'ewww'},
        {id: 'gd', name: 'gd'},
      ],
      supportedOptions: {
        encoding: ['cwebp', 'vips', 'imagick', 'gmagick', 'imagemagick', 'graphicsmagick', 'ffmpeg', 'wpc'],
        method: ['cwebp', 'imagick', 'gmagick', 'imagemagick', 'graphicsmagick', 'ffmpeg', 'wpc'],
        nearLossless: ['cwebp', 'vips', 'wpc']
      },

      // System status
      qualityDetectionSupported: true,

      // Options
      encoding: 'auto',
      converter: 'cwebp',
      qualityLossy: {
        quality: 'auto',     // auto | number
        max: 85,
        default: 75
      },
      'use-nice': true,
      qualityLossless: {
        quality: 60
      },
      method: 5,
      converterOptions: {
        ewww: {
          'api-key': 'bogus-key-for-testing',
          'check-key-status-before-converting': false
        },
        cwebp: {
        }
      }
    }
  },
  mounted() {
    var me = this;
    Poster.post('conversion-settings', {folder: ''}, function(response) {
      //me.item = response;
      // TODO: Loading animation
      //console.log('r:', response);
      if (response.supportedStandardOptions) {
        var supportedStandardOptions = response.supportedStandardOptions;
        if (supportedStandardOptions.encoding) {
          me.supportedOptions.encoding = supportedStandardOptions.encoding;
        }
        if (supportedStandardOptions.method) {
          me.supportedOptions.method = supportedStandardOptions.method;
        }
        if (supportedStandardOptions.nearLossless) {
          me.supportedOptions.nearLossless = supportedStandardOptions.nearLossless;
        }
      }
      var newConverters = null;
      if (response.converters) {
        newConverters = response.converters;
      } else {
        if (response.systemStatus.converterRequirements) {
          newConverters = me.converters;
        }
      }

      if (response.systemStatus.converterRequirements) {
        var req = response.systemStatus.converterRequirements
        for (var i=0; i<newConverters.length; i++) {
          var id = newConverters[i]['id'];
          if (req[id]) {
            var r = req[id];
            for (var prop in r) {
              if (r[prop] === false) {
                newConverters[i]['icon'] = 'not-available';

                // TODO: set hover text.
                // We could provide standard hover texts in this class
                // for others (unknown requirements), generate a standard hover text
                // newConverters[i]['hoverText'] =
              }
            }
            /*
            switch (id) {
              case 'gd':
                if (r['extensionLoaded'] === false) {
                  newConverters[i]['hoverText'] = 'Required Gd extension is not available';
                }
                if (r['compiledWithWebP'] === false) {
                  newConverters[i]['icon'] = 'not-available';
                  newConverters[i]['hoverText'] = 'Gd has been compiled without webp support';
                }
                break;
            }*/
          }
        }
      }
      if (newConverters) {
        me.converters = newConverters;

        // Hack to forces change event even though no change, in case cwebp
        var temp = me.converter;
        me.converter = 'vips';
        me.converter = temp;
      }
      if (response.overrideDefaults) {
        var defaults = response.overrideDefaults;
        if (defaults.converter) {
          me.converter = defaults.converter;
        }
        if (defaults.encoding) {
          me.encoding = defaults.encoding;
        }
        if (defaults.method) {
          me.method = defaults.method;
        }
        // TODO: Provide more overridable defaults
      }
    });

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
      /*
alert('h')
      if (this.doesConverterSupportEncoding(newConverter)) {
        if (!this.doesConverterSupportEncoding(oldConverter)) {
          this.encoding = 'auto';
        }
      } else {
        this.encoding = null;
      }*/
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
    /*
    doesConverterSupportEncoding(converter) {
      return false;
      if (converter == 'gd') return false;
      if (converter == 'ewww') return false;
      return true;
    },*/
    optionSupported(optionName, converter) {
      var converter = this.converter;
      return this.supportedOptions[optionName].find(function(el) {return el == converter})
    },
    converterSupports(optionName) {
      return this.optionSupported(optionName, this.converter);
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
   & > div:last-child {
     width: 300px;
     box-sizing: border-box;
     & * {
       box-sizing: border-box;
       width: 100%;
     }
   }
   & input.method {
     width: 40px;
   }
 }
}



</style>
