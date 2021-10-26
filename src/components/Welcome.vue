<template>

  <div class="welcome">
    <p class="headline">
      <div>Welcome to</div>
      <h3>WebP Convert file manager 0.1</h3>
    </p>
    <p>
      At current stage you can browse the image files and compare the original vs the converted file.<br>
      To open a folder, click the "+" sign next to the folder name or double click the folder name</p>
    <p>
      <h4>Whats new?</h4>
      Everything is new! This is the first tentative pre-alpha work-in-progress release.
    </p>
    <p>
      <h4>Whats planned ahead?</h4>
      Next thing is of course to enable you to trigger conversions.
      To support development, you can <a href="https://ko-fi.com/rosell" target="_blank">buy me a cup of coffee</a>
    </p>

  </div>
</template>

<script>
export default {
  name: 'Welcome',
}
</script>

<style>
/* The following CSS uses nesting (future standard compliant).
   You must use "PostCSS Nesting" package to compile to current standard
 */
.welcome {
  padding:20px 30px;

  & .headline {
    & div {


    }
    & h3 {
      margin-top: 0px;
      padding-top :0;
      font-size: 24px;
    }
  }

  & h4 {
    margin-bottom: 3px;
  }
}

</style>
