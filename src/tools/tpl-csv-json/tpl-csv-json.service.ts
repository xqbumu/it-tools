import { csv2json } from 'json-2-csv';
import type { ConvertOptions } from './tpl-csv-json.types';
export { getHeaders, convertCsvToJson };

function getHeaders({ line, fs }: { line: string, fs: string }): string[] {
  const headers = new Set<string>();

  line.split(fs).forEach(item => headers.add(item.trim()));

  return Array.from(headers);
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

function convertCsvToJson({ data, cfg }: { data: string, cfg: ConvertOptions }): Object[] {
  return csv2json(data)
}
