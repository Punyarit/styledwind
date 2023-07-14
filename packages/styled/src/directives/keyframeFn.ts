import { getStyleResult } from './classFn';

export const keyframeFn = (keyframeStr: string, styledRules: Record<string, any>) => {
  const keyframes = keyframeStr
    .slice(9)
    .trim()
    .split(/\n\s*\n/);
  for (let KeyframesIndex = 0; KeyframesIndex < keyframes.length; ++KeyframesIndex) {
    const keyframe = keyframes[KeyframesIndex].trim();

    const [animateName, stylesAbbr] = keyframe.split(/(?<=\w):/);
    const styleSplitted = stylesAbbr.trim().split('      ');

    const durationStyles = [];
    for (let index = 0; index < styleSplitted.length; ++index) {
      const [duration, styleAbbr] = styleSplitted[index].split(': ');
      const cssRules = getStyleResult(styleAbbr, styledRules);
      durationStyles[index] = `${duration}{${cssRules.join('')}}`;
    }
    styledRules['cssRules'][KeyframesIndex] = `@keyframes ${styledRules.scope}-${animateName.slice(
      1
    )}{${durationStyles.join('')}}`;
  }
};
