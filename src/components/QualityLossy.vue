<template>
  <div class="quality-lossy">
    <div class="auto" v-if="qualityDetectionSupported">
      <input type="number" class="input-quality" v-model="auto.max" @change="onLocalChange()"/>
      <label>Prevent excess?</label>
      <input type="checkbox" v-model="auto.limit" @change="onLocalChange()"/>
    </div>
    <div class="no-auto"  v-if="!qualityDetectionSupported">
      <input class="input-quality" v-model="noAuto.quality" type="number" @input="onLocalChange()"/>
    </div>
  </div>
</template>

<script>
import SelectBox from './SelectBox.vue'

export default {
  name: 'QualityLossy',
  components: {

  },
  props: {
    converter: String,
    qualityDetectionSupported: Boolean,
    modelValue: Object
  },
  emits: ['update:modelValue'],
  mounted() {
    this.updateLocalModel(this.modelValue);
  },
  data() {
    return {
      auto: {
        max: 75,
        limit: true
      },
      noAuto: {
        quality: 75,
      }
    }
  },
  watch: {
    modelValue(newValue, oldValue) {
      this.updateLocalModel(newValue);
    }
  },
  methods: {
    updateLocalModel(modelValue) {
      this.auto.max = modelValue.max;
      this.auto.limit = (modelValue.quality == 'auto');
      this.noAuto.quality = modelValue.default;
    },
    onLocalChange() {

      if (this.qualityDetectionSupported) {
        this.$emit('update:modelValue', {
          quality: (this.auto.limit ? 'auto' : this.auto.max),
          max: this.auto.max,
          default: this.auto.max,
        });
      } else {
        this.$emit('update:modelValue', {
          quality: this.noAuto.quality,
          max: this.noAuto.quality,
          default: this.noAuto.quality,
        });
      }
      //this.$emit('update:modelValue', this.encoding);
    },
  }
}
</script>

<style scoped>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.quality-lossy {
  & .input-quality {
    width: 40px;
    padding: 3px 5px;
  }
  & .auto {
    & label {
      padding: 0 10px 0 20px;
    }
  }
}
label {}
</style>
