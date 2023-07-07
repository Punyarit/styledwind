import { ThemeMedia } from '@styledwind/theme/dist/ThemeMedia';

const scope = (cssTemplate: string) => {};

const preset = (cssTemplate: string) => {};

const merge = (cssTemplate: string) => {};

const variable = (cssTemplate: string) => {};

const keyframe = (cssTemplate: string) => {};

const classFn = (cssTemplate: string) => {};

export const directives: Record<string, Function> = {
  scope,
  preset,
  merge,
  variable,
  keyframe,
  class: classFn,
  ...ThemeMedia.screenFn,
};
