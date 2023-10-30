// 3rd party
import tinycolor from 'tinycolor2';

/**
 * getRandomIntInclusive
 *
 * The maximum is inclusive and the minimum is inclusive.
 */

export const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * getRandomColor
 */

export const getRandomColor = () => {
  return tinycolor.fromRatio({ h: Math.random(), s: 1, v: 1 }).toHexString();
};
