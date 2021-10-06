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
          /*converters: [
            {id: 'cwebp', name: 'cwebp'}, // TODO: Accept option definitions!
            {id: 'vips', name: 'vips'},
            {id: 'ewww', name: 'ewww'},
            {id: 'gd', name: 'gd'},
          ],*/
          //options: convertOptions,
          //optionsSchema: optionsSchema,
          //optionsUI: optionsUI,
          options: converterOptions,

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
