import { ThemeMedia } from '@styledwind/theme/dist/ThemeMedia';

console.log('directives.js |ThemeMedia.screenFn| = ', ThemeMedia.screenFn);
export const directives: Record<string, Function> = {
  scope: (cssTemplate: string) => {
    console.log('styled.js |scope| = ');
  },
  preset: (cssTemplate: string) => {
    console.log('styled.js |preset| = ');
  },
  merge: (cssTemplate: string) => {
    console.log('styled.js |merge| = ');
  },
  variable: (cssTemplate: string) => {
    console.log('styled.js |variable| = ');
  },
  keyframe: (cssTemplate: string) => {
    console.log('styled.js |keyframe| = ');
  },
  class: (cssTemplate: string) => {
    console.log('styled.js |class| = ');
  },
  ...ThemeMedia.screenFn,
};
