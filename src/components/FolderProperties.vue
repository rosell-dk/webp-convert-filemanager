<template>
  <div class="folder-properties">
    <div class="path">
      Path: <span class="path">{{ file.path }}</span>
    </div>
    <p>
      You cannot do anything on folders yet. Browse to an image...
    </p>
    <!--
    <p>
      PS: A <a href="https://ko-fi.com/rosell" target="_blank">cup of coffee</a> could speed development up...
    </p>-->
  </div>
</template>

<script>
export default {
  name: 'FolderProperties',
  components: {
  },
  props: {
    file: {
      type: Object,
      default: {}
    }
  },
  watch: {
    file(newValue, oldValue) {
      //console.log('folder changed:', newValue);
    }
  },
}
</script>

<style>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.folder-properties {
  & .path {
    margin-bottom: 20px;
    & .path {
      color: #666;
      font-style: italic;
    }
  }
}
</style>
