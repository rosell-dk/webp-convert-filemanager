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
    <AutoUI v-show="advancedView" :ui="png.ui" :schema="schema" :modelValue="png.data" expressionContext="png" :advancedView="advancedView" :showAdvancedButton="false"/>
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
  },
  data() {
    return {
      ui: {},
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
      advancedView: false
    }
  },
  mounted() {
    var me = this;
    Poster.post('conversion-settings', {folder: ''}, function(response) {
      //me.item = response;
      // TODO: Loading animation
      //console.log('r:', response);

      let components = [];
      let pngUI = [];

      let schemaProperties = {};
      let defaults = {};
      let pngDefaults = {
        'overrides': ['encoding', 'quality', 'alpha-quality', 'near-lossless']
      };

      let ids = [];
      let generalOptions = response.options['general'];
      let uniqueOptions = response.options['unique'];

      let allOptions = generalOptions.map((x) => x);
      for (const item in uniqueOptions) {
        for (let i=0; i<uniqueOptions[item].length; i++) {
          let option = uniqueOptions[item][i];
          option['id'] = item + '-' + option['id'];
          allOptions.push(option);
        }
      }

      for (var i=0; i<allOptions.length; i++) {
        ids.push(allOptions[i].id);
      }

      /*
      pngUI.push({
        "component": "multi-select",
        'data-property': 'overrides',
        // TODO: set to complete list
        "options": ids
      });
      schemaProperties['overrides'] = {
          "title": "Overrides",
          "description": "Select options you want to override for PNG",
          "type": [
              "string"
          ],
          "default": ['hello1']
      }*/

      let unsupportedBy = {};

      for (var i=0; i<allOptions.length; i++) {
        let option = allOptions[i];
        if (option.schema) {
          schemaProperties[option.id] = option.schema;
          if (response.defaults[option.id]) {
            defaults[option.id] = response.defaults[option.id];
          } else {
            if (option.schema.default != undefined) {
              defaults[option.id] = option.schema.default;
              pngDefaults[option.id] = option.schema.default;
            }
          }
        }
        if (option.unsupportedBy) {
          unsupportedBy[option.id] = option.unsupportedBy
        }
      }
      for (const [key, value] of Object.entries(defaults['png'])) {
        pngDefaults[key] = value;
      }

      for (var i=0; i<generalOptions.length; i++) {
        //components.push(generalOptions[i].schema);

        let option = generalOptions[i];
        if (option.ui) {
          let componentUi = option.ui;
          componentUi['data-property'] = option.id;
          if (componentUi['display']) {
            componentUi['display'] = 'supported("' + option.id + '") && (' + componentUi['display'] + ')';
          } else {
            componentUi['display'] = 'supported("' + option.id + '")';
          }
          components.push(componentUi);

          //let componentUiPNG = option.ui;
          let componentUiPNG = Object.assign({}, option.ui);
          componentUiPNG['data-property'] = option.id;
          if (componentUiPNG['display']) {
            componentUiPNG['display'] = 'overriding("' + option.id + '") && (' + componentUiPNG['display'] + ')';
          } else {
            componentUiPNG['display'] = 'overriding("' + option.id + '")'
          }
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
          components.push(group);

        }
      }

      //Object.assign(person, job);

      //console.log(unsupportedBy);
//console.log('options', me.options);

      me.general = {
        'ui': {
          'component': 'group',
          'title': 'General',
          'sub-components': components
        },
        'data': defaults
      }

      me.png = {
        'ui': {
          'component': 'group',
          'title': 'PNG overrides',
          'sub-components': pngUI
        },
        'data': pngDefaults
      }

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
        option: me.general.data,
        imageType: 'any',
        supported: function(optionId) {
            // Check if optionId is supported for the selected converter
            if (!me.general.data['converter']) {
              return true;
            }
            let converter = me.general.data['converter'];
            if (converter == 'stack') {
              return true;
            }
            if (!unsupportedBy) {
              return true;
            }
            if (!unsupportedBy[optionId]) {
              return true;
            }

            let unsupported = unsupportedBy[optionId].includes(converter);
            return !unsupported;
            //return true;
        },
      };

      let globalContextPNG = {
        option: me.png.data,
        imageType: 'png',
        overriding: function(id) {
          //console.log('overriding?', id);
          //console.log(me.png.data.overrides);
          //return true;
          return (me.png.data.overrides.indexOf(id) > -1)
        },
        supported: function(optionId) {
            // Check if optionId is supported for the selected converter
            //console.log('supported (png)?', optionId);
            return true;
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
  watch: {
  },
  methods: {

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
