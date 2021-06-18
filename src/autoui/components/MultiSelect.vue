<template>
  <!-- https://vue-multiselect.js.org/ -->
  <VueMultiselect
    v-model="valueAsArray"
    :options="options"
    :multiple="true"
    :close-on-select="false"
    :clear-on-select="false"
    :preserve-search="false"
    :preselect-first="false"
    :searchable="false"
    :allowEmpty="true"
    @update:model-value="onLocalChange"
    placeholder=""
  >
    <!--
    placeholder="Pick some"
    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
  -->
    <template v-slot:selection="{ values, search, isOpen }">
      <span v-if="!isOpen">
      <span class="multiselect__single" v-if="(values.length > 0) &amp;&amp (values.length < options.length)">
        {{ values.join(', ') }}
      </span>
      <span class="multiselect__single" v-if="values.length == options.length">
        all
      </span>
      <span class="multiselect__single" v-if="(values.length == 0) &amp;&amp; !isOpen">
        none
      </span>
    </span>
    </template>
  </VueMultiselect>
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'MultiSelect',
  components: {
    VueMultiselect
  },
  props: {
    'modelValue': {},
    'schema': Object,
    'ui' : Object
  },
  emits: ['update:modelValue'],
  computed: {
    options: function() {
      var options = [];
      if (this?.schema?.enum) {
        options = this.schema['enum'];
      }
      if (this?.ui?.options) {
        options = this.ui.options;
      }
      return options;
    }
  },
  methods: {
    updateLocalModel(modelValue) {
      var arr = modelValue.toString().trim().split(',');

      // for some reason, arr is a Proxy with an empty element in it.
      // remove empty elements...
      arr = arr.filter(function (word) { return word != '' });
      this.valueAsArray = arr;
    },
    onLocalChange() {
      this.$emit('update:modelValue', this.valueAsArray.join(','));
    },
  },
  mounted() {
    this.updateLocalModel(this.modelValue);
  },
  watch: {
    modelValue(newValue, oldValue) {
      this.updateLocalModel(newValue);
    }
  },
  data() {
    return {
      valueAsArray: []
    }
  }
}
</script>

<style scoped>
</style>
