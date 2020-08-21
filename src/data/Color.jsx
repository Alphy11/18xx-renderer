import React, { useContext } from 'react';
import * as tinycolor from "tinycolor2";
import curry from "ramda/src/curry";
import is from "ramda/src/is";
import mergeDeepRight from "ramda/src/mergeDeepRight";
import ColorContext from '../context/ColorContext';
import ConfigContext from "../context/ConfigContext";
import GameContext from '../context/GameContext';
import PhaseContext from '../context/PhaseContext';



import themes from "./themes/maps";
import companies from "./themes/companies";

const colorAliases = {
  "cyan": "lightBlue",
  "grey": "gray",
  "lightGreen": "brightGreen",
  "navy": "navyBlue",
  "purple": "violet",
  "tan": "lightBrown"
};

const resolveColor = curry((theme, companiesTheme, phase, context, game, name) => {
  if (colorAliases[name]) {
    name = colorAliases[name];
  }

  let { colors } = themes[theme || "gmt"] || themes.gmt;

  // Add in company colors
  colors.companies = mergeDeepRight(companies.rob.colors,
                                       (companies[companiesTheme || "rob"] || companies.rob).colors);

  // Add in game colors
  colors = mergeDeepRight(colors,
                          game ? game.colors || {} : {});

  // Get color from context if it exists
  let color = colors[name];
  if(colors[context] && colors[context][name]) {
    color = colors[context][name];
  }

  // If color is an object use phase
  if(is(Object,color)) {
    color = color[phase || "default"] || color.default;
  }
  
return color;
});

const textColor = curry((theme, companiesTheme, phase, game, color) => {
  const text = [resolveColor(theme, companiesTheme, phase, null, game, "white"),
              resolveColor(theme, companiesTheme, phase, null, game, "black")];
  const tc = tinycolor.default(color);
  
return tinycolor.mostReadable(tc, text).toRgbString();
});

const strokeColor = (color, amount = 20) => {
  const tc = tinycolor(color);

  if (amount >= 0) {
    return tc.darken(amount).toString();
  } 
    
return tc.lighten(-1 * amount).toString();
  
};

const Color = ({ context, children }) => {
  const { config } = useContext(ConfigContext);
  const { game } = useContext(GameContext);
  const { theme, companiesTheme } = config;

  return (
    <ColorContext.Consumer>
      {colorContext => (
        <PhaseContext.Consumer>
          {phase => {
            const c = resolveColor(theme, companiesTheme, phase, context || colorContext, game);
            const p = resolveColor(theme, companiesTheme, phase, undefined, game);
            const t = textColor(theme, companiesTheme, phase, game);
            const s = strokeColor;

            return (
              <>
                {children(c, t, s, p)}
              </>
            );
          }}
        </PhaseContext.Consumer>
      )}
    </ColorContext.Consumer>
  );
};

export default Color;
