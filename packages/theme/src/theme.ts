import { ThemeMedia } from './ThemeMedia';
import { ThemeFont } from './ThemeFont';
import { ElementTag } from '@stylewind/shared/dist/ElementTag';
import { ThemeColor } from './ThemeColor';
import { CurrentStyleAbbr } from '@stylewind/shared/dist/currentStyleAbbr';

// handle error: when input wrong abbr style
window.addEventListener('error', (errorEvent) => {
  if (errorEvent.message.includes('styleAbbrMapped[propertyAttr] is not a function')) {
    console.error(
      `Style Mismatch in @styledwind/styled. The provided style abbreviation, "${CurrentStyleAbbr.abbr}", used in the class "${CurrentStyleAbbr.className}" within the scope "${CurrentStyleAbbr.scope}", does not match any existing style definitions. Please verify your input.`
    );
  }
});

// main style
export const mainStyle = document.createElement('style');
mainStyle.dataset.id = 'styledwind__main';
document.head.appendChild(mainStyle);

// dynamic
export const dynamicStyle = document.createElement('style');
dynamicStyle.dataset.id = 'styledwind__dynamic';
document.head.appendChild(dynamicStyle);

// theme component
export const elementName = `theme`;

export class Theme extends HTMLElement {
  static color = new ThemeColor();
  static font = new ThemeFont();
  static media = new ThemeMedia();
  static tag = new ElementTag(Theme, elementName);

  // next feature: shadow mode open and add slot *for lit element
}
