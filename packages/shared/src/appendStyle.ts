import { mainStyle } from '@styledwind/theme/dist/theme';

export function appendStyle(cssText: string) {
  const styleNodeText = document.createTextNode(cssText);
  mainStyle.appendChild(styleNodeText);
}
