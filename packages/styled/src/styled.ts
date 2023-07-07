import { directives } from './helper/directives';

export const styled = <T>(cssTemplateString: TemplateStringsArray): T => {
  const cssTemplates = getTemplateRules(cssTemplateString[0]);
  const cssRules = getCssRulesByDirective(cssTemplates);
  console.log('styled.js |cssRules| = ', cssRules);
  return {} as T;
};

const getTemplateRules = (cssTemplateString: string) => {
  const cssTemplates = cssTemplateString.split('@');
  cssTemplates.shift();
  return cssTemplates;
};

const getCssRulesByDirective = (cssTemplates: string[]) => {
  const cssRules = {} as any;
  for (let index = 0; index < cssTemplates.length; ++index) {
    const cssTemplate = cssTemplates[index];
    const [directiveName] = cssTemplate.split(':');
    cssRules[directiveName] = directives[directiveName](cssTemplate);
  }
  return cssRules;
};
