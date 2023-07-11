import { ThemeMedia } from '@styledwind/theme/dist/ThemeMedia';
import { classFn } from './classFn';
import { scopeFn } from './scopeFn';
import { mergeFn } from './mergeFn';
import { keyframeFn } from './keyframeFn';
import { templateFn } from './templateFn';
import { variableFn } from './variableFn';
import { presetFn } from './presetFn';

export const directives: Record<string, Function> = {
  scope: scopeFn,
  merge: mergeFn,
  variable: variableFn,
  preset: presetFn,
  template: templateFn,
  keyframe: keyframeFn,
  class: classFn,
  ...ThemeMedia.screenFn,
};
