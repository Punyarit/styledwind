import { toCamelCase } from '../helper/toCamelCase';

export const mergeFn = (mergedClassStr: string, styledRules: Record<string, any>) => {
  const mergedClass = mergedClassStr.slice(8).split('\n    ');
  for (let index = 0; index < mergedClass.length; ++index) {
    const classAssign = mergedClass[index];
    const [mergedClassName, classNames] = classAssign.split(':');
    const appliedClassName = toCamelCase(mergedClassName.trim());
    // applied
    styledRules['client'][appliedClassName] = `${styledRules.scope} ${classNames
      .replace(/\.|;/g, '')
      .trim()}`;
  }
};
