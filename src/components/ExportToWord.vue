<template>
  <div @click="exportToWord(props.element, props.filename)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  element: {
    required: true,
    type: String,
  },
  filename: {
    required: true,
    type: String,
  },
});

function exportToWord(element: string, filename = "document") {
  const printContainer = document.getElementById(element) as HTMLElement;
  const htmlContent = printContainer.innerHTML;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = filename + ".docx";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  URL.revokeObjectURL(url);
}
</script>
