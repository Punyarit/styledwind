export const scopeFn = (scope: string, styledResult: any) => {
  styledResult.scope = scope.split(': ')[1].trim().slice(0, -1);
};
