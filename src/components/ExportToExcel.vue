<template>
    <div>
        <div ref="exportToCsv" @click="exportTableToExcel(props.element, props.filename)">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as XLSX from 'xlsx';

const props = defineProps({
    element: {
        required: true,
        type: String
    },
    filename: {
        required: true,
        type: String
    }
});

const exportTableToExcel = (tableId: string, filename: string): void => {
    const table: HTMLTableElement | null = document.getElementById(tableId) as HTMLTableElement;
    if (!table) {
        console.error(`Table with ID '${tableId}' not found.`);
        return;
    }
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, `${filename}.xls`);
}
</script>