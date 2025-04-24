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
    try {
        const table = document.getElementById(tableId) as HTMLTableElement;
        if (!table) {
            console.error(`Table with ID '${tableId}' not found.`);
            return;
        }

        const ws = XLSX.utils.table_to_sheet(table, {
            raw: true,
            cellDates: true,
            dateNF: 'yyyy-mm-dd'
        });

        const colWidths = [];
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            colWidths.push({ wch: 15 });
        }
        ws['!cols'] = colWidths;

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${filename}.xlsx`);
    } catch (error) {
        console.error('Export failed:', error);
    }
};
</script>