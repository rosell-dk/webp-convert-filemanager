<template>
  <div class="group">
    <!--
    <Slider
      v-model="modelValue"
      @update:model-value="onLocalChange"
      :min="schema.minimum"
      :max="schema.maximum"
    />
  -->
    <h3>{{ ui ? ui.title : ''}}</h3>
    GROUP
    val:{{ modelValue }}<br>
    schema:{{ schema }}<br>
    ui:{{ ui }}<br>
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
