<template>
  <div @input="onLocalChange()">
    PASS
    <div id="password" contenteditable="true" v-text="stringValue"></div>
    <input :type="inputType" :class="inputClass" v-model="stringValue" />
    <svg v-if="sensitive" :class="{'icon-eye':true, 'revealed':passwordRevealed}" @click="onEyeClick"><use xlink:href="#icon-eye" /></svg>
  </div>
</template>

<script>
export default {
  name: 'Password',
  props: {
    'modelValue': {},
    'schema': Object,
    'sensitive': {type: Boolean, default: false},
  },
  computed: {
    inputType: function() {
      if (this.dataType == 'string') {
          return (this.sensitive && !this.passwordRevealed ? 'password' : 'text');
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
        return (this.sensitive ? 'sensitive' : '');;
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

<style scoped>
  .icon-eye {
    width: 18px;
    height: 18px;
    margin-left: 5px;
    cursor: pointer;
  }
  .icon-eye:hover {
    fill: #333;
  }
  .icon-eye.revealed {
    fill: #888;
  }
  input {
    width: 100%
  }
  input.sensitive {
    width: calc(100% - 30px);
  }
  input.small {
    max-width: 100px;
  }
</style>
