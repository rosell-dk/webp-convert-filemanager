import { createApp } from 'vue'
import WCFM from './WCFM.vue'
import './index.css'

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
