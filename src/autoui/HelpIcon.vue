<template>
  <div class="help-icon">
    <VMenu :delay="{show:100,hide:150}">
      <svg class="icon"><use xlink:href="#icon-help" /></svg>
      <template #popper>
        <div class="menu-inner">
          <!--<p v-html="option.schema['description']"></p>-->
          <p v-for="paragraph in descriptionParagraphs">
            {{ paragraph }}
          </p>
          <div class="buttons" v-if="ui.links">
            <!--<button v-if="ui.urls.guide">Guide</button>
            <button v-if="ui.urls.api">API</button>-->


            <a
              v-for="link in ui.links"
              :href="link[1]"
              target="_blank"
              :class="{'mouse-down':btnDown==link[0]}"
              @mousedown="btnDown=link[0]"
              @mouseup="btnDown=''"
              @mouseleave="btnDown=''"
            >{{ link[0] }}</a>
          </div>
        </div>
      </template>
    </VMenu>
  </div>
</template>

<script>
export default {
  name: 'HelpIcon',
  props: {
    schema: Object,
    ui: Object
  },
  computed: {
    descriptionParagraphs() {
      return this.schema.description.split(/\n\n/);
    }
  },
  data() {
    return {
      btnDown: ''
    }
  },
  methods: {
  }
}
</script>

<style language="css">
.help-icon {
  display: inline-block;
  margin-left: 2px;
}
.icon {
  width: 16px;
  height: 16px;
  vertical-align: top;
  padding: 0px 2px 1px;
}

/*
.buttons button:first-child {
  margin-left: 0;
}
.buttons button {
  margin: 0 5px;
  background-color: white;
  border-radius: 0px;
  color: black;
  padding: 2px 10px;
  border-color: white;
  border-width: 1px;
}*/
.buttons a:first-child {
  margin-left: 0;
}
.buttons a {
  margin: 0 5px;
  background-color: #f5f5f5;
  border-radius: 0px;
  color: black !important;
  padding: 2px 10px;
  border-color: white;
  border-width: 1px;
  text-decoration: none !important;
  font-family: arial, sans-serif;
  font-size: 13.33px;
  border-width: 1px;
  border-style: solid;
  border-bottom-color: #ccc;
  border-right-color: #ccc;
}
.buttons a:hover {
  background-color: #fff;
}
.buttons a.mouse-down {
  border-bottom-color: #fff;
  border-right-color: #fff;
  border-top-color: #ccc;
  border-left-color: #ccc;
}
</style>
