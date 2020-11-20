<template>
  <div class="fileitem" @mouseover="hover = true" @mouseleave="hover = false">
    <p>
      <span v-if="item.isDir" class="foldUnfold" @click="this.$emit('foldUnfoldClick')">
        <svg v-if="item.isOpen" class="icon-fold"><use xlink:href="#icon-fold" /></svg>
        <svg v-if="!item.isOpen" class="icon-unfold"><use xlink:href="#icon-unfold" /></svg>
      </span>
      <svg v-if="item.isDir" class="icon-folder" @click="this.$emit('foldUnfoldClick')"><use xlink:href="#icon-folder" /></svg>
      <svg v-if="!item.isDir" class="icon-file"><use xlink:href="#icon-file" /></svg>
      {{ item.name }}
      <button v-if="hover" @click.stop="convertClick()">Convert</button>
      <button v-if="hover" @click.stop="infoClick()">Info</button>
    </p>
  </div>
</template>

<script>
import Poster from '../classes/Poster.js'

export default {
  name: 'FileItem',
  emits: ['foldUnfoldClick'],
  props: {
    item: Object
  },
  data() {
    return {
      hover: false
    }
  },
  methods: {
    getWCFM() {
      var node = this.$parent;
      window.n = node;
      while (node) {
        node = node.$parent;
        if (node.$.type.name == 'WCFM') {
          return node;
        }
      }
      return node;
    },
    getFullPath() {
      var node = this.$parent;
      var path = [];
      while ((node !== null) && (node.$parent !== null)) {
        if (node.item) {
          path.push(node.item.name)
        }
        node = node.$parent;
      }
      return path.reverse().join('/');
    },
    infoClick() {
      this.getWCFM().onInfoClick(this.getFullPath());
      //alert(this.item.name);
    },
    convertClick() {
      this.getWCFM().onConvertClick(this.getFullPath());
      //var topTree = this.getTopFileTree();
      //this.$emit('convertClick');
      //alert(this.item.name);
      //alert(this.getFullPath());
      /*Poster.post('convert', {folder: ''}, function(response) {
        //me.item = response;
        //console.log('r:', response);
      });*/

    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.fileitem {
  vertical-align: middle;
  white-space: nowrap;
  /*margin-left: -12px;*/
  & p:hover {
    background: #eee;
  }

  & p {
    user-select: none;
    cursor: default;
    margin: 0;
    padding: 3px;
    line-height: 25px;
    border-bottom:1px solid #f2f2f2;

    & .foldUnfold {
      user-select: none;
      cursor: pointer;
    }

    & button {
      float: right;
      margin-top: 2px;
      cursor: pointer;
      background-color: white;
      margin-right: 10px;
    }

    & svg.icon-unfold, & svg.icon-fold{
      width: 12px;
      height: 12px;
      vertical-align: middle;
      padding: 3px;
      margin-right: 3px;
      display: inline-block;
      border: 0px solid grey;
    }
    & svg.icon-folder, & svg.icon-file {
      width: 20px;
      height: 20px;
      display: inline;
      vertical-align: middle;
      padding-top: 1px;
      padding-bottom: 2px;
      padding-right: 5px;
    }
    & svg.icon-file {
      margin-left: 22px;
    }
  }
}
/*p.selected {
  background: #bdf;
}*/


</style>
