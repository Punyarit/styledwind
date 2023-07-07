import { styleAbbrMapped } from '../constant/styleAbbrMapped';
import { toCamelCase } from './toCamelCase';

export const classFn = (cssTemplate: string, styledResult: any) => {
  const separateClass = getSeparateClass(cssTemplate);
  const { cssRules, classDisplay } = getCssRulesAndClassName(separateClass, styledResult);
  return {
    cssRules,
    classDisplay,
  };
};

const getSeparateClass = (cssTemplate: string) => {
  const separateClass = cssTemplate.split('\n    .');
  separateClass.shift();
  return separateClass;
};

const getCssRulesAndClassName = (separateClass: string[], styledResult: any) => {
  const cssRules: any[] = [];
  const classDisplay: Record<string, string> = {};
  for (let index = 0; index < separateClass.length; ++index) {
    const [className, styleAbbr] = separateClass[index].split(': ');
    const classNameDisplay = `${styledResult.scope}__${className}`;
    // set class name
    const camelCaseClass = toCamelCase(className);
    classDisplay[camelCaseClass] = classNameDisplay;
    // set css rules
    const styleTextResult = getStyleResult(styleAbbr);
    cssRules[index] = `.${classNameDisplay}{${styleTextResult.join('')}}`;
  }

  return { cssRules, classDisplay };
};

const getStyleResult = (styleAbbrText: string) => {
  const cssResult: any[] = [];
  const styleAbbrSplitted = styleAbbrText.match(/[\w-$]+(\[[^\]]+\])?/g)!;
  for (let index = 0; index < styleAbbrSplitted.length; ++index) {
    const styleAbbr = styleAbbrSplitted[index];
    if (!styleAbbr.startsWith('$')) {
      const [propertyAttr, value] = styleAbbr.split('-[');
      const propertyMapped = styleAbbrMapped[propertyAttr](value.slice(0, -1));
      cssResult[index] = propertyMapped;
    }
  }

  return cssResult;
};
