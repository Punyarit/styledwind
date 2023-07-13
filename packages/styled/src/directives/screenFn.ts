import { Theme } from '@styledwind/theme';
import { classFn } from './classFn';

export const screenFn = () => {
  const screenFnObj: Record<string, Function> = {};
  for (const screenKey in Theme.media.screen) {
    screenFnObj[screenKey] = (cssTemplate: string, styledRules: Record<string, any>) => {
      classFn(cssTemplate, styledRules, Theme.media.screen[screenKey]);
    };
  }
  return screenFnObj;
};
