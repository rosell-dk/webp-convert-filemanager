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
    console.log(options);
    switch (command) {
      case 'get-folder':
        switch (options['folder']) {
          case '':
            var response = {
              children: [
                {name: 'root', isDir: true}
              ]
            }
            break;
          case 'root':
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
          case 'root/empty-folder':
            var response = {
              children: []
            }
            break;
          case 'root/test-folder':
            var response = {
              children: [
                {name:'banana', isDir:false},
                {name:'subfolder', isDir:true},
                {name:'apple', isDir:false}
              ]
            }
            break;
          case 'root/test-folder/subfolder':
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
          //options: converterOptions,

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
          if (options.path == 'root/file2') {
            var response = {
              original: {
                filename: 'file.png',
                size: 100,
                url: 'http://localhost:3000/src/assets/200x100.jpg',
              },
              converted: {
                filename: 'file.png.webp',
                size: 70,
                url: 'http://localhost:3000/src/assets/200x100.jpg'
              },
              log: 'blah blah blah'
            };
          } else if (options.path == 'root/file') {
            var response = {
              original: {
                filename: 'file.png',
                size: 100,
                url: 'http://localhost:3000/src/assets/dummy2.jpg',
              },
              log: 'blah blah blah'
            };
          } else {
            var response = {
              original: {
                filename: 'file.png',
                size: 100,
                url: 'http://localhost:3000/src/assets/dummy.jpg',
              },
              converted: {
                filename: 'file.png.webp',
                size: 70,
                url: 'http://localhost:3000/src/assets/dummy.jpg'
              },
              log: 'blah blah blah'
            };
          }


          //var response = {"success":false,"data":"Path does not exist or it is outside restricted basedir"};
          break;
        case 'convert':
          var response = {
            success: false,
            msg: 'Image type could not be detected',
          }
          /*var response = {
            success: true,
            msg: '',
          }*/
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
