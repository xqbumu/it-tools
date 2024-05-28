
export type SortOrder = 'asc' | 'desc' | null;

export interface ConvertOptions {
    /** @default ',' */
    field?: string;
    /** @default '"' */
    wrap?: string;
    /** @default '\n' */
    eol?: string;
};
