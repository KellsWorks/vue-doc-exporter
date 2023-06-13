<script lang="ts">
import { defineComponent } from 'vue';

import { ExportToWord } from 'vue-doc-exporter'

export default defineComponent({
  components: {
    ExportToWord
  },
  data(){
    return{

    }
  }
})
</script>

<template>
  <div id="lorem">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto nam, incidunt delectus quibusdam soluta doloremque non itaque facilis voluptatum, libero eligendi alias, assumenda vero blanditiis a nesciunt exercitationem numquam. Sapiente.
  </div>
  <ExportToWord element="lorem">Some Text</ExportToWord>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
