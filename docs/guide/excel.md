## Exporting Content to Excel File

To export content as an Excel file in Vue.js, follow these steps:

1. **Table Configuration**: Prepare your content structure within a designated container, assigning it a specific ID for export.

    ```html
    <template>
        <div>
            <table id="exportTable">
                <!-- Your table or content structure -->
                <!-- ... -->
            </table>
            <ExportToExcel element="exportTable" filename="document">
                <button>Click here to export</button>
            </ExportToExcel>
        </div>
    </template>
    ```

2. **Utilize ExportToExcel Component**: Incorporate the `ExportToExcel` component to encapsulate your content and enable Excel export functionality.

    ```javascript
    <script lang="ts">
    import { ExportToExcel } from 'vue-doc-exporter';

    export default {
        components: {
            ExportToExcel
        }
    }
    </script>
    ```

# Export JSON Excel

Exports JSON data in various formats (XLS, CSV, HTML) with support for multiple sheets, custom headers/footers, and other features.

### Component Props

| **Prop**         | **Type**            | **Default** | **Description**                                                                 |
|------------------|---------------------|-------------|---------------------------------------------------------------------------------|
| `type`           | `string`            | `'xls'`     | The file format for the export. Options: `'xls'`, `'csv'`, `'html'`.            |
| `data`           | `any[] | any[][]`    | `[]`        | The data to be exported. Can be a single array or an array of arrays.            |
| `fields`         | `Record<string, any>` | `{}`       | Mapping of field names to export fields.                                         |
| `exportFields`   | `Record<string, any>` | `{}`       | Alternative field mapping for export.                                            |
| `defaultValue`   | `string`            | `''`        | Default value for missing data.                                                   |
| `header`         | `string | string[]` | `undefined` | Custom header(s) for the exported file.                                          |
| `footer`         | `string | string[]` | `undefined` | Custom footer(s) for the exported file.                                          |
| `name`           | `string`            | `'data.xls'` | The name of the exported file.                                                    |
| `fetch`          | `() => Promise<any[]>` | `undefined` | Function to fetch data if not provided in `data`.                                |
| `meta`           | `any[]`             | `[]`        | Metadata to include in the export.                                               |
| `sheets`         | `string[]`          | `[]`        | Names of the sheets for multi-sheet exports.                                     |
| `worksheet`      | `string`            | `'Sheet1'`  | Name of the default worksheet.                                                    |
| `beforeGenerate` | `() => Promise<void>` | `undefined` | Callback function before generation.                                             |
| `beforeFinish`   | `() => Promise<void>` | `undefined` | Callback function before finishing the export.                                   |
| `escapeCsv`      | `boolean`           | `true`      | Whether to escape CSV values.                                                     |
| `stringifyLongNum` | `boolean`         | `false`     | Whether to stringify long numbers.                                               |

### Usage Example

```html
<template>
  <DataExport
    type="csv"
    :data="myData"
    :fields="myFields"
    :header="['Custom Header']"
    :footer="['Custom Footer']"
    name="my_data.csv"
    @click="handleClick"
  />
</template>

<script setup lang="ts">
import { DataExport } from 'vue-doc-exporter' // Path to the component
import { ref } from 'vue';

const myData = ref([...]); // Your data here
const myFields = ref({...}); // Your fields mapping here

const handleClick = () => {
  
};
</script>
```

---