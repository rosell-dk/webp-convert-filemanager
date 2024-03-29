export default {
    "general": [
        {
            "id": "converter",
            "schema": {
                "title": "Converter",
                "description": "Conversion method. Cwebp and vips are best. the *magick are nearly as good, but only recent versions supports near-lossless. gd is poor, as it does not support any webp options. For full discussion, check the guide",
                "enum": [
                    "cwebp",
                    "vips",
                    "imagick",
                    "gmagick",
                    "imagemagick",
                    "graphicsmagick",
                    "wpc",
                    "ffmpeg",
                    "ewww",
                    "gd",
                    "stack"
                ],
                "type": [
                    "string"
                ],
                "default": "stack"
            },
            "ui": {
                "component": "select",
                "links": [
                    [
                        "Guide",
                        "https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v1.3\/converting\/converters.md"
                    ]
                ]
            },
            "sensitive": false,
            "options": [
                "cwebp",
                "vips",
                "imagick",
                "gmagick",
                "imagemagick",
                "graphicsmagick",
                "wpc",
                "ffmpeg",
                "ewww",
                "gd",
                "stack"
            ]
        },
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
                "ewww",
                "gd",
                "stack"
            ]
        },
        {
            "id": "quality",
            "schema": {
                "title": "Quality (Lossy)",
                "description": "Quality for lossy encoding. In case you enable \"auto-limit\", you can consider this property a maximum quality.",
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
                "default": 75
            },
            "ui": {
                "component": "slider",
                "display": "option('encoding') != 'lossless'"
            },
            "unsupportedBy": [
                "stack"
            ]
        },
        {
            "id": "auto-limit",
            "schema": {
                "title": "Auto-limit",
                "description": "Enable this option to prevent an unnecessarily high quality setting for low quality jpegs. It works by adjusting quality setting down to the quality of the jpeg. Converting ie a jpeg with quality:50 to ie quality:80 does not get you better quality than converting it to quality:80, but it does get you a much bigger file - so you really should enable this option.\n\nThe option is ignored for PNG and never adjusts quality up. \n\nThe feature requires Imagick, ImageMagick or Gmagick in order to detect the quality of the jpeg. \n\nThe option is relative new. Before this option, you could do the same by setting quality to \"auto\" and specifying a \"max-quality\" and a \"default-quality\". These are deprecated now.",
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
                "display": "option('encoding') != 'lossless'"
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
                "display": "(option('encoding') != 'lossless') && (imageType!='jpeg')"
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
                "description": "This option allows you to get impressively better compression for lossless encoding, with minimal impact on visual quality. The range is 0 (maximum preprocessing) to 100 (no preprocessing). Read the guide for more info.",
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
                "display": "option('encoding') != 'lossy'"
            },
            "unsupportedBy": [
                "gmagick",
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
                "display": "(option('encoding') != 'lossless') && (option('method')>2)"
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
            "ui": {
                "component": "select",
                "advanced": true
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
            ],
            "unsupportedBy": [
                "ewww",
                "gd",
                "stack"
            ]
        }
    ],
    "unique": {
        "cwebp": [
            {
                "id": "cwebp-use-nice",
                "schema": {
                    "title": "Use nice",
                    "description": "If *use-nice* is set, it will be examined if the *nice* command is available. If it is, the binary is executed using *nice*. This assigns low priority to the process and will save system resources - but result in slower conversion.",
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
                "id": "cwebp-try-cwebp",
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
                "id": "cwebp-try-discovering-cwebp",
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
                "id": "cwebp-try-common-system-paths",
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
                "id": "cwebp-try-supplied-binary-for-os",
                "schema": {
                    "title": "Try precompiled cwebp binaries",
                    "description": "If set, the converter will try use a precompiled cwebp binary that comes with webp-convert. But only if it has a higher version that those found by other methods. As the library knows the versions of its bundled binaries, no additional time is spent executing them with the \"-version\" parameter. The binaries are hash-checked before executed. The library btw. comes with several versions of precompiled cwebps because they have different dependencies - some works on some systems and others on others.",
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
                "id": "cwebp-skip-these-precompiled-binaries",
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
                    ],
                    "display": "option('cwebp-try-supplied-binary-for-os') == true"
                },
                "sensitive": false
            },
            {
                "id": "cwebp-rel-path-to-precompiled-binaries",
                "schema": {
                    "title": "Rel path to precompiled binaries",
                    "description": "",
                    "type": [
                        "string"
                    ],
                    "default": ".\/Binaries"
                },
                "ui": {
                    "component": "",
                    "advanced": true,
                    "display": "option('cwebp-try-supplied-binary-for-os') == true"
                },
                "sensitive": true
            },
            {
                "id": "cwebp-command-line-options",
                "schema": {
                    "title": "Command line options",
                    "description": "",
                    "type": [
                        "string"
                    ],
                    "default": ""
                },
                "ui": {
                    "component": "input",
                    "advanced": true
                },
                "sensitive": false
            }
        ],
        "vips": [],
        "imagick": [],
        "gmagick": [],
        "imagemagick": [
            {
                "id": "imagemagick-use-nice",
                "schema": {
                    "title": "Use nice",
                    "description": "If *use-nice* is set, it will be examined if the *nice* command is available. If it is, the binary is executed using *nice*. This assigns low priority to the process and will save system resources - but result in slower conversion.",
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
                "id": "imagemagick-try-common-system-paths",
                "schema": {
                    "title": "Try locating ImageMagick in common system paths",
                    "description": "If set, the converter will look for a ImageMagick binaries residing in common system locations such as \"\/usr\/bin\/convert\". If such exist, it is assumed that they are valid ImageMagick binaries. ",
                    "type": [
                        "boolean"
                    ],
                    "default": true
                },
                "ui": {
                    "component": "checkbox",
                    "advanced": true
                }
            }
        ],
        "graphicsmagick": [
            {
                "id": "graphicsmagick-use-nice",
                "schema": {
                    "title": "Use nice",
                    "description": "If *use-nice* is set, it will be examined if the *nice* command is available. If it is, the binary is executed using *nice*. This assigns low priority to the process and will save system resources - but result in slower conversion.",
                    "type": [
                        "boolean"
                    ],
                    "default": true
                },
                "ui": {
                    "component": "checkbox",
                    "advanced": true
                }
            }
        ],
        "wpc": [
            {
                "id": "wpc-api-key",
                "schema": {
                    "title": "API key",
                    "description": "",
                    "type": [
                        "string"
                    ],
                    "default": ""
                },
                "ui": {
                    "component": "password",
                    "advanced": false,
                    "display": "option('wpc-api-version') != 0"
                },
                "sensitive": true
            },
            {
                "id": "wpc-secret",
                "schema": {
                    "title": "Secret",
                    "description": "",
                    "type": [
                        "string"
                    ],
                    "default": ""
                },
                "ui": {
                    "component": "password",
                    "advanced": false,
                    "display": "option('wpc-api-version') == 0"
                },
                "sensitive": true
            },
            {
                "id": "wpc-api-url",
                "schema": {
                    "title": "API url",
                    "description": "URL to connect to",
                    "type": [
                        "string"
                    ],
                    "default": ""
                },
                "ui": {
                    "component": "password",
                    "advanced": false
                },
                "sensitive": true
            },
            {
                "id": "wpc-api-version",
                "schema": {
                    "title": "API version",
                    "description": "",
                    "type": [
                        "integer"
                    ],
                    "default": 2,
                    "minimum": 0,
                    "maximum": 2
                },
                "ui": {
                    "component": "select",
                    "advanced": false,
                    "options": [
                        "0",
                        "1",
                        "2"
                    ]
                }
            },
            {
                "id": "wpc-crypt-api-key-in-transfer",
                "schema": {
                    "title": "Crypt API key in transfer",
                    "description": "",
                    "type": [
                        "boolean"
                    ],
                    "default": false
                },
                "ui": {
                    "component": "checkbox",
                    "advanced": true,
                    "display": "option('wpc-api-version') >= 1"
                }
            }
        ],
        "ffmpeg": [
            {
                "id": "ffmpeg-use-nice",
                "schema": {
                    "title": "Use nice",
                    "description": "If *use-nice* is set, it will be examined if the *nice* command is available. If it is, the binary is executed using *nice*. This assigns low priority to the process and will save system resources - but result in slower conversion.",
                    "type": [
                        "boolean"
                    ],
                    "default": true
                },
                "ui": {
                    "component": "checkbox",
                    "advanced": true
                }
            }
        ],
        "ewww": [
            {
                "id": "ewww-api-key",
                "schema": {
                    "title": "Ewww API key",
                    "description": "ewww API key. If you choose \"auto\", webp-convert will convert to both lossy and lossless and pick the smallest result",
                    "type": [
                        "string"
                    ],
                    "default": ""
                },
                "ui": {
                    "component": "password"
                },
                "sensitive": true
            },
            {
                "id": "ewww-check-key-status-before-converting",
                "schema": {
                    "title": "Check key status before converting",
                    "description": "If enabled, the api key will be validated (relative inexpensive) before trying to convert. For automatic conversions, you should enable it. Otherwise you run the risk that the same files will be uploaded to ewww cloud service over and over again, in case the key has expired. For manually triggered conversions, you can safely disable the option.",
                    "type": [
                        "boolean"
                    ],
                    "default": true
                },
                "ui": {
                    "component": "checkbox"
                }
            }
        ],
        "gd": [],
        "stack": [
            {
                "id": "stack-converters",
                "schema": {
                    "title": "Converters",
                    "description": "Converters to try, ordered by priority.",
                    "sensitive": true,
                    "type": [
                        "array"
                    ],
                    "default": [
                        "cwebp",
                        "vips",
                        "imagick",
                        "gmagick",
                        "imagemagick",
                        "graphicsmagick",
                        "wpc",
                        "ffmpeg",
                        "ewww",
                        "gd"
                    ]
                },
                "ui": {
                    "component": "multi-select",
                    "options": [
                        "cwebp",
                        "vips",
                        "imagick",
                        "gmagick",
                        "imagemagick",
                        "graphicsmagick",
                        "wpc",
                        "ffmpeg",
                        "ewww",
                        "gd"
                    ],
                    "advanced": true
                },
                "sensitive": true
            },
            {
                "id": "stack-shuffle",
                "schema": {
                    "title": "Shuffle",
                    "description": "Shuffles the converter order on each conversion. Can for example be used to spread out requests on multiple cloud converters",
                    "type": [
                        "boolean"
                    ],
                    "default": false
                },
                "ui": {
                    "component": "checkbox",
                    "advanced": true
                }
            }
        ]
    }
}
