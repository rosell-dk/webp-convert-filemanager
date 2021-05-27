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
            /*
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
                "default": {
                  'function': 'if-else',
                  'args': [
                    {
                      'function': 'equals',
                      'args': [
                        {
                          'function': 'state',
                          'args': ['imageType']
                        },
                        'png'
                      ]
                    },
                    90,
                    95
                  ]
                }
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
                "display": {
                  'function': 'inArray',
                  'args': [
                    {
                      'function': 'state',
                      'args': ['option', 'converter']
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
                "display": {
                  'function': 'and',
                  'args': [
                    {
                      'function': 'inArray',
                      'args': [
                        {
                          'function': 'state',
                          'args': ['option', 'converter']
                        },
                        ['cwebp']
                      ]
                    },
                    {
                      'function': 'equals',
                      'args': [
                        {
                          'function': 'state',
                          'args': ['option', 'try-supplied-binary-for-os']
                        },
                        true
                      ]
                    }
                  ],
                },
              },
            },*/
            {
            "id": "encoding",
            "type": "string",
            "allowed-value-types": [
                "string"
            ],
            "default": "lossless",
            "ui": {
                "component": "select",
                "label": "Encoding",
                "options": [
                    "auto",
                    "lossy",
                    "lossless"
                ],
                "optionLabels": {
                    "auto": "Auto",
                    "lossy": "Lossy",
                    "lossless": "Lossless"
                },
                "help-text": "Set encoding for the webp. If you choose \"auto\", webp-convert will convert to both lossy and lossless and pick the smallest result"
            },
            "sensitive": false,
            "options": [
                "lossy",
                "lossless",
                "auto"
            ]
        },
        {
            "id": "quality",
            "type": "int",
            "allowed-value-types": [
                "int",
                "string"
            ],
            "default": 85,
            "ui": {
                "component": "input",
                "label": "Quality (Lossy)",
                "help-text": "Quality for lossy encoding. ",
                "display": {
                    "function": "notEquals",
                    "args": [
                        {
                            "function": "state",
                            "args": [
                                "option",
                                "encoding"
                            ]
                        },
                        "lossless"
                    ]
                }
            }
        },
        {
            "id": "auto-limit",
            "type": "boolean",
            "allowed-value-types": [
                "boolean"
            ],
            "default": true,
            "ui": {
                "component": "checkbox",
                "label": "Auto limit",
                "help-text": "Limit the quality to be no more than that of the jpeg. The option is only relevant when converting jpegs to lossy webp. To be functional, webp-convert needs to be able to detect the quality of the jpeg, which requires ImageMagick or GraphicsMagick.",
                "display": {
                    "function": "notEquals",
                    "args": [
                        {
                            "function": "state",
                            "args": [
                                "option",
                                "encoding"
                            ]
                        },
                        "lossless"
                    ]
                }
            }
        },
        {
            "id": "near-lossless",
            "type": "int",
            "allowed-value-types": [
                "int"
            ],
            "default": 60,
            "ui": {
                "component": "input",
                "label": "\"Near lossless\" quality",
                "help-text": "This option allows you to get impressively better compression for lossless encoding, with minimal impact on visual quality. The result is still lossless (lossless encoding). What libwebp does is that it preprocesses the image before encoding it, in order to make it better suited for compression. The range is 0 (no preprocessing) to 100 (maximum preprocessing). A good compromise would be around 60. The option is ignored when encoding is set to lossy. Read more [here](https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#near-lossless).",
                "display": {
                    "function": "notEquals",
                    "args": [
                        {
                            "function": "state",
                            "args": [
                                "option",
                                "encoding"
                            ]
                        },
                        "lossy"
                    ]
                }
            },
            "min": 0,
            "max": 100
        },
        {
            "id": "alpha-quality",
            "type": "int",
            "allowed-value-types": [
                "int"
            ],
            "default": 85,
            "ui": {
                "component": "input",
                "label": "Alpha quality",
                "help-text": "Quality of alpha channel. Only relevant for lossy encoding and only relevant for imageswith transparency",
                "display": {
                    "function": "notEquals",
                    "args": [
                        {
                            "function": "state",
                            "args": [
                                "option",
                                "encoding"
                            ]
                        },
                        "lossy"
                    ]
                }
            },
            "min": 0,
            "max": 100
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
