<template>
  <div class="root">
    <div class="first">
      <div>
        <slot name="first" />
      </div>
    </div>
    <div class="divider"/>
    <div class="second">
      <div>
        <slot name="second" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplitPanes',
  props: {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style language="css" scoped>

div.root {
  display: flex;
  width: 100%;
}
div.divider {
  width: 2px;
  background-color: #333;
  cursor: ew-resize;
}
.first {
  background-color: #ccf;
}
.second {
  background-color: #cfc;
}

</style>
