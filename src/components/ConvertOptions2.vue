<template>
  <div class="convert-options">
    <p>General: {{ general.data }}</p>
    <p>PNG: {{ png.data }}</p>

    <AutoUI :ui="general.ui" :schema="schema" :modelValue="general.data" expressionContext="general"/>
    <AutoUI :ui="png.ui" :schema="schema" :modelValue="png.data" expressionContext="png" :advancedView="true" :showAdvancedButton="false"/>
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
  props: {
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
      }
    }
  },
  mounted() {
    var me = this;
    Poster.post('conversion-settings', {folder: ''}, function(response) {
      //me.item = response;
      // TODO: Loading animation
      console.log('r:', response);

      let components = [];
      let pngUI = [];

      let schemaProperties = {};
      let defaults = {};
      let pngDefaults = {
        'overrides': ['encoding', 'quality', 'alpha-quality', 'near-lossless']
      };

      let ids = [];
      for (var i=0; i<response.options.length; i++) {
        ids.push(response.options[i].id);
      }

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
      }


      for (var i=0; i<response.options.length; i++) {
        let option = response.options[i];
        if (option.ui) {
          let componentUi = option.ui;
          componentUi['data-property'] = option.id;
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
        if (option.schema) {
          let componentUi = option.schema;
          schemaProperties[option.id] = option.schema;
          components.push(componentUi);
          if (option.schema.default) {
            defaults[option.id] = option.schema.default;
            pngDefaults[option.id] = option.schema.default;
          }
        }
      }
      for (const [key, value] of Object.entries(defaults['png'])) {
        pngDefaults[key] = value;
      }
      //Object.assign(person, job);


//console.log('options', me.options);

      me.general = {
        'ui': {
          'component': 'group',
          'title': 'Conversion options',
          'sub-components': components
        },
        'data': defaults
      }

      me.png = {
        'ui': {
          'component': 'group',
          'title': 'Conversion options (PNG)',
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
        }
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

<style scoped>
.convert-options {
  margin-right: 15px;
}
</style>
