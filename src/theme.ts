import { createAndInjectStyle } from './helpers/createAndInjectStyle';
import { generateColorStyleText } from './helpers/generateColorStyleText';
import { ThemeVariable } from './types/theme.types';

class Theme extends HTMLElement {
  public static color: ThemeVariable = {};
  public static font?: ThemeVariable;
  public static fsDisplay = '1';
  public static screen?: ThemeVariable;
  public static variable = ``;

  constructor() {
    super();
    const colorStyleText = generateColorStyleText(Theme.color);
    const variableStyleText = `sw-theme{${Theme.variable}}`;
    const themeSTyle = colorStyleText + variableStyleText;
    createAndInjectStyle(themeSTyle);
  }
}
customElements.define('sw-theme', Theme);

class Div extends HTMLElement {
  set css(css: string) {}
}
customElements.define('sw-div', Div);

export default Theme;
