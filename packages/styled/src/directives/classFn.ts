import { CurrentStyleAbbr } from '@stylewind/shared/dist/currentStyleAbbr';
import { styleAbbrMapped } from '../constant/styleAbbrMapped';
import { toCamelCase } from '../helper/toCamelCase';

export const classFn = (cssTemplate: string, styledRules: Record<string, any>, screen?: string) => {
  const separateClass = getSeparateClass(cssTemplate);
  setCssRules(separateClass, styledRules, screen);
};

const getSeparateClass = (cssTemplate: string) => {
  const separateClass = cssTemplate.split('\n    .');
  separateClass.shift();
  return separateClass;
};

const setCssRules = (
  separateClass: string[],
  styledRules: Record<string, any>,
  screen?: string
) => {
  for (let index = 0; index < separateClass.length; ++index) {
    const [className, styleAbbr] = separateClass[index].split(': ');
    const [classNameVal] = className.match(/([\w-]+)(?=[\s::.#>,]|$)/g)!;
    CurrentStyleAbbr.className = classNameVal;
    const styleTextResult = getStyleResult(styleAbbr, styledRules).join('');
    const appliedClassName = `${styledRules.scope} ${classNameVal}`;
    const camelCaseClass = toCamelCase(classNameVal);
    const compliedStyle = `.${styledRules.scope}.${className}{${styleTextResult}}`;
    const finalStyle = screen ? `${screen}{${compliedStyle}}` : compliedStyle;

    // set to styledRules
    styledRules['client'][camelCaseClass] = appliedClassName;
    styledRules['cssRules'].push(finalStyle);
  }
};

export const getStyleResult = (styleAbbrText: string, styledRules: Record<string, any>) => {
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
      const propertyMapped = getStyleMappedAndSetCurrentStyle(propertyAttr, value, styledRules);
      cssResult[index] = propertyMapped;
    }
  }

  return cssResult;
};

const getStyleMappedAndSetCurrentStyle = (
  propertyAttr: string,
  value: string,
  styledRules: Record<string, any>
) => {
  // set CurrentStyleAbbr for handle error when style abbr does not match.
  CurrentStyleAbbr.abbr = propertyAttr;
  return styleAbbrMapped[propertyAttr](value.slice(0, -1), styledRules);
};
