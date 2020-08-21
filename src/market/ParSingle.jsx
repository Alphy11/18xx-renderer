import React from 'react';

import Par from './Par';
import Svg from '../Svg';

import { getParData } from './util';
import { unitsToCss } from '../util';

const ParSingle = ({ config, game }) => {
    const data = getParData(game.stock, config);

    const paperWidth = data.totalWidth + 5 + 2 * config.paper.margins;
    const paperHeight = data.totalHeight + 5 + 2 * config.paper.margins;
    const cssPaperWidth = unitsToCss(paperWidth);
    const cssPaperHeight = unitsToCss(paperHeight);

    return (
        <div className="printElement" style={{ display: 'inline-block' }}>
            <div className="stock" style={{ display: 'inline-block' }}>
                <Svg
                    width={data.css.totalWidth}
                    height={data.css.totalHeight}
                    viewBox={`0 0 ${data.totalWidth} ${data.totalHeight}`}
                >
                    <Par data={data} title={`${game.info.title} Par`} />
                </Svg>
                <style>{`@media print {@page {size: ${cssPaperWidth} ${cssPaperHeight}; margin: ${unitsToCss(
                    config.paper.margins,
                )}}}`}</style>
            </div>
        </div>
    );
};

export default ParSingle;
