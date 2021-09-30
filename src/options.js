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
      ],
      "unsupportedBy": [
          "ffmpeg",
          "ewww",
          "gd",
          "stack"
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
            "display": "option.encoding != 'lossless'"
        },
        "unsupportedBy": [
            "stack"
        ]
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
            "display": "option.encoding != 'lossless'"
        },
        "unsupportedBy": []
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
            "display": "(option.encoding != 'lossless') && (imageType!='jpeg')"
        },
        "unsupportedBy": [
            "ffmpeg",
            "ewww",
            "gd",
            "stack"
        ]
    },
    {
        "id": "near-lossless",
        "schema": {
            "title": "\"Near lossless\" quality",
            "description": "This option allows you to get impressively better compression for lossless encoding, with minimal impact on visual quality. The range is 0 (maximum preprocessing) to 100 (no preprocessing).",
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
            "display": "option.encoding != 'lossy'"
        },
        "unsupportedBy": [
            "imagick",
            "gmagick",
            "imagemagick",
            "graphicsmagick",
            "ffmpeg",
            "ewww",
            "gd",
            "stack"
        ]
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
        "unsupportedBy": [
            "ffmpeg",
            "gd",
            "stack"
        ]
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
        },
        "unsupportedBy": [
            "ewww",
            "gd",
            "stack"
        ]
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
        },
        "unsupportedBy": [
            "ffmpeg",
            "ewww",
            "gd",
            "stack"
        ]
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
        },
        "unsupportedBy": [
            "vips",
            "ffmpeg",
            "ewww",
            "gd",
            "stack"
        ]
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
            "display": "(option.encoding != 'lossless') && (option.method>2)"
        },
        "unsupportedBy": [
            "ffmpeg",
            "ewww",
            "gd",
            "stack"
        ]
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
        ],
        "unsupportedBy": [
            "ffmpeg",
            "ewww",
            "gd",
            "stack"
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
        "ui": null,
        "unsupportedBy": [
            "vips",
            "imagick",
            "gmagick",
            "imagemagick",
            "graphicsmagick",
            "ffmpeg",
            "ewww",
            "gd",
            "stack"
        ]
    },
    {
        "id": "skip",
        "schema": {
            "type": [
                "boolean"
            ],
            "default": false
        },
        "ui": null,
        "unsupportedBy": [
            "stack"
        ]
    },
    {
        "id": "log-call-arguments",
        "schema": {
            "type": [
                "boolean"
            ],
            "default": false
        },
        "ui": null,
        "unsupportedBy": []
    },
    {
        "id": "use-nice",
        "schema": {
            "type": [
                "boolean"
            ],
            "default": false
        },
        "ui": null,
        "unsupportedBy": [
            "vips",
            "imagick",
            "gmagick",
            "ffmpeg",
            "ewww",
            "gd",
            "stack"
        ]
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
        "sensitive": false,
        "unsupportedBy": []
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
        "sensitive": false,
        "unsupportedBy": []
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
      "display2": {
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
      "display2": {
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
