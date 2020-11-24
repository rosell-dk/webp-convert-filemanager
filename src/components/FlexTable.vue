<template>
  <div :class="['flex-table', layout]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FlexTable',
  props: {
    layout: String    /* "table" or "flexbox" */
  },
  data() {
    return {
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

/* Table (table)
   Use if you want a table layout where cells automatically shrinks to the content width */
.table-table {
  display: table;

  & > * {
    display: table-row;

    & > * {
      display: table-cell;
      padding: 5px 20px 5px 0;
    }
  }
}


/* Table (inline block)
   Use if you want a table layout with exact column widths */
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
</style>
