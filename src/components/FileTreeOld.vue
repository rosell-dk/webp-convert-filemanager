<template>
  <div class="filetree" :class="{open: isOpen, closed: !isOpen, selected: isSelected}">

    <p @click="click()" @dblclick="toggle()">
      <img v-if="isDir" alt="Directory" src="../assets/folder.svg" width="15"/>
      {{ name }}
    </p>
    <ul>
      <li v-for="item in items">
        <FileTree :name="item.name" :isDir="item.isDir" :loadUponInit="false"/>
      </li>
    </ul>
  </div>
</template>

<style language="css">
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      list-style-image: url('folder.png');
    }

    li {
      padding-left: 20px;
    }
    .filetree.open > ul {
      display: block;
    }
    .filetree.closed > ul {
      display: none;
    }
    .filetree > p {
      user-select: none;
      cursor: pointer;
      margin: 0;
      padding: 10px;
    }
    .filetree > p:hover {
      background: #eee;
    }
    .filetree.selected > p {
      background: #bdf;
    }
    img {
      display: inline-block;
    }
</style>
<script>
export default {
  name: 'FileTree',
  props: {
    loadUponInit: Boolean,
    name: String,
    isDir: Boolean,
    hasRoot: Boolean
  },
  data() {
    return {
      isOpen: false,
      isLoaded: false,
      isSelected: false,
      items: []
    }
  },
  created() {
    if (this.loadUponInit) {
      this.refresh();
      this.toggle();
    }
  },
  methods: {
    toggle() {
      if (!this.isLoaded) {
        this.refresh();
      }
      this.isOpen = !this.isOpen;
    },
    click() {
      this.select();
    },
    select() {
      this.isSelected = true;
    },
    refresh() {
      this.isLoaded = true;
      //alert('ref' + this.items.length);
      this.items = [
        {name:'uploads', isDir:true},
        {name:'themes', isDir:true},
        {name:'file', isDir:false}
      ]
    }
  },

}
</script>
