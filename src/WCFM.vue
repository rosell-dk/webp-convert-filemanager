<template>
  <div class="wcfm" style="overflow:hidden">
    <SVGs />
    <!--
    <div class="pane" style="width:48%">
      <FileTree :item="item" />
    </div>-->
    <!--<AutoUI :ui="ui" :schema="schema" :modelValue="data"/>-->
    <!--<ConvertOptions />-->

    <splitpanes class="default-theme" style="position:absolute; top:0; left: 0">
        <pane size="30">
          <div class="pane-content">
            <div>
              <Files :item="item" :statusText="treeStatusText" @select="onFileSelect"/>
            </div>
          </div>
        </pane>
        <pane size="70" style="overflow-y: auto;">
          <div class="pane-content" v-if="file">
            <FileProperties :file="file" v-if="!(file.isDir)"/>
            <FolderProperties :file="file" v-if="(file.isDir)"/>
          </div>
          <Welcome v-if="!file" />
        </pane>
      </splitpanes>

<!--
      <button class="convertOptionsButton" @click="showConvertOptions = true">Conversion options</button>
    -->
<!--
      <Modal
          v-show="showConvertOptions"
          title="Conversion options"
          closeButtonText="Ok"
          width="600px"
          height="95%" maxheight="650px"
          alignment="right"
          @close="onConvertCloseClick"
        >
        <ConvertOptions2 ref="convertOptions"/>
      </Modal>-->

    <!--
    <splitpanes class="default-theme" style="position:absolute; top:0; left: 0">
      <pane size="70" min-size="20" style="overflow-y: hidden; padding:0">
        <splitpanes>
          <pane size="30">
            <div class="pane-content">
              <div>
                <FileTree :item="item" />
              </div>
            </div>
          </pane>
          <pane size="70" style="overflow-y: auto;">
            <div class="pane-content">
              <InfoPane :info="selectedInfo"/>
            </div>
          </pane>
        </splitpanes>
      </pane>
      <pane size="30">
        <div class="pane-content">
          <FileProperties />
        </div>
      </pane>
    </splitpanes>
  -->
    <!--
    <Modal width="90%" height="90%">
      <template v-slot:body>
        <splitpanes class="default-theme" >
          <pane size="40" min-size="20">
            <div class="pane-content">
              <div>
                <ConvertOptions2 ref="convertOptions"/>
              </div>
            </div>
          </pane>
          <pane size="60" style="overflow-y: auto;">
            <div class="pane-content">
              <InfoPane :info="selectedInfo"/>
              <FileProperties />
            </div>
          </pane>
        </splitpanes>
      </template>
    </Modal>-->

    <!--
    <InfoPane :info="selectedInfo"/>
    <multipane class="mainpanel" layout="vertical">
      <div class="pane" style="width:48%">
        <FileTree :item="item" />
      </div>
      <multipane-resizer></multipane-resizer>
      <div class="pane" :style="{ flexGrow: 1 }">
        <ConvertOptions2 />
      </div>
    </multipane>-->
    <!--{{ data }}-->
    <!--<AutoUI :ui="ui" :schema="schema" :modelValue="data"/>-->

  </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

import Poster from './classes/Poster.js'

import SVGs from './components/SVGs.vue'
import ConvertOptions from './components/ConvertOptions.vue'
//import FileTree from './components/FileTree.vue'
import Files from './components/Files.vue'
//import InfoPane from './components/InfoPane.vue'

//import Multipane from './components/standard/multipane.vue';
import Modal from './components/standard/Modal.vue';
import FileProperties from './components/FileProperties.vue';
import FolderProperties from './components/FolderProperties.vue';
//import MultipaneResizer from './components/standard/multipane-resizer.vue';
//import ConvertOptions2 from './components/ConvertOptions2.vue';
import Welcome from './components/Welcome.vue';

//import Pane from './components/pane.vue';
//import Splitpanes from './components/splitpanes.vue';


export default {
  name: 'WCFM',
  components: {
    SVGs,
    //ConvertOptions,
    //ConvertOptions2,
    FileProperties,
    FolderProperties,
    Modal,
    Files,
    //InfoPane,
    Splitpanes, Pane,
    Welcome
  },
  methods: {
    onConvertClick(path) {
      var me = this;
      let options = this.$refs.convertOptions?.general?.data;
      let req = {path: path, convertOptions: options}
      console.log(req);
      Poster.post('convert', req, function(response) {
        console.log('convert response:', response);
      });
//      alert(path);
    },
    onConvertCloseClick() {
      console.log('CLRCL');
      this.showConvertOptions = false;
    },
    onFileSelect(path, isDir) {

      this.file = {
        path: path,
        isDir: isDir
      }
      //console.log('select:', path, isDir ? '(dir)' : '(file)');
    },
    displayInfo(path) { // called from FileItem.vue
      var me = this;
      Poster.post('info', {path: path}, function(response) {
        me.selectedInfo = response;
      });
    },
  },
  mounted() {
    var me = this;
    Poster.post('get-folder', {folder: ''}, function(response) {
      me.item = response.children[0];
    });
  },
  data() {
    return {
      file: null,
      selectedItem: null,
      item: null,     // the tree
      treeStatusText: 'loading file tree...',
      selectedInfo: {},
      showConvertOptions: false,
      //convertOptions: {},
      /*
      convertOptions: {
        ui: {},
        schema: {},
        data: {
          quality: 40,
          'alpha-quality': 65,
          'auto-limit': true,
          "command-line-options": 'dyt',
          'skip-these-precompiled-binaries': ''
        }
      }*/
    }
  },
  provide() {
    return {
      wcfm: this
    }
  }
}
</script>

<style>
  .convertOptionsButton {
    position: absolute;
    right: 10px;
    top: 8px;
  }
  .splitpanes__pane {
    background-color: white !important;
    padding: 0px;
    min-height: 80px;
    box-shadow: inset 0 0 3px rgba(0,0,0,.2);
  }
  .pane-content {
    height:100%;
    overflow-y: auto;

  }
  .pane-content > *{
    padding: 10px 20px;
  }
  body, html {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .mainpanel, #webpconvert-filemanager {
    height: 100%;
    min-height: 300px;
    position: relative;
  }
  .mainpanel {
    min-height: 400px;
  }
  /*
  #webpconvert-filemanager {
    padding: 20px;
  }*/
  .wcfm, input {
    font-family: 'Avenir',Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #222;
    font-size: 14px;
  }

  input {
    padding: 5px 8px;
    border-color: #333;
    border-width: 1px;
    box-sizing: border-box;
  }

  /* vue-multiselect tweaks */
  div .multiselect {
    min-height: 30px;
  }
  div .multiselect__select {
    height: 30px;
    line-height: 16px;
    width: 30px;
  }
  div .multiselect__select::before {
    border-top-color: #000;
    border-width: 6px 6px 0 6px;
  }
  div .multiselect__single {
    margin-bottom: 3px;
  }

  div .multiselect__tags {
    border-color: #333;
    border-radius: 0;
    padding: 5px 40px 0 5px;
    min-height: 30px;
  }
  li.multiselect__element {
    margin-left: 0px;
  }
  /*
  div .multiselect__option--selected.multiselect__option--highlight,
  div .multiselect__option--selected.multiselect__option--highlight:after {
    background: #41b883;
  }*/
  div .multiselect__tag {
    margin-bottom: 0;
    padding-bottom: 3px;
    padding-top: 3px;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
