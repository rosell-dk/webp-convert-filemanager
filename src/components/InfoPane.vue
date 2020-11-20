<template>

  <div v-if="info.original">
    <h2>Original</h2>
    Filename: {{ info.original.name }}<br>
    Size: {{ info.original.size }}<br>
  </div>
  <div v-if="info.converted">
    <h2>Converted</h2>
    Filename: {{ info.converted.name }}<br>
    Size: {{ info.converted.size }}<br>
  </div>
  <div v-if="info.log">
    <h2>Conversion log</h2>
    {{ info.log }}
  </div>
</template>

<script>

export default {
  name: 'InfoPane',
  components: {
  },
  props: {
    info: Object
  },
  methods: {
  }
}
</script>
