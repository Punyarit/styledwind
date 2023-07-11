import { CurrentStyleAbbr } from '@styledwind/shared/dist/currentStyleAbbr';

export const scopeFn = (scope: string, styledRules: Record<string, any>) => {
  const [, scopeName] = scope.split(': ');
  const appliedScopeName = scopeName.split(';')[0];
  styledRules['scope'] = appliedScopeName;
  CurrentStyleAbbr.scope = appliedScopeName;
};
