<template>
  <div class="help-icon">
    <svg class="icon"><use xlink:href="#icon-help" /></svg>
  </div>
  {{ schema.description }}
</template>

<script>
export default {
  name: 'HelpIcon',
  props: {
    schema: Object
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style language="css" >
.help-icon {
  display: inline-block;
  margin-left: 2px;
}
.icon {
  width: 16px;
  height: 16px;
  vertical-align: top;
  padding: 0px 2px 1px;
}
</style>
