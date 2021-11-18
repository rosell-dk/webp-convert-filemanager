import { createApp } from 'vue'
import WCFM from './WCFM.vue'
import './index.css'
import './tables.css'
import 'v-tooltip/dist/v-tooltip.css'
import optionsSchema from './options-schema.js'
import optionsUI from './options-ui.js'
import converterOptions from './options.js'
import VTooltip from 'v-tooltip'
import VueZoomer from 'vue-zoomer'

//import './play.js'
//import './js-expr-parser.js'


//console.log('options!', convertOptions);

// npm i -S v-tooltip@next    (tries to install 3.0.0-alpha.21, but cannot resolve dependency: vue@"^2.6.10")
// npm i -S v-tooltip@vue3    (installs 4.0.0-alpha.1)
// npm uninstall v-tooltip

// Cannot get v-tooltip to work. But it is also in alpha for Vue 3...
// https://github.com/Akryum/v-tooltip/issues/545
// https://github.com/Akryum/v-tooltip/discussions/603
//import Vue from 'vue'
//import VTooltip from 'v-tooltip'
//Vue.use(VTooltip)

// npm install vue-slider-component@next --save
// npm uninstall vue-slider-component
// npm install -S @vueform/slider         ~32kb increase

//VTooltip.options.defaultHtml = true;
const wcfm = createApp(WCFM);
wcfm.use(VueZoomer);
wcfm.use(VTooltip, {
  defaultHtml: false,
});



if (!window["wcfmoptions"]) {
  window["wcfmoptions"] = {}
  window["wcfmoptions"]['poster'] = function(command, options, successCallback, errorCallback) {
    //console.log(options);
    switch (command) {
      case 'get-folder':
        switch (options['path']) {
          case '':
            var response = {
              children: [
                {name: '/', isDir: true, nickname: 'root'}
              ]
            }
            break;
          case '/':
            var response = {
              children: [
                {name:'empty-folder', isDir:true, isEmpty:true},
                {name:'file', isDir:false, isConverted: true},
                {name:'aaa', isDir:false, isConverted: true},
                {name:'test-folder', isDir:true},
                {name:'file2', isDir:false, isConverted: false}
              ]
            }
            break;
          case '/empty-folder':
            var response = {
              children: []
            }
            break;
          case '/test-folder':
            var response = {
              children: [
                {name:'banana', isDir:false},
                {name:'subfolder', isDir:true},
                {name:'apple', isDir:false}
              ]
            }
            break;
          case '/test-folder/subfolder':
            var response = {
              children: [
                {name:'file2', isDir:false},
                {name:'file1', isDir:false},
              ]
            }
            break;
          default:
            errorCallback();
            return
        }
        /*
        var response = {
          name: 'root',
          isDir: true,
          isOpen: true,
          children: [
            {name:'empty-folder', isDir:true, children: []},
            {name:'file', isDir:false, isConverted: true},
            {name:'aaa', isDir:false, isConverted: true},
            {name:'test-folder', isDir:true, children: [
                {name:'banana', isDir:false},
                {name:'subfolder', isDir:true, children: [
                  {name:'file2', isDir:false},
                  {name:'file1', isDir:false},
                ]},
                {name:'apple', isDir:false}
              ]
            },
            {name:'file2', isDir:false, isConverted: false}
          ]
        };*/
        break;
      case 'conversion-settings':
        var response = {
          options: converterOptions,
          defaults: {
            quality: 17,
            'ewww-api-key': 'apilapi',
            'wpc-api-key': 'bogulogu',
            "encoding": "lossless",
            //'png-quality': 99,
            'png': {
              //quality: 99
              "encoding": "lossless",
              //"near-lossless": 60,
              "quality": 90
            },
            converter: 'gd',
          },

          /*converters: [
            {id: 'cwebp', name: 'cwebp'}, // TODO: Accept option definitions!
            {id: 'vips', name: 'vips'},
            {id: 'ewww', name: 'ewww'},
            {id: 'gd', name: 'gd'},
          ],*/
          //options: convertOptions,
          //optionsSchema: optionsSchema,
          //optionsUI: optionsUI,

          /*supportedStandardOptions: {
            encoding: ['cwebp', 'vips', 'imagick', 'gmagick', 'imagemagick', 'graphicsmagick', 'ffmpeg', 'wpc'],
            method: ['cwebp', 'imagick', 'gmagick', 'imagemagick', 'graphicsmagick', 'ffmpeg', 'wpc'],
            nearLossless: ['cwebp', 'vips', 'wpc']
          },
          overrideDefaults: {
            converter: 'cwebp',
            //encoding: 'lossless',
            //method: 3,
          },*/
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
          //console.log('options', options);
          if (options.path == '/file2') {
            var response = {
              original: {
                size: 100,
                url: 'http://localhost:3000/src/assets/200x100.jpg',
                mime2: 'image/jpeg'
              },
              converted: {
                size: 70,
                url: 'http://localhost:3000/src/assets/200x100.jpg',
                mime: 'image/webp'
              },
              log: 'blah blah blah\n\rand *more* blah'
            };
          } else if (options.path == '/file') {
            var response = {
              original: {
                size: 100,
                url: 'http://localhost:3000/src/assets/dummy2.jpg',
                mime: 'image/jpeg'
              },
              log: 'blah blah *blah*'

            };
          } else {
            var response = {
              original: {
                size: 100,
                url: 'http://localhost:3000/src/assets/dummy.jpg',
                mime: 'image/jpeg'
              },
              converted: {
                size: 70,
                url: 'http://localhost:3000/src/assets/dummy.jpg',
                mime: 'image/webp'
              },
              log: 'blah blah *blah*'
            };
          }


          //var response = {"success":false,"data":"Path does not exist or it is outside restricted basedir"};
          break;
        case 'convert':
          if (options.path == '/file2') {
            var response = {
              success: false,
              data: 'We pretend file2 errors converting...',
              log: 'Oh no!',
            }
          } else {
            var response = {
              success: true,
              converted: {
                size: 26050,
                url: "http://we0/wordpress/wp-content/uploads/2021/10/Screenshot_2021-10-04_13-43-11.png.webp",
                mime: 'image/webp'
              },
              log: 'All is *groovy*\nnext line',
            }
          }
          /*var response = {
            success: true,
            msg: '',
          }*/
          break;

        case 'delete-converted':
          if (options.path == '/file2') {
            var response = {
              success: false,
              data: 'We pretend file2 errors deleting...',
            }
          } else {
            var response = {
              success: true,
            }
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
