<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container" :style="containerStyle">
        <a class="close-button" @click="onCloseClick">X</a>
        <div class="title">{{ title }}</div>
        <div class="modal-body">
          <div class="content">
            <slot>
              default body
            </slot>
            <div class="close-button-with-text">
              <button  @click="onCloseClick">{{ closeButtonText }}</button>
            </div>
          </div>
        </div>
        <!--<div class="footer">
          <button @click="onCloseClick">{{ closeButtonText }}</button>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  emits: ['close'],
  props: {
    title: {type: String},
    closeButtonText: {type: String},
    width: {type: [Number, String], default: '95%'},
    maxwidth: {type: [Number, String], default: '700px'},
    alignment: {type: String, default: 'center'},   // left / right / center
    height: {type: [Number, String], default: '92%'},
    maxheight: {type: [Number, String], default: '700px'},
    valignment: {type: String, default: 'center'}, // top / bottom / center
  },
  computed: {
    containerStyle() {
      let style = {
        width: this.width,
        'max-width': this.maxwidth,
        height: this.height,
        'max-height': this.maxheight,
      };
      if (this.alignment == 'center') {
        style['margin'] = '0px auto';
      }
      if (this.alignment == 'right') {
        style['position'] = 'absolute';
        style['right'] = '10px';
      }
      if (this.valignment == 'center') {
        style['top'] = '50%';
        style['transform'] = 'translateY(-50%)';
      }
      if (this.alignment == 'bottom') {
        style['position'] = 'absolute';
        style['bottom'] = '10px';
      }
      return style;

    }

  },
  methods: {
    onCloseClick() {
      this.$emit('close');
    },
    registerKeyDownEvent() {
      let me = this;
      document.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
          isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
          isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
          me.$emit('close');
        }
      };
    }
  },
  mounted() {
    this.registerKeyDownEvent();
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;

  & .modal-wrapper {
/*    display: table-cell;
    vertical-align: middle;*/
    height: 100%;
    width: 100%;

    & .modal-container {
      padding: 0;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      font-family: Helvetica, Arial, sans-serif;
      position: relative;

      & .title {
        position: absolute;
        left: 0px;
        top: 0;
        right: 0;
        height: 20px;
        background-color: #ccc;
        padding: 5px 0 0 15px;
        font-size: 14px;
        font-weight: bold;
      }

      & .close-button {
        position: absolute;
        right: 3px;
        top: 3px;
        background-color: white;
        padding: 2px 5px;
        font-size: 10px;
        z-index: 999;
        border-radius: 18px;
        border: 1px solid #ccc;
      }

      & .close-button:hover {
        cursor: pointer;
        background-color: #999;
      }

      & .modal-body {
        position: absolute;
        top: 25px;
        bottom: 0px;
        left: 0;
        right: 0;
        overflow-y: auto;
        /*overflow-x: auto;*/
        padding: 20px;

        & .close-button-with-text {
          text-align: right;
          margin-bottom: 5px;

          & button {
            padding: 3px 20px;
          }
        }
      }

/*
      & .footer {
        position: absolute;
        left: 0px;
        bottom: 0;
        right: 0;
        height: 30px;
        padding: 5px 0 0 15px;
        font-size: 14px;

        & button {
          position: absolute;
          right: 20px;
        }
      }*/
    }

  }

}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
