import { directives } from './helper/directives';
import { appendStyle } from '@styledwind/shared/dist/appendStyle';

export const styled = <T extends string>(
  cssTemplateString: TemplateStringsArray
): Record<T, string> => {
  const styledResult = {} as any;
  const cssTemplates = getTemplateRules(cssTemplateString[0]);
  const result = getCssRulesByDirective(cssTemplates, styledResult);
  appendStyle(result.class.cssRules.join(''));
  return { ...result.class.classDisplay } as Record<T, string>;
};

const getTemplateRules = (cssTemplateString: string) => {
  const cssTemplates = cssTemplateString.split('@');
  cssTemplates.shift();
  return cssTemplates;
};

const getCssRulesByDirective = (cssTemplates: string[], styledResult: any) => {
  const cssRules: Record<string, any> = {};
  for (let index = 0; index < cssTemplates.length; ++index) {
    const cssTemplate = cssTemplates[index];
    const [directiveName] = cssTemplate.split(':');
    cssRules[directiveName] = directives[directiveName](cssTemplate, styledResult);
  }
  return cssRules;
};
