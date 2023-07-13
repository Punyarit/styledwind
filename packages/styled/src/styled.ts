import { directives } from './directives/directives';
import { appendStyle } from '@styledwind/shared/dist/appendStyle';
import { ClientApplied } from './helper/ClientApplied';

type StyledType<T extends string> = Record<T, any> & { var: Function };

export const styled = <T extends string>(
  cssTemplateString: TemplateStringsArray
): StyledType<T> => {
  const cssTemplates = cssTemplateString[0].trim().slice(1).split('@');
  const styledRules = getStyledRules(cssTemplates);
  appendStyle(styledRules.cssRules.join(''));
  return styledRules.client as StyledType<T>;
};

const getStyledRules = (cssTemplates: string[]) => {
  // mutable obj
  const styledRules: Record<string, any> = {
    client: new ClientApplied(),
    cssRules: [],
  };
  for (let index = 0; index < cssTemplates.length; ++index) {
    const cssTemplate = cssTemplates[index];
    const [directiveName] = cssTemplate.split(':');
    directives[directiveName](cssTemplate, styledRules);
  }
  return styledRules;
};
