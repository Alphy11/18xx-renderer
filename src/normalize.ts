import { RawCell, Cell } from './market/types';
import { isString, isNumber, isObject } from './util';

export function normalizCell(cellRaw: RawCell): Cell | null {
    if (isString(cellRaw)) {
        return {
            label: cellRaw,
        };
    } else if (isNumber(cellRaw)) {
        return {
            value: cellRaw,
        };
    } else if (isNumber(cellRaw.value) || isString(cellRaw.label)) {
        return cellRaw;
    }

    // invalid cell
    return null;
}
