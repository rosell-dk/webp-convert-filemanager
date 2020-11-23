<template>
  <div class="selectbox">
    <div :class="['box', {'is-open':isOpen}]" @click.stop="onBoxClick">
      {{ selectedOption ? selectedOption[optionsKey] : placeholder }}
    </div>
    <div class="dropdown" v-show="isOpen">
      <div v-for="option in options">
        <div class="option" :data-key="option[optionsKey]" @click="onOptionClick($event)">
          {{ option[optionsLabel] }}
          <svg class="icon-ok"><use xlink:href="#icon-ok" /></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
inspiration:
https://www.w3schools.com/howto/howto_custom_select.asp
https://v3.vuejs.org/guide/events.html#event-modifiers
https://primefaces.org/primevue/showcase/#/multiselect

TODO:
Custom template for option, via slot, like they do here:
https://primefaces.org/primevue/showcase/#/multiselect

*/
export default {
  name: 'SelectBox',
  props: {
    options: Array,
    optionsLabel: String,
    optionsKey: String,
    placeholder: String
  },
  data() {
    return {
      selectedOption: null,
      isOpen: false
    }
  },
  mounted() {
    document.addEventListener('click', this.onDocumentClick)
  },
  beforeUnmount: function () {
    document.removeEventListener('click', this.onDocumentClick)
    // document.removeEventListener('click', this.onClick)
  },
  methods: {
    onDocumentClick() {
      this.isOpen = false;
    },
    onBoxClick() {
      this.isOpen = !(this.isOpen);
    },
    getOptionByKey(key) {
      return this.options.find(element => element[this.optionsKey] == key);
    },
    onOptionClick(event) {
      var selectedKey = event.target.getAttribute('data-key');
      this.selectedOption = this.getOptionByKey(selectedKey);
      this.isOpen = false;
    }
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.selectbox {
  width: 200px;
  position: relative;
  display: inline-block;

  & .box {
    border: 1px solid black;
    padding: 5px 10px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
  }

  & .box::after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: black transparent transparent transparent
  }
  & .box.is-open::after {
    border-color: transparent transparent black transparent;
    top: 6px;
  }


  & .dropdown {
    position: absolute;
    z-index: 100;
    background-color: white;
    border: 1px solid #eee;
    left: 0;
    right: 0;

    & .option {
      padding: 5px 10px;
      border-bottom: 1px solid #eee;

      & .icon-ok {
        width: 18px;
        height: 18px;
        float: right;
      }
    }
    & .option:hover {
      background-color: #eee;
      cursor: pointer;
      user-select: none;
    }


  }
}
</style>
