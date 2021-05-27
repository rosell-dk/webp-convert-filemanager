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
                        "default": "auto",
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
                            "label": "Auto-limit",
                            "help-text": "Enable this option to prevent an unnecessarily high quality setting for low quality jpegs. You really should enable this. Read more about the feature [here](https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#preventing-unnecessarily-high-quality-setting-for-low-quality-jpegs).",
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
                        "id": "alpha-quality",
                        "type": "int",
                        "allowed-value-types": [
                            "int"
                        ],
                        "default": 85,
                        "ui": {
                            "component": "input",
                            "label": "Alpha quality",
                            "help-text": "Quality of alpha channel. Often, there is no need for high quality transparency layer and in some cases you can tweak this all the way down to 10 and save a lot in file size. The option only has effect with lossy encoding, and of course only on images with transparency. Read more [here](https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#alpha-quality)",
                            "display": {
                                "function": "and",
                                "args": [
                                    {
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
                                    },
                                    {
                                        "function": "notEquals",
                                        "args": [
                                            {
                                                "function": "state",
                                                "args": [
                                                    "imageType"
                                                ]
                                            },
                                            "jpeg"
                                        ]
                                    }
                                ]
                            }
                        },
                        "min": 0,
                        "max": 100
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
                            "help-text": "This option allows you to get impressively better compression for lossless encoding, with minimal impact on visual quality. The range is 0 (no preprocessing) to 100 (maximum preprocessing). Read more [here](https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#near-lossless).",
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
            "id": "metadata",
            "type": "metadata",
            "allowed-value-types": [
                "string"
            ],
            "default": "none",
            "ui": {
                "component": "multi-select",
                "label": "Metadata",
                "help-text": "Determines which metadata that should be copied over to the webp. Setting it to \"all\" preserves all metadata, setting it to \"none\" strips all metadata.*cwebp* can take a comma-separated list of which kinds of metadata that should be copied (ie \"exif,icc\"). *gd* will always remove all metadata and *ffmpeg* will always keep all metadata. The rest can either strip all or keep all (they will keep all, unless the option is set to *none*)",
                "options": [
                    "all",
                    "none",
                    "exif",
                    "icc",
                    "xmp"
                ],
                "optionLabels": {
                    "all": "All",
                    "none": "None",
                    "exif": "Exif",
                    "icc": "ICC",
                    "xmp": "XMP"
                }
            },
            "sensitive": false,
            "options": null
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
