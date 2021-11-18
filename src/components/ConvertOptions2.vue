<template>
  <div class="convert-options">
    <!--<p>General: {{ general.data }}</p>
    <p>PNG: {{ png.data }}</p>-->
    <button
      v-tooltip="'Swich between advanced view (all available options) and simple view (most used options)'"
      v-text="advancedView ? 'Hide advanced options' : 'Show advanced options'"
      @click="advancedView = !advancedView">
    </button>

    <AutoUI :ui="general.ui" :schema="schema" :modelValue="general.data" expressionContext="general" :advancedView="advancedView" :showAdvancedButton="false"/>
    <AutoUI v-show="tweakpng" :ui="png.ui" :schema="schema" :modelValue="png.data" expressionContext="png" :advancedView="advancedView" :showAdvancedButton="false"/>
    <AutoUI :ui="uniqueUi" :schema="schema" :modelValue="general.data" expressionContext="general" :advancedView="advancedView" :showAdvancedButton="false"/>
  </div>
</template>

<script>
import Poster from '../classes/Poster.js'
import AutoUI from '../autoui/AutoUI.vue';
import JsExpression from '@rosell/js-expression'

export default {
  name: 'ConvertOptions2',
  components: {
    AutoUI
  },
  computed: {
    tweakpng() {
      if (this?.general?.data?.tweakpng == undefined) {
        return true;
      }
      return this.general.data.tweakpng;
    }
  },
  methods: {
    isOptionSupportedByConverter(optionId, converter) {
      // Check if optionId is supported for the selected converter
      if (!converter) {
        return true;
      }
      if (converter == 'stack') {
        return true;
      }
      if (!this.unsupportedBy) {
        return true;
      }
      if (!this.unsupportedBy[optionId]) {
        return true;
      }

      let unsupported = this.unsupportedBy[optionId].includes(converter);
      return !unsupported;
    },
    getOptions() {
      if (!this?.general?.data) {
        return {}
      }

      let options = {...this.general.data};  // clone general options
      let tweakpng = options.tweakpng;
      delete options['tweakpng'];

      // TODO: delete options not supported by the converter

      if (!tweakpng) {
        //console.log(JSON.stringify(options));
        return options;
      }
      let pngOptions = this.png.data;
      //console.log(options);
      let overrides = pngOptions['overrides'];

      overrides.forEach(function(id) {
        if (pngOptions[id] !== undefined) {
          if (pngOptions[id] != options[id]) {
            options['png-' + id] = pngOptions[id];
          }
        }
      });

      //console.log(JSON.stringify(options));
      return options;
    }
  },
  mounted() {
    var me = this;
    Poster.post('conversion-settings', {folder: ''}, function(response) {
      //me.item = response;
      // TODO: Loading animation
      //console.log('r:', response);


      let generalUi = [];
      let uniqueUi = [];
      let pngUI = [];

      let schemaProperties = {};    // See #3 for the rationale of splitting ui and schema
      let defaults = {};
      let pngDefaults = {
        'overrides': ['encoding', 'quality', 'near-lossless']
      };  // ps: removed 'alpha-quality', as it only makes sense for PNG

      let ids = [];
      let generalOptions = response.options['general'];
      let uniqueOptions = response.options['unique'];

      generalOptions.push(
        {
            "id": "tweakpng",
            "schema": {
                "title": "Tweak settings for PNG",
                "description": "",
                "type": ["boolean"],
                "default": false
            },
            "ui": {
              "component": "checkbox",
              'data-property': 'tweakpng',
            },
            "unsupportedBy": [],    // 'ewww', 'gd' ?
        }
      );

      let allOptions = generalOptions.map((x) => x);
      for (const item in uniqueOptions) {
        for (let i=0; i<uniqueOptions[item].length; i++) {
          let option = uniqueOptions[item][i];
          if (option['id'].indexOf(item + '-') == -1) {
            option['id'] = item + '-' + option['id'];
          }
          allOptions.push(option);
        }
      }

      for (var i=0; i<allOptions.length; i++) {
        ids.push(allOptions[i].id);
      }

      pngUI.push({
        "component": "multi-select",
        'data-property': 'overrides',
        // TODO: set to complete list
        "options": ids,
        "display": "false"
      });
      schemaProperties['overrides'] = {
          "title": "Overrides",
          "description": "Select options you want to override for PNG",
          "type": [
              "string"
          ],
          "default": []
      }

      let unsupportedBy = {};
      let hasSpecificPNGOptions = false;

      let schemaDefaults = [];

      for (var i=0; i<allOptions.length; i++) {
        let option = allOptions[i];
        if (option.schema) {
          schemaProperties[option.id] = option.schema;
          if (response.defaults[option.id]) {
            defaults[option.id] = response.defaults[option.id];
            pngDefaults[option.id] = response.defaults[option.id];
          } else {
            if (option.schema.default != undefined) {
              defaults[option.id] = option.schema.default;
              pngDefaults[option.id] = option.schema.default;
            }
          }
          if (option.schema.default != undefined) {
            schemaDefaults[option.id] = option.schema.default;
          }
        }
        if (option.unsupportedBy) {
          unsupportedBy[option.id] = option.unsupportedBy
        }
      }
      for (const [key, value] of Object.entries(defaults['png'])) {
        if (pngDefaults[key] != value) {
          pngDefaults[key] = value;
          hasSpecificPNGOptions = true;
        }
      }

      for (var i=0; i<generalOptions.length; i++) {
        //generalUi.push(generalOptions[i].schema);

        let option = generalOptions[i];
        if (option.ui) {
          let componentUi = option.ui;
          componentUi['data-property'] = option.id;

          if (componentUi['display']) {
            if (componentUi['display'].indexOf("option.encoding") >= 0) {
              // option.encoding might have been set even though the converter doesn't support it
              // it should be ignored, then...
              //componentUi['display'] = '!supported("encoding") || (' + componentUi['display'] + ')';
              componentUi['display'] = componentUi['display'].replace(/option.encoding/gi, "getOption('encoding')");
              console.log('result', componentUi['display']);
            }

            componentUi['display'] = 'supported("' + option.id + '") && (' + componentUi['display'] + ')';
          } else {
            componentUi['display'] = 'supported("' + option.id + '")';
          }
          generalUi.push(componentUi);

          //let componentUiPNG = option.ui;
          let componentUiPNG = Object.assign({}, componentUi);
          //componentUiPNG['data-property'] = option.id;
          if (componentUiPNG['display']) {
            componentUiPNG['display'] = 'overriding("' + option.id + '") && (' + componentUiPNG['display'] + ')';
          } else {
            componentUiPNG['display'] = 'overriding("' + option.id + '")'
          }
          //console.log(componentUiPNG);
          pngUI.push(componentUiPNG);

        }
      }

      for (const converter in uniqueOptions) {
        let group = {
          'component': 'group',
          'title': converter + ' options',
          'sub-components': [],
          'display': "(option.converter == '" + converter + "') || (option.converter == 'stack')"
        }
        let containsUnadvanced = false;
        for (let i=0; i<uniqueOptions[converter].length; i++) {
          let option = uniqueOptions[converter][i];
          if (option.ui) {
            let componentUi = option.ui;
            componentUi['data-property'] = option.id;
            if (!componentUi['advanced']) {
              containsUnadvanced = true;
            }
            group['sub-components'].push(componentUi);
          }
        }
        group['advanced'] = !containsUnadvanced;
        if (group['sub-components'].length > 0) {
          uniqueUi.push(group);
          //generalUi.push(group);
        }
      }
      defaults['tweakpng'] = hasSpecificPNGOptions;

      /*
      generalUi.push({
        "component": "checkbox",
        'data-property': 'tweakpng',
        // TODO: set to complete list
      });
      schemaProperties['tweakpng'] = {
          "title": "Tweak settings for PNG",
          "description": "",
          "type": [
              "boolean"
          ],
          "default": false
      }
      defaults['tweakpng'] = hasSpecificPNGOptions;
      */

      //Object.assign(person, job);

      //console.log(unsupportedBy);
//console.log('options', me.options);

      /*generalUi.push({
        'component': 'group',
        'title': 'PNG overrides',
        'display': 'option.tweakpng',
        'sub-components': pngUI,
      });*/

      me.general = {
        'ui': {
          'component': 'group',
          'title': 'General',
          'sub-components': generalUi,

        },
        'data': defaults
      }

      me.uniqueUi = {
        'component': 'group',
        'title': '',
        'sub-components': uniqueUi,
      };



      me.png = {
        'ui': {
          'component': 'group',
          'title': 'PNG tweaks',
          'sub-components': pngUI,
        },
        'data': pngDefaults
      }
      me.unsupportedBy = unsupportedBy;

      /*
      me.ui = {
        'component': 'group',
        'title': '',
        'sub-components': [
          {
            'component': 'group',
            'title': 'Conversion options',
            'sub-components': components
          },
          {
            'component': 'group',
            'title': 'PNG',
            'sub-components': components
          }
        ]
      }*/

      me.schema = {
        "title": 'Options',
        "type": ['object'],
        "properties": schemaProperties
      }

      let globalContextGeneral = {
        //option: me.general.data,
        option: function(id) {
          //return 'any';
          if (!me.isOptionSupportedByConverter(id, me.general.data['converter'])) {
            return schemaDefaults[id];
          }
          return me.general.data[id];
        },
        imageType: 'any',
        supported: function(optionId) {
            // Check if optionId is supported for the selected converter
            if (!me.general.data['converter']) {
              return true;
            }
            return me.isOptionSupportedByConverter(optionId, me.general.data['converter']);
        },
      };

      let globalContextPNG = {
        //option: me.png.data,
        option: function(id){
          if (!me.isOptionSupportedByConverter(id, me.png.data['converter'])) {
            return schemaDefaults[id];
          }
          return me.png.data[id];
        },
        imageType: 'png',
        overriding: function(id) {
          // Tells if an option is selected as having a PNG override
          return (me.png.data.overrides.indexOf(id) > -1)
        },
        supported: function(optionId) {
            // Check if optionId is supported for the selected converter
            //console.log('supported (png)?', optionId);
            //console.log('supported', me.png.data['overrides']);
            /*let overridden = (me.png.data.overrides.indexOf(optionId) > -1);
            if (overridden) {

            }*/
            // Check if optionId is supported for the selected converter
            if (!me.general.data['converter']) {
              return true;
            }
            return me.isOptionSupportedByConverter(optionId, me.general.data['converter']);
        },
      };
      //console.log('globalContext', globalContext);
      JsExpression.setGlobalContext(globalContextGeneral, 'general');
      JsExpression.setGlobalContext(globalContextPNG, 'png');

      /*me.ui = {
        'component': 'slider',
        'data-property': 'quality',
      }*/

      //me.data.quality = 77;
      //me.data.quality = 79;
      /*
      for (var i=0; i<options.length; i++) {
        var option = options[i];
        me.optionValues[option.id] = option.schema.default;
      }*/
    });

    Poster.post('get-tree', {folder: ''}, function(response) {
      me.item = response;
    });
  },
  data() {
    return {
      //ui: {},
      schema: {},
      general: {
        ui: {},
        data: {
          quality: 40,
          'alpha-quality': 65,
          'auto-limit': true,
          "command-line-options": '',
          'skip-these-precompiled-binaries': ''
        }
      },
      png: {
        ui: {},
        data: {}
      },
      advancedView: false,
      unsupportedBy: [],
      uniqueUi: []
    }
  }
}
</script>

<style>
.convert-options {
  & button {
    float: right;
    margin-top: 10px;
  }
}
/*
.convert-options {
  height:100%;
  overflow-y: auto;
  padding:10px 20px;
}*/
</style>
