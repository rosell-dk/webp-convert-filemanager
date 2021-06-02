export default [
  {
      "id": "encoding",
      "schema": {
          "title": "Encoding",
          "description": "Set encoding for the webp. If you choose \"auto\", webp-convert will convert to both lossy and lossless and pick the smallest result",
          "enum": [
              "auto",
              "lossy",
              "lossless"
          ],
          "type": [
              "string"
          ],
          "default": "auto"
      },
      "ui": {
          "component": "select",
          "links": [
              [
                  "Guide",
                  "https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#auto-selecting-between-losslesslossy-encoding"
              ]
          ]
      },
      "sensitive": false,
      "options": [
          "auto",
          "lossy",
          "lossless"
      ]
  },
  {
      "id": "quality",
      "schema": {
          "title": "Quality (Lossy)",
          "description": "Quality for lossy encoding. ",
          "default-png": 85,
          "default-jpeg": 75,
          "oneOf": [
              {
                  "type": "number",
                  "minimum": 0,
                  "maximum": 100
              },
              {
                  "type": "string",
                  "enum": [
                      "auto"
                  ]
              }
          ],
          "type": [
              "integer",
              "string"
          ],
          "default": 85
      },
      "ui": {
          "component": "slider",
          "display": "notEquals(state('option', 'encoding'), 'lossless')"
      }
  },
  {
      "id": "auto-limit",
      "schema": {
          "title": "Auto-limit",
          "description": "Enable this option to prevent an unnecessarily high quality setting for low quality jpegs. You really should enable this.",
          "type": [
              "boolean"
          ],
          "default": true
      },
      "ui": {
          "component": "checkbox",
          "advanced": true,
          "links": [
              [
                  "Guide",
                  "https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#preventing-unnecessarily-high-quality-setting-for-low-quality-jpegs"
              ]
          ],
          "display": "notEquals(state('option', 'encoding'), 'lossless')"
      }
  },
  {
      "id": "alpha-quality",
      "schema": {
          "title": "Alpha quality",
          "description": "Quality of alpha channel. Often, there is no need for high quality transparency layer and in some cases you can tweak this all the way down to 10 and save a lot in file size. The option only has effect with lossy encoding, and of course only on images with transparency.",
          "type": [
              "integer"
          ],
          "default": 85,
          "minimum": 0,
          "maximum": 100
      },
      "ui": {
          "component": "slider",
          "links": [
              [
                  "Guide",
                  "https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#alpha-quality"
              ]
          ],
          "display": "and(notEquals(state('option','encoding'),'lossless'),notEquals(state('imageType'),'jpeg'))"
      }
  },
  {
      "id": "near-lossless",
      "schema": {
          "title": "\"Near lossless\" quality",
          "description": "This option allows you to get impressively better compression for lossless encoding, with minimal impact on visual quality. The range is 0 (no preprocessing) to 100 (maximum preprocessing).",
          "type": [
              "integer"
          ],
          "default": 60,
          "minimum": 0,
          "maximum": 100
      },
      "ui": {
          "component": "slider",
          "links": [
              [
                  "Guide",
                  "https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#near-lossless"
              ]
          ],
          "display": "notEquals(state('option', 'encoding'), 'lossy')"
      }
  },
  {
      "id": "metadata",
      "schema": {
          "title": "Metadata",
          "description": "Determines which metadata that should be copied over to the webp. Setting it to \"all\" preserves all metadata, setting it to \"none\" strips all metadata. *cwebp* can take a comma-separated list of which kinds of metadata that should be copied (ie \"exif,icc\"). *gd* will always remove all metadata and *ffmpeg* will always keep all metadata. The rest can either strip all or keep all (they will keep all, unless the option is set to *none*)",
          "type": [
              "string"
          ],
          "default": "none"
      },
      "ui": {
          "component": "multi-select",
          "options": [
              "all",
              "none",
              "exif",
              "icc",
              "xmp"
          ]
      },
      "sensitive": false,
      "options": null
  },
  {
      "id": "method",
      "schema": {
          "title": "Reduction effort (0-6)",
          "description": "Controls the trade off between encoding speed and the compressed file size and quality. Possible values range from 0 to 6. 0 is fastest. 6 results in best quality and compression. PS: The option corresponds to the \"method\" option in libwebp",
          "type": [
              "integer"
          ],
          "default": 6,
          "minimum": 0,
          "maximum": 6
      },
      "ui": {
          "component": "slider",
          "advanced": true
      }
  },
  {
      "id": "sharp-yuv",
      "schema": {
          "title": "Sharp YUV",
          "description": "Better RGB->YUV color conversion (sharper and more accurate) at the expense of a little extra conversion time.",
          "type": [
              "boolean"
          ],
          "default": true
      },
      "ui": {
          "component": "checkbox",
          "advanced": true,
          "links": [
              [
                  "Ctrl.blog",
                  "https:\/\/www.ctrl.blog\/entry\/webp-sharp-yuv.html"
              ]
          ]
      }
  },
  {
      "id": "auto-filter",
      "schema": {
          "title": "Auto-filter",
          "description": "Turns auto-filter on. This algorithm will spend additional time optimizing the filtering strength to reach a well-balanced quality. Unfortunately, it is extremely expensive in terms of computation. It takes about 5-10 times longer to do a conversion. A 1MB picture which perhaps typically takes about 2 seconds to convert, will takes about 15 seconds to convert with auto-filter. ",
          "type": [
              "boolean"
          ],
          "default": false
      },
      "ui": {
          "component": "checkbox",
          "advanced": true
      }
  },
  {
      "id": "low-memory",
      "schema": {
          "title": "Low memory",
          "description": "Reduce memory usage of lossy encoding at the cost of ~30% longer encoding time and marginally larger output size. Only effective when the *method* option is 3 or more. Read more in [the docs](https:\/\/developers.google.com\/speed\/webp\/docs\/cwebp)",
          "type": [
              "boolean"
          ],
          "default": false
      },
      "ui": {
          "component": "checkbox",
          "advanced": true,
          "display": "and(notEquals(state('option','encoding'),'lossless'),gt(state('option','method'),2))"
      }
  },
  {
      "id": "preset",
      "schema": {
          "title": "Preset",
          "description": "Using a preset will set many of the other options to suit a particular type of source material. It even overrides them. It does however not override the quality option. \"none\" means that no preset will be set",
          "enum": [
              "none",
              "default",
              "photo",
              "picture",
              "drawing",
              "icon",
              "text"
          ],
          "type": [
              "string"
          ],
          "default": "none"
      },
      "ui": null,
      "sensitive": false,
      "options": [
          "none",
          "default",
          "photo",
          "picture",
          "drawing",
          "icon",
          "text"
      ]
  },
  {
      "id": "size-in-percentage",
      "schema": {
          "allow-null": true,
          "type": [
              "integer",
              "null"
          ],
          "default": null,
          "minimum": 0,
          "maximum": 100
      },
      "ui": null
  },
  {
      "id": "skip",
      "schema": {
          "type": [
              "boolean"
          ],
          "default": false
      },
      "ui": null
  },
  {
      "id": "log-call-arguments",
      "schema": {
          "type": [
              "boolean"
          ],
          "default": false
      },
      "ui": null
  },
  {
      "id": "use-nice",
      "schema": {
          "type": [
              "boolean"
          ],
          "default": false
      },
      "ui": null
  },
  {
      "id": "jpeg",
      "schema": {
          "type": [
              "array"
          ],
          "default": []
      },
      "ui": null,
      "sensitive": false
  },
  {
      "id": "png",
      "schema": {
          "type": [
              "array"
          ],
          "default": []
      },
      "ui": null,
      "sensitive": false
  },
  {
         "id": "try-cwebp",
         "schema": {
             "title": "Try plain cwebp command",
             "description": "If set, the converter will try executing \"cwebp -version\". In case it succeeds, and the version is higher than those working cwebps found using other methods, the conversion will be done by executing this cwebp.",
             "type": [
                 "boolean"
             ],
             "default": true
         },
         "ui": {
             "component": "checkbox",
             "advanced": true
         }
     },
     {
         "id": "try-discovering-cwebp",
         "schema": {
             "title": "Try discovering cwebp binary",
             "description": "If set, the converter will try to discover installed cwebp binaries using a \"which -a cwebp\" command, or in case that fails, a \"whereis -b cwebp\" command. These commands will find cwebp binaries residing in PATH",
             "type": [
                 "boolean"
             ],
             "default": true
         },
         "ui": {
             "component": "checkbox",
             "advanced": true
         }
     },
     {
         "id": "try-common-system-paths",
         "schema": {
             "title": "Try locating cwebp in common system paths",
             "description": "If set, the converter will look for a cwebp binaries residing in common system locations such as \"\/usr\/bin\/cwebp\". If such exist, it is assumed that they are valid cwebp binaries. A version check will be run on the binaries found (they are executed with the \"-version\" flag. The cwebp with the highest version found using this method and the other enabled methods will be used for the actual conversion.Note: All methods for discovering cwebp binaries are per default enabled. You can save a few microseconds by disabling some, but it is probably not worth it, as your setup will then become less resilient to system changes.",
             "type": [
                 "boolean"
             ],
             "default": true
         },
         "ui": {
             "component": "checkbox",
             "advanced": true
         }
     },
     {
         "id": "try-supplied-binary-for-os",
         "schema": {
             "title": "Try locating cwebp in common system paths",
             "description": "If set, the converter will try use a precompiled cwebp binary that comes with webp-convert. But only if it has a higher version that those found by other methods. As the library knows the versions of its cwebps, no additional time is spent executing them with the \"-version\" parameter. The binaries are hash-checked before executed. The library btw. comes with several versions of precompiled cwebps because they have different dependencies - some works on some systems and others on others.",
             "type": [
                 "boolean"
             ],
             "default": true
         },
         "ui": {
             "component": "checkbox",
             "advanced": true
         }
     },
     {
         "id": "skip-these-precompiled-binaries",
         "schema": {
             "title": "Skip these precompiled binaries",
             "description": "",
             "type": [
                 "string"
             ],
             "default": ""
         },
         "ui": {
             "component": "multi-select",
             "advanced": true,
             "options": [
                 "cwebp-120-linux-x86-64",
                 "cwebp-110-linux-x86-64",
                 "cwebp-103-linux-x86-64-static",
                 "cwebp-061-linux-x86-64"
             ]
         },
         "sensitive": false
     }
]


  /*
  [
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
