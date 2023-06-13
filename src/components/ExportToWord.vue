<template>
    <button @click="exportToWord(props.element, props.filaname)">
    </button>
</template>

<script setup lang="ts">

import { defineProps } from 'vue';

const props = defineProps({
  element: {
    type: String,
    required: true
  },
  filaname: {
    type: String,
    default: 0
  }
});

const exportToWord = (element: string, filename: string = "") => {

    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";

    var postHtml = "</body></html>";

    var html = preHtml + document.getElementById(element)?.innerHTML + postHtml;

    var url =
        "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    filename = filename ? filename + ".doc" : "document.doc";

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    downloadLink.href = url;

    downloadLink.download = filename;

    downloadLink.click();

    document.body.removeChild(downloadLink);
}
</script>
