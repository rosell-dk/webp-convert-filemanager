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
