<template>
    <div ref="exportToPdf" @click="exportToPdf(filename)">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export default defineComponent({
    name: "ExportToPDF",
    props: {
        filename: {
            required: true,
            type: String
        }
    },
    methods: {
        async exportToPdf(filename: string): Promise<void> {
            const printContainer = document.querySelector('.print-container') as HTMLElement;
            const canvas = await html2canvas(printContainer);
            const image = canvas.toDataURL('image/jpeg');
            const pdf = new jsPDF();
            const imgWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(image, 'JPEG', 0, 0, imgWidth, imgHeight);
            const pdfBlob = pdf.output('blob');
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = `${filename}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

    }
})

</script>
