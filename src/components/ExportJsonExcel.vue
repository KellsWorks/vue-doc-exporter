<script setup lang="ts">
import { computed } from 'vue';
import download from 'downloadjs';

interface Props {
  type?: string;
  data?: any[] | any[][];
  fields?: Record<string, any>;
  exportFields?: Record<string, any>;
  defaultValue?: string;
  header?: string | string[];
  footer?: string | string[];
  name?: string;
  fetch?: () => Promise<any[]>;
  meta?: any[];
  sheets?: string[];
  worksheet?: string;
  beforeGenerate?: () => Promise<void>;
  beforeFinish?: () => Promise<void>;
  escapeCsv?: boolean;
  stringifyLongNum?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'xls',
  data: () => [],
  fields: () => ({}),
  exportFields: () => ({}),
  defaultValue: '',
  header: undefined,
  footer: undefined,
  name: 'data.xls',
  meta: () => [],
  worksheet: 'Sheet1',
  sheets: () => [],
  escapeCsv: true,
  stringifyLongNum: false,
});

const idName = computed(() => {
  const now = new Date().getTime();
  return `export_${now}`;
});

const downloadFields = computed(() => {
  if (props.fields && Object.keys(props.fields).length > 0) return props.fields;
  if (props.exportFields && Object.keys(props.exportFields).length > 0) return props.exportFields;
  return null;
});

const generate = async () => {
  if (typeof props.beforeGenerate === 'function') {
    await props.beforeGenerate();
  }

  let data = props.data;
  if (typeof props.fetch === 'function' || !data) {
    data = await props.fetch?.() ?? [];
  }

  if (!data || data.length === 0) {
    return;
  }

  const json = getProcessedJson(data, downloadFields.value);

  if (props.type === 'html') {
    return exportFile(
      jsonToXLS(json),
      props.name.replace('.xls', '.html'),
      'text/html'
    );
  } else if (props.type === 'csv') {
    return exportFile(
      jsonToCSV(json),
      props.name.replace('.xls', '.csv'),
      'application/csv'
    );
  }

  return exportFile(
    jsonToXLS(json),
    props.name,
    'application/vnd.ms-excel'
  );
};
const exportFile = async (data: string, filename: string, mime: string) => {
  const blob = base64ToBlob(data, mime);
  if (typeof props.beforeFinish === 'function') {
    await props.beforeFinish();
  }
  download(blob, filename, mime);
};

const jsonToXLS = (data: any[]): string => {
  const xlsTemp = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta name=ProgId content=Excel.Sheet>
        <meta name=Generator content="Microsoft Excel 11">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>\${worksheet}</x:Name>
                  <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                  </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
        <![endif]-->
        <style>
          br {mso-data-placement: same-cell;}
        </style>
      </head>
      <body>
        <table>\${table}</table>
      </body>
    </html>
  `;

  let xlsData = "<thead>";
  const colspan = Object.keys(data[0]).length;

  const header = props.header || props.name;
  if (header) {
    xlsData += parseExtraData(
      header,
      `<tr><th colspan="${colspan}">\${data}</th></tr>`
    );
  }

  xlsData += "<tr>";
  for (const key in data[0]) {
    xlsData += `<th>${key}</th>`;
  }
  xlsData += "</tr>";
  xlsData += "</thead>";

  xlsData += "<tbody>";
  data.forEach((item) => {
    xlsData += "<tr>";
    for (const key in item) {
      xlsData += `<td>${preprocessLongNum(
        valueReformattedForMultilines(item[key])
      )}</td>`;
    }
    xlsData += "</tr>";
  });
  xlsData += "</tbody>";

  if (props.footer != null) {
    xlsData += "<tfoot>";
    xlsData += parseExtraData(
      props.footer,
      `<tr><td colspan="${colspan}">\${data}</td></tr>`
    );
    xlsData += "</tfoot>";
  }

  return xlsTemp
    .replace("${table}", xlsData)
    .replace("${worksheet}", props.worksheet);
};

const jsonToCSV = (data: any[]): string => {
  const csvData: string[] = [];

  const header = props.header || props.name;
  if (header) {
    csvData.push(parseExtraData(header, "${data}\r\n"));
  }

  const fields = Object.keys(data[0]);
  csvData.push(fields.join(","));
  csvData.push("\r\n");

  data.forEach((item) => {
    const rowData: string[] = [];
    fields.forEach((key) => {
      let escapedCSV = String(item[key]);
        if (props.escapeCsv) {
          escapedCSV = `="${escapedCSV}"`;
        if (escapedCSV.match(/[,"\n]/)) {
          escapedCSV = `"${escapedCSV.replace(/"/g, '""')}"`;
        }
      }
      
      rowData.push(escapedCSV);
    });
    csvData.push(rowData.join(","));
    csvData.push("\r\n");
  });

  if (props.footer != null) {
    csvData.push(parseExtraData(props.footer, "${data}\r\n"));
  }

  return csvData.join("");
};

const getProcessedJson = (data: any[], header: Record<string, any> | null): any[] => {
  const keys = getKeys(data, header);
  return data.map((item) => {
    const newItem: Record<string, any> = {};
    for (const label in keys) {
      const property = keys[label];
      newItem[label] = getValue(property, item);
    }
    return newItem;
  });
};

const getKeys = (data: any[], header: Record<string, any> | null): Record<string, any> => {
  if (header) {
    return header;
  }

  const keys: Record<string, any> = {};
  for (const key in data[0]) {
    keys[key] = key;
  }
  return keys;
};

const parseExtraData = (extraData: string | string[], format: string): string => {
  let parseData = "";
  if (Array.isArray(extraData)) {
    extraData.forEach((data) => {
      if (data) parseData += format.replace("${data}", data);
    });
  } else {
    parseData += format.replace("${data}", extraData);
  }
  return parseData;
};

const getValue = (key: string | { field: string; callback?: (item: any) => any }, item: any): any => {
  const field = typeof key !== "object" ? key : key.field;
  const indexes = typeof field !== "string" ? [] : field.split(".");
  let value = props.defaultValue;

  if (!field) {
    value = item;
  } else if (indexes.length > 1) {
    value = getValueFromNestedItem(item, indexes);
  } else {
    value = parseValue(item[field]);
  }

  if (typeof key === "object" && key.hasOwnProperty("callback")) {
    value = getValueFromCallback(value, key.callback!);
  }

  return value;
};

const valueReformattedForMultilines = (value: any): string => {
  if (typeof value === "string") {
    return value.replace(/\n/gi, "<br/>");
  }
  return String(value);
};

const preprocessLongNum = (value: any): string | number => {
  if (props.stringifyLongNum) {
    if (String(value).startsWith("0x")) {
      return value;
    }
    if (!isNaN(value) && value !== "") {
      if (value > 99999999999 || value < 0.0000000000001) {
        return `="${value}"`;
      }
    }
  }
  return value;
};

const getValueFromNestedItem = (item: any, indexes: string[]): any => {
  let nestedItem = item;
  for (const index of indexes) {
    if (nestedItem) {
      nestedItem = nestedItem[index];
    }
  }
  return parseValue(nestedItem);
};

const getValueFromCallback = (item: any, callback: (item: any) => any): any => {
  if (typeof callback !== "function") {
    return props.defaultValue;
  }
  const value = callback(item);
  return parseValue(value);
};

const parseValue = (value: any): any => {
  return value || value === 0 || typeof value === "boolean"
    ? value
    : props.defaultValue;
};

const base64ToBlob = (data: string, mime: string): Blob => {
  const base64 = window.btoa(unescape(encodeURIComponent(data)));
  const bstr = atob(base64);
  const n = bstr.length;
  const u8arr = new Uint8ClampedArray(n);
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  return new Blob([u8arr], { type: mime });
};
</script>

<template>
  <div :id="idName" @click="generate">
    <slot> Download {{ props.name }} </slot>
  </div>
</template>