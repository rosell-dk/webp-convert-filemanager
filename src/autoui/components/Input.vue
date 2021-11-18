<template>
  <div @input="onLocalChange()" class="autoui-input">
    <input :type="inputType" :class="inputClass" v-model="stringValue" />
    <svg v-if="sensitive" :class="{'icon-eye':true, 'revealed':passwordRevealed}" @click="onEyeClick"><use xlink:href="#icon-eye" /></svg>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    'modelValue': {},
    'schema': Object,
    'sensitive': {type: Boolean, default: false},
  },
  computed: {
    inputType: function() {
      if (this.dataType == 'string') {
          return 'text';
          //return (this.sensitive && !this.passwordRevealed ? 'password' : 'text');
      }
      if ((this.dataType == 'int') || (this.dataType == 'float')) {
        return 'number';
      }
    },
    inputClass: function() {
      if (this.dataType == 'int') {
        return 'small';
      }
      else {
        if (!this.sensitive) {
          return '';
        }

        return 'sensitive' + (this.passwordRevealed ? ' revealed' : ' obscured');
      }
    },
    valueAsString: function() {
      return this.modelValue.toString();
    },
    dataType: function() {
      if (this?.schema?.type) {
        switch (this.schema.type[0]) {
          case 'integer':
            return 'int';
          default:
            return 'string';
        }
      } else {
        return '';
      }
    }

  },
  emits: ['update:modelValue'],
  methods: {
    updateLocalModel(modelValue) {
      this.stringValue = modelValue.toString();
    },
    onEyeClick() {
      this.passwordRevealed = !this.passwordRevealed;
    },
    onLocalChange() {
      //console.log('local change')
      let varType = (this?.schema?.type ? this.schema.type[0] : 'string');

      switch (varType) {
        case 'integer':
          var intVal = parseInt(this.stringValue, 10);
          this.$emit('update:modelValue', intVal);
          break;
        /*case 'int':
          var floatVal = parseFloat(this.stringValue);
          this.$emit('update:modelValue', floatVal);
          break;*/
        default:
          this.$emit('update:modelValue', this.stringValue);
          break;
      }
    }
  },
  mounted() {
    this.updateLocalModel(this.modelValue);
  },
  watch: {
    modelValue(newValue, oldValue) {
      //console.log('model value changed to', newValue);
      this.updateLocalModel(newValue);
    },
    option(newValue, oldValue) {
      //this.inputType = newValue;
      //console.log('option changed to', newValue);
    }
  },
  data() {
    return {
      stringValue: '',
      passwordRevealed: false,
    }
  }
}
</script>

<style>
  /* https://stackoverflow.com/questions/35120217/base64-encoded-opentype-font-face-using-data-uri */
  /* https://base64.guru/converter/encode/file */
  /* https://stackoverflow.com/questions/16258194/imitate-a-password-type-input-while-using-a-contenteditable-div/16258358 */
  @font-face {
    font-family: 'password';
    src: url('data:font/woff;charset=utf-8;base64,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') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  .autoui-input {
    & .icon-eye {
      width: 18px;
      height: 18px;
      margin-left: 5px;
      cursor: pointer;
    }
    & .icon-eye:hover {
      fill: #333;
    }
    & .icon-eye.revealed {
      fill: #888;
    }
    & input {
      width: 100%;
      min-height: 30px;
    }
    & input.obscured {
      font-family: 'password', sans-serif;
      font-size: 8px;
    }
    & input.sensitive {
      width: calc(100% - 30px);
    }
    & input.small {
      max-width: 100px;
    }
  }

</style>
