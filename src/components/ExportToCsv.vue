<template>
  <div>
    <div ref="exportToCsv" @click="exportToCsv(element, filename)">
    <slot></slot>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    element: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    }
  },
  methods: {
    createSlug(text: string): string {
      const slug = text
        .trim()
        .toLowerCase()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return `${slug}`;
    },
    exportToCsv(tableId: string, filename: string): void {
      const table = document.getElementById(tableId);

      if (!table) {
        console.error(`Table with ID '${tableId}' not found.`);
        return;
      }

      let csvContent = 'data:text/csv;charset=utf-8,';

      const headers = Array.from(table.querySelectorAll('thead th'))
        .map((header: any) => `"${header.textContent.trim()}"`)
        .join(',');
      csvContent += `${headers}\n`;

      const rows = Array.from(table.querySelectorAll('tbody tr'));
      const dataRows = rows.map((row) => {
        return Array.from(row.querySelectorAll('td'))
          .map((cell: any) => `"${cell.textContent.trim()}"`)
          .join(',');
      });

      csvContent += `${dataRows.join('\n')}\n`;

      const data = encodeURI(csvContent);

      const link = document.createElement('a');

      link.setAttribute('href', data);
      link.setAttribute('download', `${this.createSlug(filename)}.csv`);

      link.click();
    }
  }
});
</script>

<style scoped>
</style>
