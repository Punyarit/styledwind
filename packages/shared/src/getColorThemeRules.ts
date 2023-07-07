export function getColorThemeRules(themeObj: Record<string, string>, themeName: string) {
  let cssOutput: string[] = [];
  const colorStyles = Object.entries(themeObj);

  for (let index = 0; index < colorStyles.length; ++index) {
    const [theme, value] = colorStyles[index];
    cssOutput[index] = `${themeName}.${theme} { ${value} } `;
  }
  return cssOutput;
}
