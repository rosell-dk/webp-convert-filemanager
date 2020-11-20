<template>
  <FileItem :item="item" @dblclick="toggle()" @click="toggle()"/>
  <ul class="tree" v-if="(item.children !== undefined) && item.isOpen">
    <li v-for="child in item.children">
      <FileTree :item="child" />
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
  props: {
    item: Object
  },
  methods: {
    toggle() {
      this.item.isOpen = !this.item.isOpen;
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
