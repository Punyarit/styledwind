import { defineElement } from '@stylewind/shared/dist/defineElement';
import { getColorThemeRules } from '@stylewind/shared/dist/getColorThemeRules';
import { appendStyle } from '@stylewind/shared/dist/appendStyle';

// main style
export const mainStyle = document.createElement('style');
mainStyle.dataset.id = 'styledwind';
document.head.appendChild(mainStyle);

// theme component
const elementName = `theme`;
export class Theme extends HTMLElement {
  static tagName = ``;
  static color: Record<string, string> = {};
  static font: Record<string, string> = {};
  static screen: Record<string, string> = {};
  static preset: Record<string, string> = {};
  static fsDisplay = '1';

  constructor() {
    super();
    const themeColorRules = getColorThemeRules(Theme.color, Theme.tagName);
    appendStyle(themeColorRules.join(''));
  }

  static define = (prefix: string) => {
    Theme.tagName = `${prefix}-${elementName}`;
    defineElement(prefix, elementName, Theme);
  };
}
