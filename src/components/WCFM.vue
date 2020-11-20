<template>
  hhmm
  <SplitPanes>
    <template #first>
      <FileList/>
    </template>
    <template #second>
      <FileList/>
    </template>
  </SplitPanes>

</template>

<style language="css">

</style>

<script>
import FileList from './FileList.vue'
import SplitPanes from './SplitPanes.vue'

export default {
  name: 'WCFM',
  components: {
    FileList,
    SplitPanes
  },
  props: {
  },
  created() {
    //this.loadBranch();
    console.log('WebPC', this);
  },
  data() {
    return {
      // TODO: Extra class: FileBranch.
      // FileList should contain model for entire tree
      // How should we handle select? Store in same data object, or separate?
      // Event bubbling up to Tree?
      //
    }
  },
  methods: {
    loadBranch() {
      this.setBranchData(
        {
          name: 'Test',
          isDir: false,
          items: [
            {name:'uploads', isDir:true},
            {
              name:'themes',
              isDir:true,
              children: [
                {name: 'Twenty-ten', isDir: false},
                {name: 'Twenty-twenty', isDir: false}
              ]
            },
            {name:'file', isDir:false}
          ]
        }
      )
    },
    setBranchData() {

    }
  }
}
</script>
