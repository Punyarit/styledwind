import { ThemeMedia } from '@styledwind/theme/dist/ThemeMedia';
import { classFn } from './classFn';
import { scopeFn } from './scopeFn';
import { mergeFn } from './mergeFn';
import { keyframeFn } from './keyframeFn';
import { templateFn } from './templateFn';
import { variableFn } from './variableFn';

const preset = (cssTemplate: string) => {};

export const directives: Record<string, Function> = {
  scope: scopeFn,
  merge: mergeFn,
  variable: variableFn,
  preset,
  template: templateFn,
  keyframe: keyframeFn,
  class: classFn,
  ...ThemeMedia.screenFn,
};
