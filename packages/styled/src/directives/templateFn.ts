import { CurrentStyleAbbr } from '@styledwind/shared/dist/currentStyleAbbr';
import { styleAbbrMapped } from '../constant/styleAbbrMapped';

export const templateFn = (tempStr: string, styledRules: Record<string, any>) => {
  styledRules['template'] ||= {};
  const templates = getTEmplateSplitted(tempStr);
  for (let index = 0; index < templates.length; ++index) {
    const [templateName, styleAbbrText] = templates[index].split(': ');

    const cssRules: string[] = [];
    const styleAbbrSplitted = styleAbbrText.split(' ');
    for (let index = 0; index < styleAbbrSplitted.length; ++index) {
      const styleAbbr = styleAbbrSplitted[index];
      const [propertyAttr, value] = styleAbbr.split('[');
      const propertyMapped = getStyleMappedAndSetCurrentStyle(propertyAttr, templateName, value);
      cssRules[index] = propertyMapped;
    }
    styledRules['template'][templateName] = cssRules;
  }
};

const getStyleMappedAndSetCurrentStyle = (
  propertyAttr: string,
  template: string,
  value: string
) => {
  // set CurrentStyleAbbr for handle error when style abbr does not match.
  CurrentStyleAbbr.abbr = propertyAttr;
  CurrentStyleAbbr.template = template;
  return styleAbbrMapped[propertyAttr](value.slice(0, -1));
};

const getTEmplateSplitted = (tempStr: string) => {
  const templateSplitted = tempStr.replace(/\n    \$|template:/g, '').split(';');
  templateSplitted.pop();
  return templateSplitted;
};
