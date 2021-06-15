<template>
  <div class="autoui">
    <AutoComponent :ui="ui" :schema="schema" :modelValue="modelValue" @componentDataChange="onComponentDataChange"/>
  </div>
</template>

<script>
import AutoComponent from './AutoComponent.vue'
export default {
  name: 'AutoUI',
  components: {
    AutoComponent
  },
  props: {
    schema: Object,
    ui: Object,
    modelValue: {}
  },
  computed: {

  },
  data() {
    return {
      advancedView: false,
      options: [],
      optionValues: {},
    }
  },
  mounted() {
    //this.modelValue['quality'] = 50;
    //this.modelValue = {'quality': 30};
  },
  methods: {
    optionSupported(optionName, converter) {
    },
    onComponentDataChange(obj) {
      //console.log('CHANGE!', obj);
      this.modelValue[obj.property] = obj.value;
    }
  }
}
</script>

<style scoped>
  .autoui-table {
    display: table;

    & > * {
      display: table-row;

      & > * {
        display: table-cell;
        padding: 5px 20px 5px 0;
      }
    }
  }

  /* Table, inline blocks - for fixed widths */

  .table-inline-block {
    & > div {
      & > * {
        display: inline-block;
        margin-right: 10px;
        padding: 5px 20px 5px 0;
      }

      & > *:first-child {
        width: 120px;
      }
    }
  }

  .view-select {
    display: block;
    text-align: right;
  }
  .view *:first-child {
    display: inline-block;
    margin-right: 10px;
  }
  .view *:last-child {
    width: 200px;
    display: inline-block;
  }
</style>
