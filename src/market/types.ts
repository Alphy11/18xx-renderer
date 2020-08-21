type OneRequired<T, R> = (Required<T> & Partial<R>) | (Required<R> & Partial<T>);

export type Arrow = 'up' | 'down' | 'left' | 'right';
export type Color = string;

export type RawCell = number | string | Cell;
export type Cell = OneRequired<{ label: string }, { value: number }> & {
    arrow?: Arrow | Arrow[];
    color?: Color;
    arrowColor?: Color;
    legend?: number;
    labelColor?: Color;
    rotated?: boolean;
    subRotated?: boolean;
    subLabel?: string;
    par?: boolean;
    companies?:
        | string
        | {
              row: number;
              abbrev: string;
          };
    width?: number;
    height?: number;
    underline?: number;
    right?: boolean;
};

export interface Company {
    abbrev: string;
}
export interface Game {
    companies?: Company[];
    stock: Stock;
}

export interface Stock {
    type: '2D' | '1D' | '1Diag';
    market: RawCell[][];
    title?: string | false;
    display?: {
        par?: { x: number; y: number };
    };
    legend?: unknown[];
    par?: Record<string, unknown>;
    ledges?: unknown[];
}
