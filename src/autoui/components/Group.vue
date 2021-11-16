<template>
  <div class="group">
    <h3 v-if="ui.title">{{ ui ? ui.title : ''}}</h3>
    <slot></slot>
  </div>
</template>

<script>
//import AutoComponent from './../AutoComponent.vue'

export default {
  name: 'Group',
  components: {
    //AutoComponent
  },
  props: {
    'modelValue': {},
    'ui': Object,
    'schema': Object
  },
  emits: ['update:modelValue'],
  methods: {
    onLocalChange() {
      this.$emit('update:modelValue', this.modelValue);
    },
  },
  mounted() {
  },
  data() {
    return {
    }
  }
}
</script>
<style scoped>
  h3 {
    margin: 20px 0 20px;
  }
/*
.convert-options {
  height:100%;
  overflow-y: auto;
  padding:10px 20px;
}*/
</style>
