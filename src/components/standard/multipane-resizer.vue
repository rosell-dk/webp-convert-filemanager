<template>
<div class="multipane-resizer"><div></div><slot></slot></div>
</template>

<style>
.multipane-resizer {
  display: block;
  position: relative;
  z-index: 2;
}
.layout-h > .multipane-resizer {
  /*width: 100%;*/
  height: 10px;
  margin-top: -10px;
  top: 5px;
  cursor: row-resize;
}
.layout-v > .multipane-resizer {
  width: 14px;
  cursor: col-resize;

  &:before {
    display: block;
    content: "";
    width: 3px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -2px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  &:hover {
    &:before {
      border-color: #999;
    }
  }
}
</style>
