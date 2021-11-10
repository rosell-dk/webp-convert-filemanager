<template>

  <div class="welcome">
    <div class="headline">
      <div>Welcome to</div>
      <h3>WebP Convert file manager 0.2</h3>
    </div>
    <p>
      At current stage you can browse the image files and compare the original vs the converted file.<br>
      To open a folder, click the "+" sign next to the folder name or double click the folder name
    </p>
    <p>
      <h4>Whats new?</h4>
      <i>Changes in 0.2:</i>
      <ul>
        <li>Tree branches are now loaded on need basis (loaded the complete tree in one go was causing timeout on sites with huge amounts of images)</li>
      </ul>
      <i>Changes in 0.1:</i>
      <ul>
        <li>Everything is new! This is the first tentative pre-alpha work-in-progress release.</li>
      </ul>
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

  & h4 {
    margin-bottom: 3px;
  }
  & li {
    list-style-type: disc;
  }
  & ul {
    margin:0 0 20px 0;
  }

  & .headline h3 {
      margin-top: 0px;
      padding-top :0;
      font-size: 24px;
  }

}

</style>
