import { ThemeMedia } from '@styledwind/theme/dist/ThemeMedia';
import { classFn } from './classFn';
import { scopeFn } from './scopeFn';

const preset = (cssTemplate: string) => {};

const merge = (cssTemplate: string) => {};

const variable = (cssTemplate: string) => {};

const keyframe = (cssTemplate: string) => {};

export const directives: Record<string, Function> = {
  scope: scopeFn,
  preset,
  merge,
  variable,
  keyframe,
  class: classFn,
  ...ThemeMedia.screenFn,
};
