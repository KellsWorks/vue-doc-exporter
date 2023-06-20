
# Vue Doc Exporter

Export your vue html content to Word, CSV Documents with a button Click


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Installation

Install vue-doc-exporter with npm or yarn

```bash
  npm install vue-doc-exporter
  yarn add vue-doc-exporter
```
    
## Features

- Export HTML Content To Word Document
- Export HTML Table To CSV file


## Usage

```javascript
/** for word document export */
<template>
    <div>
        <div id="export-container">
            <h3>l will be happily exported!</h3>
        </div>
        <ExportToWord element="export-container" filename="document">
            <button>click here to export</button>
        </ExportToWord>
    </div>
</template>
<script lang="ts">

import { ExportToWord } from 'vue-doc-exporter';

export default{
    components: {
        ExportToWord
    }
}

</script>
```

```javascript
/** for csv file export */
<template>
    <div>
        <table id="exportTable">
            ...rest of the code
        </table>
        <ExportToCsv element="exportTable" filename="document">
            <button>click here to export</button>
        </ExportToCsv>
    </div>
</template>
<script lang="ts">

import { ExportToCsv } from 'vue-doc-exporter';

export default{
    components: {
        ExportToCsv
    }
}

</script>
```

