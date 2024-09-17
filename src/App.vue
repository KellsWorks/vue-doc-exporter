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
    <ExportJsonExcel :data="[data,data]">
      <button>click me</button>
    </ExportJsonExcel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ExportJsonExcel from "./components/ExportJsonExcel.vue"

export default defineComponent({
  components: { ExportJsonExcel },
  data() {
    return {
      data: [
        { name: "John Doe", age: 30, country: "USA" },
        { name: "Jane Smith", age: 28, country: "Canada" },
        { name: "Sam Brown", age: 22, country: "UK" },
      ],
      columns: ["Name", "Age", "Country"],
    };
  },
  methods: {
  }
});
</script>
