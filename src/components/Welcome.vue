<template>

  <div class="welcome">
    <div class="headline">
      <div>Welcome to</div>
      <h3>WebP Convert file manager</h3>
    </div>
    <p>
      To open a folder, click the "+" sign next to the folder name or double click the folder name
    </p>
    <p>
      <h4>Whats new?</h4>
      <ul>
        <li>
          You can now adjust conversion settings.
          The settings start out with the defaults stored in WebP Express
          (It will however not start out with Stack converter, but instead with your top active working converter -
          in order to simplify the UI).
          There are a couple of additional conversion settings that you don't find in WebP Express settings.
        </li>
      </ul>
    </p>
    <p>
      <h4>Whats planned ahead?</h4>
      I have plenty of ideas, but no planned priority.
      Ideas:
      <ul>
        <li>Trigger bulk conversion on folders / mark for background conversion</li>
        <li>Stats on folders</li>
        <li>Display more info on images (dimensions, quality on jpeg and such)</li>
        <li>Interface to allow adjusting quality on a conversion quickly and compare directly</li>
        <li>Compare converters side-by-side (visual quality, result size, conversion time)</li>
      </ul>
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
