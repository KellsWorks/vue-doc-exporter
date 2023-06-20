<script lang="ts">
import { defineComponent } from 'vue';

import ExportToCsv from './components/ExportToCsv.vue'
import ExportToWord from './components/ExportToWord.vue'

export default defineComponent({
  components: {
    ExportToWord,
    ExportToCsv,
  },
  data(){
    return{

    }
  }
})
</script>

<template>
  <div>
    <div id="lorem">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto nam, incidunt delectus quibusdam soluta doloremque non itaque facilis voluptatum, libero eligendi alias, assumenda vero blanditiis a nesciunt exercitationem numquam. Sapiente.
  </div>
  <table class="table-auto" id="exportTable">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
  </table>
    <ExportToWord element="exportTable" filename="filename">
      <button>click me</button>
    </ExportToWord>
  </div>
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
