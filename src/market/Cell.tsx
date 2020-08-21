import React from 'react';

import findIndex from 'ramda/src/findIndex';
import map from 'lodash/fp/map';
import propEq from 'ramda/src/propEq';
import { compileCompanies, overrideCompanies, isString, isNumber, isArray } from '../util';
import { getMarketData } from './util';
import Currency from '../util/Currency';
import Color from '../data/Color';
import { Cell as CellShape, Game } from './types';

const arrows = {
    down: '↓',
    left: '←',
    right: '→',
    up: '↑',
};

export interface CellProps {
    cell: CellShape;
    game: Game;
    config: any;
    data: ReturnType<typeof getMarketData>;
}

const Cell = ({ cell, game, config, data }: CellProps) => {
    return (
        <Color>
            {(getcolor, t) => {
                // Standard colors
                let color = cell.color ? getcolor(cell.color) : getcolor('plain');
                const arrowColor = cell.arrowColor ? getcolor(cell.arrowColor) : getcolor('black');

                // Check if legend is used
                if (Number.isInteger(cell.legend) && cell.legend < data.legend.length) {
                    color = getcolor(data.legend[cell.legend].color);
                }

                // Check if this is a par
                if (cell.par) {
                    color = data.par?.color ? getcolor(data.par.color) : getcolor('gray');
                }

                // Set labelColor by explicit labelColor or text color with color from above
                const labelColor = cell.labelColor || t(color);

                let rotated = false;
                let subRotated = false;

                if (cell.rotated || (data.type !== '2D' && cell.label)) {
                    rotated = true;
                }
                if (cell.subRotated || (data.type !== '2D' && cell.subLabel)) {
                    subRotated = true;
                }

                const arrowNodes = [cell.arrow].flat().map((arrow, i) => {
                    const left = arrow === 'down' || arrow === 'left';
                    const arrowPadding = arrow === 'down' || arrow === 'up' ? 10 : 5;

                    return (
                        <text
                            // eslint-disable-next-line react/no-array-index-key
                            key={`arrow-${i}`}
                            fill={arrowColor}
                            stroke={getcolor('black')}
                            strokeWidth={0.5}
                            fontFamily="display"
                            fontStyle="bold"
                            fontSize="15"
                            textAnchor={left ? 'start' : 'end'}
                            dominantBaseline="baseline"
                            x={left ? 5 : data.width - 5}
                            y={data.height - arrowPadding}
                        >
                            {arrows[arrow] || '↻'}
                        </text>
                    );
                });

                const companies = overrideCompanies(
                    compileCompanies(game),
                    config.overrideCompanies,
                    config.overrideSelection,
                );

                const companyNodes = map(cell.companies || [], (companyRaw, index) => {
                    const company = isString(companyRaw)
                        ? { row: index + 1, abbrev: companyRaw }
                        : companyRaw;

                    // Look into the original game companies and find this abbrev
                    const companyIndex = findIndex(
                        propEq('abbrev', company.abbrev),
                        game.companies || [],
                    );
                    if (companyIndex === -1) {
                        return null;
                    }
                    const companyData = companies[companyIndex];

                    const y = data.height - (company.row || 1) * (data.type === '1D' ? 21 : 13);

                    return (
                        <Color key={`company-${company.row}`} context="companies">
                            {(getCompanyColor) => (
                                <g>
                                    <rect
                                        x="5"
                                        y={y}
                                        rx="2"
                                        ry="2"
                                        width={data.width - 10}
                                        height={data.type === '1D' ? 16 : 8}
                                        fill={getCompanyColor(companyData.color)}
                                        stroke="black"
                                        strokeWidth="1"
                                    />
                                    {data.type === '1D' && (
                                        <text
                                            x={data.width / 2}
                                            y={y + 9}
                                            fontSize="12"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            stroke="none"
                                            fill={t(getCompanyColor(companyData.color))}
                                        >
                                            {companyData.abbrev}
                                        </text>
                                    )}
                                </g>
                            )}
                        </Color>
                    );
                });

                const text = isNumber(cell.value) ? (
                    <Currency value={cell.value} type="market" />
                ) : (
                    cell.label
                );

                const width = (cell.width || 1) * data.width;
                const height = (cell.height || 1) * data.height;

                return (
                    <g>
                        <rect
                            x="0"
                            y="0"
                            width={width}
                            height={height}
                            stroke={getcolor('black')}
                            strokeWidth="1"
                            fill={color}
                        />
                        {text && (
                            <text
                                transform={rotated ? 'rotate(-90)' : null}
                                fill={labelColor}
                                fontFamily="display"
                                fontStyle="bold"
                                fontSize="15"
                                textAnchor={rotated ? 'end' : 'state'}
                                textDecoration={cell.underline ? 'underline' : null}
                                dominantBaseline="hanging"
                                x={rotated ? -5 : 5}
                                y="5"
                            >
                                {text}
                            </text>
                        )}
                        {cell.subLabel && (
                            <text
                                transform={subRotated ? 'rotate(-90)' : null}
                                fill={labelColor}
                                fontFamily="display"
                                fontStyle="bold"
                                fontSize="15"
                                textAnchor="start"
                                dominantBaseline={
                                    subRotated ? (cell.right ? 'baseline' : 'hanging') : 'baseline'
                                }
                                x={subRotated ? -height + 5 : 5}
                                y={subRotated ? (cell.right ? width - 5 : 5) : height - 5}
                            >
                                {cell.subLabel}
                            </text>
                        )}
                        {arrowNodes}
                        {companyNodes}
                    </g>
                );
            }}
        </Color>
    );
};

export default Cell;
