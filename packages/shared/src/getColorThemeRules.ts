export function getColorThemeRules(themeObj: Record<string, string>, themeName: string) {
  let cssOutput: string[] = [];
  console.log('getColorThemeRules.js |themeObj| = ', themeObj);
  console.log('getColorThemeRules.js |themeName| = ', themeName);
  const colorStyles = Object.entries(themeObj);

  console.log('getColorThemeRules.js |colorStyles| = ', colorStyles);
  for (let index = 0; index < colorStyles.length; ++index) {
    const [theme, value] = colorStyles[index];
    cssOutput[index] = `${themeName}.${theme} { ${value} } `;
  }
  return cssOutput;
}
