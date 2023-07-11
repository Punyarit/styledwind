import { CurrentStyleAbbr } from '@stylewind/shared/dist/currentStyleAbbr';
import { styleAbbrMapped } from '../constant/styleAbbrMapped';
import { toCamelCase } from '../helper/toCamelCase';

export const classFn = (cssTemplate: string, styledRules: Record<string, any>) => {
  const separateClass = getSeparateClass(cssTemplate);
  getCssRules(separateClass, styledRules);
};

const getSeparateClass = (cssTemplate: string) => {
  const separateClass = cssTemplate.split('\n    .');
  separateClass.shift();
  return separateClass;
};

const getCssRules = (separateClass: string[], styledRules: Record<string, any>) => {
  for (let index = 0; index < separateClass.length; ++index) {
    const [className, styleAbbr] = separateClass[index].split(': ');
    const styleTextResult = getStyleResult(styleAbbr, className, styledRules).join('');
    const appliedClassName = `${styledRules.scope} ${className}`;
    const camelCaseClass = toCamelCase(className);
    styledRules['client'][camelCaseClass] = appliedClassName;
    styledRules['cssRules'].push(`.${styledRules.scope}.${className}{${styleTextResult}}`);
  }
};

const getStyleResult = (
  styleAbbrText: string,
  className: string,
  styledRules: Record<string, any>
) => {
  const cssResult: any[] = [];
  const styleAbbrSplitted = styleAbbrText.match(/[\w-$]+(\[[^\]]+\])?/g)!;
  for (let index = 0; index < styleAbbrSplitted.length; ++index) {
    const styleAbbr = styleAbbrSplitted[index];
    if (styleAbbr.startsWith('$')) {
      cssResult[index] = styledRules.template[styleAbbr.slice(1)].join('');
    } else if (styleAbbr.startsWith('--')) {
      cssResult[index] = styledRules.variable[styleAbbr.slice(2)];
    } else {
      // class
      const [propertyAttr, value] = styleAbbr.split('[');
      const propertyMapped = getStyleMappedAndSetCurrentStyle(propertyAttr, className, value);
      cssResult[index] = propertyMapped;
    }
  }

  return cssResult;
};

const getStyleMappedAndSetCurrentStyle = (
  propertyAttr: string,
  className: string,
  value: string
) => {
  // set CurrentStyleAbbr for handle error when style abbr does not match.
  CurrentStyleAbbr.abbr = propertyAttr;
  CurrentStyleAbbr.className = className;
  return styleAbbrMapped[propertyAttr](value.slice(0, -1));
};
