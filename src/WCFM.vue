<template>
  <div class="wcfm">
    <SVGs />
    <multipane class="mainpanel" layout="vertical">
      <div class="pane" style="width:48%">
        <FileTree :item="item" />
      </div>
      <multipane-resizer></multipane-resizer>
      <div class="pane" :style="{ flexGrow: 1 }">
        <ConvertOptions />
        <hr/>
        <InfoPane :info="selectedInfo" />
      </div>
    </multipane>
  </div>
</template>
<!--
<splitpanes style="height: 400px">
  <pane min-size="20">1</pane>
  <pane>
    <splitpanes horizontal>
      <pane>2</pane>
      <pane>3</pane>
    </splitpanes>
  </pane>
  <pane>5</pane>
</splitpanes>-->


<script>
import Poster from './classes/Poster.js'

import SVGs from './components/SVGs.vue'
import ConvertOptions from './components/ConvertOptions.vue'
import FileTree from './components/FileTree.vue'
import InfoPane from './components/InfoPane.vue'

import Multipane from './components/standard/multipane.vue';
import MultipaneResizer from './components/standard/multipane-resizer.vue';

//import Pane from './components/pane.vue';
//import Splitpanes from './components/splitpanes.vue';


export default {
  name: 'WCFM',
  components: {
    SVGs,
    ConvertOptions,
    FileTree,
    InfoPane,
    Multipane, MultipaneResizer
    //Splitpanes, Pane
  },
  methods: {
    onConvertClick(path) {
      alert(path);
    },
    displayInfo(path) { // called from FileItem.vue
      var me = this;
      Poster.post('info', {path: path}, function(response) {
        me.selectedInfo = response;
      });
    }
  },
  mounted() {
    var me = this;
    Poster.post('get-tree', {folder: ''}, function(response) {
      me.item = response;
      // TODO: Loading animation
      //console.log('r:', response);
    });
  },
  data() {
    return {
      selectedPath: null,
      selectedItem: null,
      item: {},
      selectedInfo: {}
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
/*
  body, html {
    height: 100%;
    margin: 0;
    padding: 0;
  }*/
  .mainpanel, #webpconvert-filemanager {
    height: 100%;
  }
  .mainpanel {
    min-height: 400px;
  }
  /*
  #webpconvert-filemanager {
    padding: 20px;
  }*/
  .wcfm {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #3c434a;
  }

  input {
    padding: 3px 5px;
  }
</style>
