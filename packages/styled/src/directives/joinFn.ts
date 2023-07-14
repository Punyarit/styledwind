import { toCamelCase } from '../helper/toCamelCase';

export const joinFn = (joinClassStr: string, styledRules: Record<string, any>) => {
  const joinClass = joinClassStr.slice(8).split('\n    ');
  for (let index = 0; index < joinClass.length; ++index) {
    const classAssign = joinClass[index];
    const [joinClassName, classNames] = classAssign.split(':');
    const appliedClassName = toCamelCase(joinClassName.trim());
    // applied
    styledRules['client'][appliedClassName] = `${styledRules.scope} ${classNames
      .replace(/\.|;/g, '')
      .trim()}`;
  }
};
