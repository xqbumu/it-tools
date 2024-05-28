<script setup lang="ts">
import { csv2json, json2csv } from 'json-2-csv';
import xlsx2csv from '@ailnaf/xlsx2csv'
import type { ConvertOptions } from './tpl-csv-json.types';

const cfg = useStorage<ConvertOptions>('tpl-csv-json:conversionConfig', {
  field: ',',
  wrap: '"',
  eol: '\n',
});

function download(content: string, mimeType: string, filename: string){
  const a = document.createElement('a')
  const blob = new Blob([content], {type: mimeType})
  const url = URL.createObjectURL(blob)
  a.setAttribute('href', url)
  a.setAttribute('download', filename)
  a.click()
}

function serializeValue(value: unknown): string {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return '';
  }
  const valueAsString = String(value).replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/"/g, '\\"');
  if (valueAsString.includes(',')) {
    return `"${valueAsString}"`;
  }
  return valueAsString;
}

async function handleDrop(event: any) {
  if (event.dataTransfer.files.length === 0) {
    return;
  }

  const file = event.dataTransfer.files[0];
  const name = file.name.slice(0, file.name.lastIndexOf('.'))
  const ext = file.name.slice(file.name.lastIndexOf('.')+1)
  const reader = new FileReader();

  switch (ext) {
    case 'json':
      reader.addEventListener("load", () => {
        const obj = JSON.parse(reader.result as string)
        const data = Object.keys(obj)
          .map(key => [key, obj[key]]);
        download(json2csv(data), 'text/csv', `${name}.csv`);
      }, false,);
      reader.readAsText(file);
      break;
    case 'xlsx':
      const rows = await xlsx2csv(file, null, {sheet: {collect: true}});
      var obj = rows.reduce((prev, cur, idx) => {
        return {...prev, [cur[0]]: cur[1]};
      }, {});
      download(JSON.stringify(obj, null, 2), 'application/json', `${name}.json`);
      break;
    case 'csv':
      reader.addEventListener("load", () => {
        const obj = csv2json(reader.result as string);
        download(JSON.stringify(obj, null, 2), 'application/json', `${name}.json`);
      }, false,);
      reader.readAsText(file);
      break;
    default:
      break;
  }
}
</script>

<template>
  <div style="flex: 0 0 100%">
    <div style="margin: 0 auto; max-width: 600px">
      <c-card>
        <div
          class="dropzone"
          @drop.prevent="handleDrop"
          @dragover.prevent
        >
          将文件拖拽到此处上传
        </div>
      </c-card>
    </div>
  </div>
</template>
 
<style>
.dropzone {
  width: 300px;
  height: 200px;
  border: 2px dashed #ccc;
  line-height: 200px;
  text-align: center;
  color: #ccc;
  position: relative;
}
</style>
