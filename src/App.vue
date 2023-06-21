<template>
  <div>
    <table id="table" class="table-auto">
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
    <ExportToExcel element="table" filename="document">
      <button>click me</button>
    </ExportToExcel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ExportToExcel from './components/ExportToExcel.vue';

export default defineComponent({
  components: {
    ExportToExcel
  },
  data() {
    return {};
  }
});
</script>
