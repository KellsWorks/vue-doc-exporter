## Exporting HTML Content to Word Document

This configuration enables easy exportation of the specified HTML content into a Word document.
To export an HTML document to Word, follow these steps:

1. **Identify Content Container**: Add a specific ID to the container that holds the content you want to export.

    ```html
    <template>
        <div>
            <div id="export-container">
                <h3>Your content to be exported here</h3>
            </div>
            <ExportToWord element="export-container" filename="document">
                <button>Click here to export</button>
            </ExportToWord>
        </div>
    </template>
    ```

2. **Use ExportToWord Component**: Utilize the `ExportToWord` component to encapsulate your content and trigger the export event.

    ```javascript
    <script lang="ts">
    import { ExportToWord } from 'vue-doc-exporter';

    export default {
        components: {
            ExportToWord
        }
    }
    </script>
    ```
