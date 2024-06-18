<template>
  <div>
    <table class="print-container" id="printContainer">
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
  </div>
  <div>
      <ExportToWord filename="document" element="printContainer">
        <button>click me</button>
      </ExportToWord>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExportToWord from './components/ExportToWord.vue';

export default defineComponent({
  components: {
    ExportToWord
  },
  data() {
    return {};
  }
});
</script>
