<template>
  <div class="group">
    <h3>{{ ui ? ui.title : ''}}</h3>
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
