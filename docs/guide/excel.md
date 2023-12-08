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
