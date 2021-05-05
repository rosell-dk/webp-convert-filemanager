<template>
  <svg style="position: absolute; width: 0; height: 0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <symbol id="icon-folder" viewBox="0 0 309.267 309.267">
        <g>
        	<path style="fill:#D0994B;" d="M260.944,43.491H125.64c0,0-18.324-28.994-28.994-28.994H48.323c-10.67,0-19.329,8.65-19.329,19.329
        		v222.286c0,10.67,8.659,19.329,19.329,19.329h212.621c10.67,0,19.329-8.659,19.329-19.329V62.82
        		C280.273,52.15,271.614,43.491,260.944,43.491z"/>
        	<path style="fill:#E4E7E7;" d="M28.994,72.484h251.279v77.317H28.994V72.484z"/>
        	<path style="fill:#F4B459;" d="M19.329,91.814h270.609c10.67,0,19.329,8.65,19.329,19.329l-19.329,164.298
        		c0,10.67-8.659,19.329-19.329,19.329H38.658c-10.67,0-19.329-8.659-19.329-19.329L0,111.143C0,100.463,8.659,91.814,19.329,91.814z
        		"/>
        </g>
      </symbol>

    </defs>
  </svg>

  <ul>
    <li v-for="item in items">
      <FileItem :item="item" />
    </li>
  </ul>
</template>

<script>
import Poster from '../classes/Poster.js'
import FileItem from './FileItem.vue'

export default {
  name: 'FileList',
  components: {
    FileItem
  },
  mounted() {
    var me = this;
    Poster.post('list-roots', {folder: ''}, function(response) {
      me.items = response;
      //me.testData = 'yo!';

    });
  },
  data() {
    return {
      test: 'hello',
      items: [
        {name: 'test'},
      ]
    }
  }
}
</script>

<style language="css">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
