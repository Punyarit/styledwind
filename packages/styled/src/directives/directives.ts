import { classFn } from './classFn';
import { scopeFn } from './scopeFn';
import { joinFn } from './joinFn';
import { keyframeFn } from './keyframeFn';
import { templateFn } from './templateFn';
import { variableFn } from './variableFn';
import { screenFn } from './screenFn';
import { dynamicFn } from './dynamicFn';

export const directives: Record<string, Function> = {
  class: classFn,
  dynamic: dynamicFn,
  keyframe: keyframeFn,
  join: joinFn,
  scope: scopeFn,
  template: templateFn,
  variable: variableFn,
  ...screenFn(),
};
