import { createApp } from 'vue'
import WCFM from './WCFM.vue'
import './index.css'
import './tables.css'

// Cannot get v-tooltip to work. But it is also in alpha for Vue 3...
// https://github.com/Akryum/v-tooltip/issues/545
// https://github.com/Akryum/v-tooltip/discussions/603
//import Vue from 'vue'
//import VTooltip from 'v-tooltip'
//Vue.use(VTooltip)

const wcfm = createApp(WCFM);

if (!window["wcfmoptions"]) {
  window["wcfmoptions"] = {}
  window["wcfmoptions"]['poster'] = function(command, options, successCallback, errorCallback) {
    switch (command) {
      case 'get-tree':
        var response = {
          name: 'root',
          isDir: true,
          isOpen: true,
          children: [
            {name:'folder', isDir:true, children: [
                {name:'file', isDir:false},
                {name:'subfolder', isDir:true, children: [
                  {name:'file', isDir:false},
                ]},
                {name:'file', isDir:false}
              ]
              },
              {name:'file', isDir:false, isConverted: true},
              {name:'file2', isDir:false, isConverted: false}
            ]
        };
        break;
      case 'conversion-settings':
        var response = {
          converters: [
            {id: 'cwebp', name: 'cwebp'}, // TODO: Accept option definitions!
            {id: 'vips', name: 'vips'},
            {id: 'ewww', name: 'ewww'},
            {id: 'gd', name: 'gd'},
          ],
          options: [
            {
              "id": "converter",
              "type": "string",
              "default": 'cwebp',
              "ui": {
                "component": "select",
                "label": "Converter",
                "options": ['cwebp', 'ewww'],
                "optionLabels": {
                  'cwebp': 'cwebp',
                  'ewww': 'ewww',
                }
              },
            },
            {
              "id": "metadata",
              "type": "string",
              "default": 'exif',
              "ui": {
                "component": "multi-select",
                "label": "Metadata",
                "options": ['all', 'none', 'exif', 'icc', 'xmp'],
                "optionLabels": {
                  'all': 'All',
                  'none': 'None',
                  'exif': 'Exif',
                  'icc': 'ICC',
                  'xmp': 'XMP'
                }
              },
            },
            {
              "id": "encoding",
              "type": "string",
              "default": 'auto',
              "ui": {
                "component": "select",
                "label": "Encoding",
                "options": ['auto', 'lossy', 'lossless'],
                "optionLabels": {
                  'auto': 'Auto',
                  'lossy': 'Lossy',
                  'lossless': 'Lossless'
                }
              },
            },
            {
              "id": "quality",
              "type": "int",
              "default": 85,
              "min": 0,
              "max": 100,
              "ui": {
                "component": "input",
                "label": "Quality (lossy)",
              },
            },
            {
              "id": "try-supplied-binary-for-os",
              "type": "boolean",
              "default": false,
              "ui": {
                "component": "checkbox",
                "label": "Try supplied binary for OS",
                "help-text": "help me!",
                "display-condition": {
                  'function': 'in-array',
                  'args': [
                    {
                      'function': 'option-value',
                      'args': ['converter']
                    },
                    ['cwebp']
                  ]
                },
              },
            },
            {
              "id": "skip-these-precompiled-binaries",
              "type": "string",
              "default": "",
              "ui": {
                "component": "input",
                "label": "Skip these precompiled binaries",
                "display-condition": {
                  'function': 'and',
                  'args': [
                    {
                      'function': 'in-array',
                      'args': [
                        {
                          'function': 'option-value',
                          'args': ['converter']
                        },
                        ['cwebp']
                      ]
                    },
                    {
                      'function': 'equals',
                      'args': [
                        {
                          'function': 'option-value',
                          'args': ['try-supplied-binary-for-os']
                        },
                        true
                      ]
                    }
                  ],
                },
              },
            },
          ],
          supportedStandardOptions: {
            encoding: ['cwebp', 'vips', 'imagick', 'gmagick', 'imagemagick', 'graphicsmagick', 'ffmpeg', 'wpc'],
            method: ['cwebp', 'imagick', 'gmagick', 'imagemagick', 'graphicsmagick', 'ffmpeg', 'wpc'],
            nearLossless: ['cwebp', 'vips', 'wpc']
          },
          overrideDefaults: {
            converter: 'cwebp',
            //encoding: 'lossless',
            //method: 3,
          },
          systemStatus: {
            converterRequirements: {
              gd: {
                extensionLoaded: false,
                compiledWithWebP: true,
              }
            }

          }

        }
        break;
        case 'info':
          var response = {
            original: {
              name: 'file.png',
              size: 100,
              url: '',
            },
            converted: {
              name: 'file.png.webp',
              size: 70,
              url: ''
            },
            log: 'blah blah blah'
          }
          break;
        default:
          var response = 'ok';
          break;
    }
    successCallback(response);

  }
}

/*

if (window['wcfmoptions']) {
  wcfm.config.globalProperties['globalOptions'] = window.wcfmoptions;
}
*/
wcfm.mount('#webpconvert-filemanager');

//window.wcfileman = wcfm;
