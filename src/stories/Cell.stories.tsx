// Button.stories.tsx

import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import game1830 from '@18xx-maker/games/games/public/1830.json';
import Cell from '../market/Cell';
import defaultConfig from '../defaults.json';
import { getMarketData } from '../market/util';
import { Stock, Game } from '../market/types';

const CellStory: Meta = {
    title: 'Cell',
    component: Cell,
    parameters: {},
};

export default CellStory;

export const BasicCell = () => (
    <Cell
        game={game1830 as Game}
        data={getMarketData(game1830.stock as Stock, defaultConfig)}
        cell={game1830.stock.market[0][0] as any}
        config={defaultConfig}
    />
);
