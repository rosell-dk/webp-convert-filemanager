{
  "title": 'Options',
  "type": ['object'],
  "properties": {
    "preset": {
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
      "type": ["string"],
      "default": "none"
    },
    "quality": {
      "title": "Quality",
      "description": "aeouht aeu",
      "type": ["integer"],
      "default": 50,
      "maximum": 100,
      "minimum": 0
    },
    "alpha-quality": {
      "title": "Alpha quality",
      "description": "aeouht aeu",
      "type": ["integer"],
      "default": 75,
      "maximum": 100,
      "minimum": 0
    },
    "auto-limit": {
      "title": "Auto-limit",
      "description": "Enable this option to prevent an unnecessarily high quality setting for low quality jpegs. You really should enable this.",
      "type": ["boolean"],
      "default": true
    },
    "command-line-options": {
      "title": "Command line options",
      "description": "",
      "type": ["string"],
      "default": ""
    },
    "skip-these-precompiled-binaries": {
      "title": "Skip these precompiled binaries",
      "description": "",
      "enum": [
        "cwebp-120-linux-x86-64",
        "cwebp-110-linux-x86-64",
        "cwebp-103-linux-x86-64-static",
        "cwebp-061-linux-x86-64"
      ],
      "type": ["string"],
      "default": ""
    }

  }

UI


  // TODO: Loading animation
  //console.log('r:', response);

  // see https://github.com/rosell-dk/vue3-webpconvert-filemanager/issues/3

  let bui = {
    'component': 'group',
    'title': 'Options',
    'sub-components': [
      {
        'component': 'multi-select',
        'data-property': 'skip-these-precompiled-binaries',
      },
      {
        'component': 'select',
        'data-property': 'preset',
      },
      {
        'component': 'input',
        'data-property': 'command-line-options',
      },
      {
        'component': 'slider',
        'data-property': 'quality',
      },
      {
        'component': 'slider',
        'data-property': 'alpha-quality',
        'links': [
          ['Ctrl.blog', 'https://www.ctrl.blog/entry/webp-sharp-yuv.html'],
        ],
        'display': "option.quality > 80"
      },
      {
        "component": "checkbox",
        'data-property': 'auto-limit',
        "advanced": true,
        "links": [
            [
                "Guide",
                "https:\/\/github.com\/rosell-dk\/webp-convert\/blob\/master\/docs\/v2.0\/converting\/introduction-for-converting.md#preventing-unnecessarily-high-quality-setting-for-low-quality-jpegs"
            ]
        ],
      },
    ]
  }


  //me.data = {'quality': 78};
