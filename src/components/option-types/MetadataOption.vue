<template>
  <VueMultiselect
    ref="multiselect"
    v-model="valueAsArray"
    :options="option.ui.options"
    :multiple="true"
    :close-on-select="false"
    :clear-on-select="false"
    :preserve-search="false"
    :preselect-first="false"
    :searchable="false"
    :allowEmpty="true"
    @select="onSelect"
    @update:model-value="onLocalChange"
    :hideSelected="false"
    selectLabel=""
    deselectLabel=""
  >
    <!--

    placeholder="Pick some"
    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
  -->
    <template v-slot:selection="{ values, search, isOpen }">
      <span v-if="!isOpen">
        <span class="multiselect__single" v-if="(values.length > 0) &amp;&amp (values.length < option.ui.options.length)">
          {{ values.join(',') }}
        </span>
        <span class="multiselect__single" v-if="values.length == option.ui.options.length">
          all
        </span>
        <span class="multiselect__single" v-if="(values.length == 0) &amp;&amp; !isOpen">
          none
        </span>
      </span>
    </template>

    <template v-slot:option="{ option, index }">
      <div class="option__desc">
        {{ option }}
        <div class="click-to-add" style="float:right" v-if="(option != 'none') &amp;&amp; (option != 'all')">
          Click to add
        </div>
      </div>
    </template>

  </VueMultiselect>
</template>

<script>
import VueMultiselect from 'vue-multiselect'

export default {
  name: 'MultiSelectOption',
  components: {
    VueMultiselect
  },
  props: ['modelValue', 'option'],
  emits: ['update:modelValue'],
  methods: {
    updateLocalModel(modelValue) {
      var arr = modelValue.toString().trim().split(',');

      // for some reason, arr is a Proxy with an empty element in it.
      // remove empty elements...
      arr = arr.filter(function (word) { return word != '' });
      this.valueAsArray = arr;
    },
    onSelect(selected) {
      this.lastSelectedOption = selected;
    },
    onLocalChange(a, b) {

      //if (this.valueAsArray.indexOf('none') > -1) {
      if (this.lastSelectedOption == 'none') {
        this.valueAsArray = ['none'];
        this.$refs.multiselect.toggle();
      } else if (this.lastSelectedOption == 'all') {
        this.valueAsArray = ['all'];
        this.$refs.multiselect.toggle();
      } else {
        // remove "all" and "none" if they are in array
        var arr = this.valueAsArray;
        arr = arr.filter(function (word) { return word != 'none' });
        arr = arr.filter(function (word) { return word != 'all' });
        this.valueAsArray = arr;
      }
      if (this.valueAsArray.length == 0) {
        this.valueAsArray = ['none'];
        this.$refs.multiselect.toggle();
      }
      if (this.valueAsArray.length == 3) {
        this.valueAsArray = ['all'];
        this.$refs.multiselect.toggle();
      }
/*
      if (this.valueAsArray.indexOf('all') > -1) {
        this.valueAsArray = ['all'];
        this.$refs.multiselect.toggle();
      }*/
      //console.log(this.$refs);*/
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
      lastSelectedOption: '',
      valueAsArray: []
    }
  }
}
</script>

<style>
.multiselect__option--selected .click-to-add {
  display: none;
}
</style>
<style scoped>
  .click-to-add {
    float: right;
    font-size: 13px;
  }
</style>
