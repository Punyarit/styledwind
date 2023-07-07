import { getColorThemeRules } from '@stylewind/shared/dist/getColorThemeRules';
import { appendStyle } from '@stylewind/shared/dist/appendStyle';
import { Theme } from './theme';

export class ThemeColor {
  #palette: Record<string, string> = {};
  set palette(paletteVal: Record<string, string>) {
    this.createPalette(paletteVal);
    this.#palette = paletteVal;
  }
  get palette() {
    return this.#palette;
  }

  private createPalette(paletteVal: Record<string, string>) {
    if (!Theme.tag.prefix) throw Error('No element prefix. please define prefix early');
    const themeColorRules = getColorThemeRules(paletteVal, Theme.tag.prefix);
    appendStyle(themeColorRules.join(''));
  }
}
