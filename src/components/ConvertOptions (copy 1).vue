<template>
  <FlexTable class="convert-options" layout="table">
    <FlexTableRow>
      <FlexTableCell>
        <label>Converter</label>
      </FlexTableCell>
      <FlexTableCell>
        <SelectBox :options="converters" optionsLabel="name" optionsKey="id" placeholder="Select converter" />
      </FlexTableCell>
    </FlexTableRow>
    <FlexTableRow>
      <FlexTableCell>
        <label>WebP encoding</label>
      </FlexTableCell>
      <FlexTableCell>
        <EncodingSelector :converter="selectedConverter" />
      </FlexTableCell>
    </FlexTableRow>
  </FlexTable>
</template>

<script>
import Poster from '../classes/Poster.js'
import SelectBox from './SelectBox.vue'
import EncodingSelector from './EncodingSelector.vue'
import FlexTable from './FlexTable.vue'
import FlexTableRow from './FlexTableRow.vue'
import FlexTableCell from './FlexTableCell.vue'

export default {
  name: 'ConvertOptions',
  components: {
    SelectBox, EncodingSelector, FlexTable, FlexTableRow, FlexTableCell
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

/* Table, - in order to autosize first column */
.convert-options {

}



</style>
