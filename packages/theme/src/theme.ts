import { ThemeMedia } from './ThemeMedia';
import { ThemeFont } from './ThemeFont';
import { ElementTag } from '@stylewind/shared/dist/ElementTag';
import { ThemeColor } from './ThemeColor';

// main style
export const mainStyle = document.createElement('style');
mainStyle.dataset.id = 'styledwind';
document.head.appendChild(mainStyle);

// theme component
export const elementName = `theme`;

export class Theme extends HTMLElement {
  static color = new ThemeColor();
  static preset: Record<string, string> = {}; // waiting for dev
  static font = new ThemeFont();
  static media = new ThemeMedia();
  static tag = new ElementTag(Theme, elementName);

  // next feature: shadow mode open and add slot *for lit element
}
