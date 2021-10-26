<template>
  <FileItem ref="thefileitem" :item="item" @dblclick="toggle" @toggle="toggle" @select="onSelect"/>
  <ul v-if="loading">
    <li>loading...</li>
  </ul>
  <ul class="tree" v-if="(item.children !== undefined) && item.isOpen">
    <li v-for="child in item.children">
      <FileTree :item="child" @select="onSelect" />
    </li>
  </ul>
</template>

<script>
import FileItem from './FileItem.vue'
import Poster from '../classes/Poster.js'

export default {
  name: 'FileTree',
  components: {
    FileItem
  },
  emits: ['select'],
  props: {
    item: Object
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    load() {
      var me = this;
      Poster.post('get-folder', {folder: this.$refs.thefileitem.getFullPath()}, function(response) {
        //me.item = response;
        //me.treeStatusText = 'sorting...';
        //me.item = me.sortTree(response);
        me.loading = true;
        me.item.children = response.children.sort(function(a, b) {
          // Sort first by dir, next by name
          if ((a.isDir) && (!b.isDir)) {
            return -1;
          }
          if ((!a.isDir) && (b.isDir)) {
            return 1;
          }
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        me.item.loaded = true;
        me.loading = false;
        console.log('response', response);
      });

    },
    toggle() {
      this.item.isOpen = !this.item.isOpen;
      if (!this.item.loaded) {
        this.load();
      }
    },
    onSelect(c) {
      //console.log('select received and transmitting');
      this.$emit('select', c);
    }
  },
  mounted() {
    // if root, open the folder (which triggers load)
    if (this.$refs.thefileitem.getFullPath().indexOf('/') == -1) {
      this.toggle();
    }
  }
}
</script>

<!--
https://gist.github.com/dylancwood/7368914
connectors
-->
<style language="css">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  margin: 0 0 0 20px;
}
/*
ul.tree, ul.tree ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
ul.tree ul {
}
ul.tree li {
  margin: 0 0 0 23px;
  padding: 0 0px;
  line-height: 20px;
  color: #369;
  font-weight: bold;
  border-left:1px solid rgb(100,100,100);
}
ul.tree li:last-child {
 border-left:none;
}

ul.tree li:before {
  position:relative;
  top:-0.3em;
  height:1em;
  width:12px;
  color:white;
  border-bottom:1px solid rgb(100,100,100);
  content:"";
  display:inline-block;
  left:0px;
}
ul.tree li:last-child:before {
  border-left:1px solid rgb(100,100,100);
}*/
</style>
