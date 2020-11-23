<template>
  <div class="convert-options">
    Converter: <SelectBox :options="converters" optionsLabel="name" optionsKey="id" placeholder="Select converter" />
  </div>
</template>

<script>
import Poster from '../classes/Poster.js'
import SelectBox from './SelectBox.vue'

export default {
  name: 'ConvertOptions',
  components: {
    SelectBox
  },
  props: {
    item: Object
  },
  data() {
    return {
      selectedConverter: '',
      converters: [
        {id: 'cwebp', name: 'cwebp', },
        {id: 'vips', name: 'vips'},
        {id: 'gd', name: 'gd'},
      ]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.convert-options {
}


</style>
