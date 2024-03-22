<template>
  <div @click="exportToPdf(props.filename)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type OrientationType = "p" | "portrait" | "l" | "landscape" | undefined;
type Unit = "em" | "pt" | "px" | "in" | "mm" | "cm" | "ex" | "pc" | undefined;
type PageNumberOrientation = "center" | "left" | "right" | "justify" | undefined;

const props = defineProps({
  filename: {
    type: String,
    required: true
  },
  aspectRatio: {
    type: Number,
    default: 2.5,
    required: false
  },
  showPageNumbers: {
    type: Boolean,
    default: false,
    required: false
  },
  pageNumbersOrientation: {
    type: String as () => PageNumberOrientation,
    required: false,
    default: "center"
  },
  orientation: {
    type: String as () => OrientationType,
    default: "portrait",
    required: false
  },
  unit: {
    type: String as () => Unit,
    default: "px",
    required: false
  },
});

async function exportToPdf(filename: string = "document") {
  const printContainer = document.querySelector(
    ".print-container"
  ) as HTMLDivElement;

  const canvas = await html2canvas(printContainer, {
    scale: props.aspectRatio,
  });
  const data: string = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: props.orientation,
    unit: props.unit,
    format: "a4",
    hotfixes: ["px_scaling"],
  });
  const pageHeight: number = pdf.internal.pageSize.getHeight();
  const pageWidth: number = pdf.internal.pageSize.getWidth();
  const imgHeight: number = (canvas.height * pageWidth) / canvas.width;
  let totalPages: number = 0;
  const padding: number = 10;
  let currentPosition: number = padding;
  let isFirstPage: boolean = true;
  const addPage = (position = 0): void => {
    totalPages++;
    if (!isFirstPage) {
      pdf.addPage();
    }
    pdf.addImage(data, "PNG", 0, -position, pageWidth, imgHeight);
    currentPosition += pageHeight - 2 * padding;
    isFirstPage = false;
  };
  while (currentPosition < imgHeight + padding) {
    addPage(currentPosition);
  }
  if (props.showPageNumbers) {
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(`Page ${i} of ${totalPages}`, 10, pageHeight - 10, {
        align: "justify",
      });
    }
  }
  const callback = async (doc: jsPDF) => {
    doc.save(`${filename}.pdf`);
  };
  await callback(pdf);
}
</script>
