<template>
  <!--
  https://github.com/Akryum/v-tooltip/discussions/603
  https://github.com/Akryum/v-tooltip/issues/545
  https://v-tooltip.netlify.app/guide/#quick-start
  -->
  <div class="help-icon">
    <svg class="icon" v-tooltip="{content: helpText,html: true, delay:{show:100, hide:200}}"><use xlink:href="#icon-help" /></svg>
  </div>
</template>

<script>
export default {
  name: 'HelpIcon',
  props: {
    label: String,
    helpText: String
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
