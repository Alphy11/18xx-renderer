import length from 'ramda/src/length';
import max from 'ramda/src/max';
import reduce from 'ramda/src/reduce';

import { unitsToCss } from '../util';
import { Stock } from './types';

export const getMaxLength = reduce((acc, row) => {
    return max(acc, length(row));
}, 0);

// Give the stock section of a game and the stock config.json section, compute
// data that we need.
export const getParData = (stock, config) => {
    const {
        stock: { cell, par },
    } = config;

    const values = (stock.par && stock.par.values) || [];

    const width = (stock.par.width || par) * cell.width;
    const height = (stock.par.height || 1) * cell.height;
    const rows = length(stock.par.values);
    const columns = Math.max(1, getMaxLength(stock.par.values));
    const totalWidth = width * columns;
    const totalHeight = height * rows + (stock.title === false ? 0 : 50);

    return {
        values,
        par: stock.par || {},
        legend: stock.legend || [],

        rows,
        columns,

        width,
        height,
        totalWidth,
        totalHeight,

        css: {
            width: unitsToCss(width),
            height: unitsToCss(height),
            totalWidth: unitsToCss(totalWidth),
            totalHeight: unitsToCss(totalHeight),
        },
    };
};

// Give the stock section of a game and the stock config.json section, compute
// data that we need.
export const getMarketData = (stock: Stock, config) => {
    const {
        stock: { cell, column, diag },
    } = config;

    let width = 0;
    let height = 0;
    let rows = 0;
    let columns = 0;

    switch (stock.type) {
        case '1Diag':
            width = cell.width;
            height = diag * cell.height;
            rows = 2;
            columns = Math.ceil(length(stock.market) / 2);
            break;
        case '1D':
            width = cell.width;
            height = column * cell.height;
            rows = 1;
            columns = length(stock.market);
            break;
        case '2D':
            width = cell.width;
            height = cell.height;
            rows = length(stock.market);
            columns = getMaxLength(stock.market);
            break;
        default:
            break;
    }

    // Now with width and height set we can figure out total height and total
    // width
    let totalWidth = width * columns;
    let totalHeight = height * rows + (stock.title === false ? 0 : 50);

    // Are we displaying par, if so does this add to the height or width?
    if (stock.display?.par) {
        const parData = getParData(stock, config);
        const parTotalWidth = parData.totalWidth + width * stock.display.par.x;
        const parTotalHeight =
            parData.totalHeight +
            (stock.type === '1Diag' ? height / 2 : height) * stock.display.par.y;

        totalWidth = max(totalWidth, parTotalWidth);
        totalHeight = max(totalHeight, parTotalHeight);
    }

    const humanWidth = `${Math.ceil(totalWidth / 100)}in`;
    const humanHeight = `${Math.ceil(totalHeight / 100)}in`;

    if (stock.type === '1D' || stock.type === '1Diag') {
        if (config.stock.display.legend && stock.legend && stock.legend.length > 0) {
            // Add space for legend
            totalHeight += 50;
        }
    }

    return {
        type: stock.type || '2D',
        ledges: stock.ledges || [],
        legend: stock.legend || [],
        market: stock.market || [],
        par: stock.par || {},
        display: stock.display || {},
        width,
        height,
        humanWidth,
        humanHeight,
        totalWidth,
        totalHeight,
        rows,
        columns,
        stock,
        config,

        css: {
            width: unitsToCss(width),
            height: unitsToCss(height),
            totalWidth: unitsToCss(totalWidth),
            totalHeight: unitsToCss(totalHeight),
        },
    };
};

// Give the stock section of a game and the stock config.json section, compute
// data that we need.
export const getRevenueData = (revenue, config) => {
    const {
        stock: { cell },
    } = config;

    revenue = revenue || {};
    const min = revenue.min || 1;
    const max = revenue.max || 100;
    const perRow = revenue.perRow || 20;

    const { width } = cell;
    const { height } = cell;
    const rows = Math.ceil(max / perRow);
    const columns = perRow;

    const totalWidth = width * columns;
    const totalHeight = height * rows + 50; // Add space for the title

    return {
        min,
        max,
        perRow,
        width,
        height,
        totalWidth,
        totalHeight,
        rows,
        columns,

        css: {
            width: unitsToCss(width),
            height: unitsToCss(height),
            totalWidth: unitsToCss(totalWidth),
            totalHeight: unitsToCss(totalHeight),
        },
    };
};
