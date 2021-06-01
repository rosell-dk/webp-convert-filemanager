export default [
    {
        "id": "encoding",
        "schema": {
            "title": "Encoding",
            "description": "Set encoding for the webp. If you choose \"auto\", webp-convert will convert to both lossy and lossless and pick the smallest result",
            "default": "auto",
            "enum": [
                "auto",
                "lossy",
                "lossless"
            ],
            "type": [
                "string"
            ]
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
            "default": 85,
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
            ]
        },
        "ui": {
            "component": "slider",
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
        "schema": {
            "title": "Auto-limit",
            "description": "Enable this option to prevent an unnecessarily high quality setting for low quality jpegs. You really should enable this.",
            "default": true,
            "type": [
                "boolean"
            ]
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
        "schema": {
            "title": "Alpha quality",
            "description": "Quality of alpha channel. Often, there is no need for high quality transparency layer and in some cases you can tweak this all the way down to 10 and save a lot in file size. The option only has effect with lossy encoding, and of course only on images with transparency.",
            "default": 85,
            "type": [
                "integer"
            ],
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
        }
    },
    {
        "id": "near-lossless",
        "schema": {
            "title": "\"Near lossless\" quality",
            "description": "This option allows you to get impressively better compression for lossless encoding, with minimal impact on visual quality. The range is 0 (no preprocessing) to 100 (maximum preprocessing).",
            "default": 60,
            "type": [
                "integer"
            ],
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
        }
    },
    {
        "id": "metadata",
        "schema": {
            "title": "Metadata",
            "description": "Determines which metadata that should be copied over to the webp. Setting it to \"all\" preserves all metadata, setting it to \"none\" strips all metadata. *cwebp* can take a comma-separated list of which kinds of metadata that should be copied (ie \"exif,icc\"). *gd* will always remove all metadata and *ffmpeg* will always keep all metadata. The rest can either strip all or keep all (they will keep all, unless the option is set to *none*)",
            "default": "none",
            "type": [
                "string"
            ]
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
            "default": 6,
            "type": [
                "integer"
            ],
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
            "default": true,
            "type": [
                "boolean"
            ]
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
            "default": false,
            "type": [
                "boolean"
            ]
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
            "default": false,
            "type": [
                "boolean"
            ]
        },
        "ui": {
            "component": "checkbox",
            "advanced": true,
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
                        "function": "gt",
                        "args": [
                            {
                                "function": "state",
                                "args": [
                                    "option",
                                    "method"
                                ]
                            },
                            2
                        ]
                    }
                ]
            }
        }
    },
    {
        "id": "preset",
        "schema": {
            "title": "Preset",
            "description": "Using a preset will set many of the other options to suit a particular type of source material. It even overrides them. It does however not override the quality option. \"none\" means that no preset will be set",
            "default": "none",
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
            ]
        },
        "ui": {
            "component": "select",
            "advanced": true,
            "options": [
                "none",
                "default",
                "photo",
                "picture",
                "drawing",
                "icon",
                "text"
            ],
            "optionLabels": {
                "none": "None",
                "default": "Default",
                "photo": "Photo",
                "picture": "Picture",
                "drawing": "Drawing",
                "icon": "Icon",
                "text": "Text"
            }
        },
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
            "default": null,
            "allow-null": true,
            "type": [
                "integer",
                "null"
            ],
            "minimum": 0,
            "maximum": 100
        },
        "ui": null
    },
    {
        "id": "skip",
        "schema": {
            "default": false,
            "type": [
                "boolean"
            ]
        },
        "ui": null
    },
    {
        "id": "log-call-arguments",
        "schema": {
            "default": false,
            "type": [
                "boolean"
            ]
        },
        "ui": null
    },
    {
        "id": "use-nice",
        "schema": {
            "default": false,
            "type": [
                "boolean"
            ]
        },
        "ui": null
    },
    {
        "id": "jpeg",
        "schema": {
            "default": [],
            "type": [
                "array"
            ]
        },
        "ui": null,
        "sensitive": false
    },
    {
        "id": "png",
        "schema": {
            "default": [],
            "type": [
                "array"
            ]
        },
        "ui": null,
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
