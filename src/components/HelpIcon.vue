<template>
  <div class="help-icon">
    <svg class="icon"><use xlink:href="#icon-help" /></svg>
    <div class="help-popup">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpIcon',
  props: {
    label: String
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
}
.help-popup {
    display: none;
    position: absolute;
    border: 1px solid #666;
    z-index:2;
    background-color: #ffffcc;
    padding: 12px 15px;
    /*left: 22px;
    top: 20px;*/
    margin-top: -5px;
    /*white-space: nowrap;*/
    /*min-width: 150px;*/
}
.help-icon:hover .help-popup {
  display: block;
}
.help-popup p:first-child {
  margin-top: 3px;
}
.help-popup p:last-child {
  margin-bottom: 3px;
}

</style>
