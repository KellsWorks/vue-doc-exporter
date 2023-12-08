## Exporting Content to CSV File

This setup facilitates seamless exportation of the defined content as a CSV file. To export content as a CSV file in Vue.js, follow these steps:

1. **Table Setup**: Construct your table or content structure within a designated container, assigning it a specific ID for export.

    ```html
    <template>
        <div>
            <table id="exportTable">
                <!-- Your table or content structure -->
                <!-- ... -->
            </table>
            <ExportToCsv element="exportTable" filename="document">
                <button>Click here to export</button>
            </ExportToCsv>
        </div>
    </template>
    ```

2. **Implement ExportToCsv Component**: Integrate the `ExportToCsv` component to wrap your content and enable CSV export functionality.

    ```javascript
    <script lang="ts">
    import { ExportToCsv } from 'vue-doc-exporter';

    export default {
        components: {
            ExportToCsv
        }
    }
    </script>
    ```
