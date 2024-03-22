
##  Export to PDF



The `ExportToPdf` facilitates exporting content as a PDF file in Vue.js. It relies on `html2canvas` and `jspdf` libraries for conversion and PDF generation.



### Usage



To utilize the `ExportToPdf` component:



1.  **Import Component**: Import the `ExportToPdf` component into your Vue file/component.

2.  **Implement Component**: Use the `<ExportToPdf>` tag in your template where you want the export functionality.

3.  **Pass Filename**: Provide the `filename` prop with the desired name for the exported PDF file.


5.  **Slot Content**: Insert the content within the `<ExportToPdf>` tags to be exported as a PDF.



### Example



```vue

<template>

<div>

<div  class="print-container">

<h1>Exportable Content</h1>

<p>This section will be exported as a PDF.</p>

</div>



<ExportToPdf  filename="my_document">

<button>Export as PDF</button>

</ExportToPdf>

</div>

</template>



<script  lang="ts">

import { defineComponent } from  'vue';

import { ExportToPdf } from  'vue-doc-exporter';



export  default  defineComponent({

components: {

ExportToPdf

}

});

</script>

```
**MORE PROPS**
| PROP                  | VALUE             | DESCRIPTION                                                                                             |
|-----------------------|-------------------|---------------------------------------------------------------------------------------------------------|
| **filename**          | (String, required)| The desired name for the exported PDF file.                                                            |
| **aspectRatio**       | (Number, optional, default: 2.5)| The aspect ratio of the PDF.                                                                   |
| **showPageNumbers**   | (Boolean, optional, default: false)| Determines whether to display page numbers.                                                       |
| **pageNumbersOrientation** | (String, optional, default: "center")| The orientation of the page numbers. Possible values are "center", "left", "right", "justify", or undefined. |
| **orientation**       | (String, optional, default: "portrait")| The orientation of the PDF. Possible values are "p", "portrait", "l", "landscape", or undefined.          |
| **unit**              | (String, optional, default: "px")| The unit of measurement for the PDF dimensions. Possible values are "em", "pt", "px", "in", "mm", "cm", "ex", "pc", or undefined. |
