<template>
    <div>
        <div ref="exportToCsv" @click="exportTableToExcel(element, filename)">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        element: {
            required: true,
            type: String
        },
        filename: {
            required: true,
            type: String
        }
    },
    methods: {
        exportTableToExcel(tableId: string, filename: string): void {
            const table: HTMLTableElement | null = document.getElementById(tableId) as HTMLTableElement;

            if (!table) {
                console.error(`Table with ID '${tableId}' not found.`);
                return;
            }

            const html = table.outerHTML;
            const base64data = btoa(html);
            const excelMimeType = 'application/vnd.ms-excel';
            const dataUri = `data:${excelMimeType};base64,${base64data}`;

            const link = document.createElement('a');
            link.href = dataUri;
            link.download = filename;
            link.target = '_blank';
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

    }
})
</script>
