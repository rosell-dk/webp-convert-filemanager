<template>
  {{
    optionValues
  }}<br>
  <div class="table-table convert-options">
    <ConvertOption v-for="option in options" :option="option" :optionValues="optionValues" v-model="optionValues[option.id]" :show="!option['ui']['advanced'] || advancedView"/>
    <div>
      <div><label>Converter</label></div>
      <div>
        <SelectBox v-model="converter" :options="converters" optionsLabel="name" optionsKey="id" placeholder="Select converter" />
      </div>
    </div>
  </div>
  <div class="view-select">
    <button v-tooltip="'Swich between advanced view (all available options) and simple view (most used options)'" v-text="advancedView ? 'Hide advanced options' : 'Show advanced options'" @click="advancedView = !advancedView"></button>
  </div>
</template>

<script>
import Poster from '../classes/Poster.js'
import SelectBox from './standard/SelectBox.vue'
import HelpIcon from './HelpIcon.vue'
import ConvertOption from './ConvertOption.vue'
import ExpressionEvaluator from '../classes/ExpressionEvaluator.js'
import ExpressionParser from '../classes/ExpressionParser.js'
import SimpleMarkdown from '../classes/SimpleMarkdown.js'

export default {
  name: 'ConvertOptions',
  components: {
    SelectBox, HelpIcon, ConvertOption
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
      advancedView: false,
      // Global "constants"
      converters: [
        {id: 'cwebp', name: 'cwebp'},
        {id: 'vips', name: 'vips'},
        {id: 'ewww', name: 'ewww'},
        {id: 'gd', name: 'gd'},
      ],
      options: [],
      supportedOptions: {
        encoding: ['cwebp', 'vips', 'imagick', 'gmagick', 'imagemagick', 'graphicsmagick', 'ffmpeg', 'wpc'],
        method: ['cwebp', 'imagick', 'gmagick', 'imagemagick', 'graphicsmagick', 'ffmpeg', 'wpc'],
        nearLossless: ['cwebp', 'vips', 'wpc']
      },

      // System status
      qualityDetectionSupported: true,

      optionValues: {},
      // Options
      encoding: 'auto',
      converter: 'cwebp',
      'use-nice': true,
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

    ExpressionParser.parseString("notEquals(state('option', 'encoding'), 'lossy')");


    Poster.post('conversion-settings', {folder: ''}, function(response) {
      //me.item = response;
      // TODO: Loading animation
      //console.log('r:', response);

      var options = [];
      for (var i=0; i<response.options.length; i++) {
        if (response.options[i]['ui']) {
          options.push(response.options[i]);
        }
      }

//console.log('options', me.options);


      for (var i=0; i<options.length; i++) {
        var option = options[i];
        me.optionValues[option.id] = option.schema.default;
      }

      /*
      for (var i=0; i<options.length; i++) {
        var option = options[i];
        var expression = '';
        if (option['ui']['default']) {
          me.optionValues[option.id] = ExpressionEvaluator.evaluate(
            ExpressionParser.parseString(option['ui']['default']),
            {
              'option': me.optionValues,
              'imageType': 'jpeg'
            }
          );
        }
      }*/

      /*
      for (var i=0; i<me.options.length; i++) {
        var option = me.options[i];
        if (option['ui']['help-text']) {
          option['ui']['help-text'] = SimpleMarkdown.md2html(option['ui']['help-text']);
        }
      }*/
      for (var i=0; i<options.length; i++) {
        var option = options[i];
        //console.log('option:', option);
        if (!option['ui']['links']) {
          option['ui']['links'] = [];
        }
        option['ui']['links'].push(
          [
            'API',
            'https://github.com/rosell-dk/webp-convert/blob/master/docs/v2.0/converting/options.md#'
              + option['id']
          ]
        )
      }

      me.options = options;



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
    },
    viewLabel(value) {
      return (value == 0) ? 'View all options' : 'Simple view';
    }
  }
}
</script>

<style scoped>
  .view-select {
    display: block;
    text-align: right;
  }
  .view *:first-child {
    display: inline-block;
    margin-right: 10px;
  }
  .view *:last-child {
    width: 200px;
    display: inline-block;
  }
</style>
