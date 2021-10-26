<template>
  <FileTree v-if="item" :item="item" @select="onSelect"/>
  <div v-if="!item">
    loading file tree...
  </div>
</template>

<script>
import FileTree from './FileTree.vue'

export default {
  name: 'Files',
  components: {
    FileTree
  },
  emits: ['select'],
  props: {
    item: Object
  },
  methods: {
    onSelect(c) {
      if (this.selectedItem) {
        this.selectedItem.selected = false;
      }
      this.selectedItem = c;
      this.$emit('select', this.selectedItem.getFullPath(), this.selectedItem.item.isDir);

      //console.log('selected path:', this.selectedItem.getFullPath(), this.selectedItem.item.isDir)
    }
  },
  data() {
    return {
      selected: null

    }
  }
}
</script>
