export const dynamicFn = (cssTemplate: string, styledRules: Record<string, any>) => {
  const dynamicTemplate = cssTemplate
    .slice(8)
    .trim()
    .split(/\n\s*\n/);

  styledRules['dynamic'] ||= {};

  for (let index = 0; index < dynamicTemplate.length; index++) {
    const [key, value] = dynamicTemplate[index].split(':\n');
    const dynamicKey = key.trim().slice(1);

    styledRules['dynamic'][dynamicKey] ||= {};

    const dynamicId = `${styledRules.scope}-${dynamicKey}`;

    const valueMap = value.slice(0, -1).split(';');

    for (let index = 0; index < valueMap.length; index++) {
      const [key, value] = valueMap[index].trim().split(': ');

      styledRules['dynamic'][dynamicKey][key] =
        styledRules.client[value] || `${styledRules.scope} ${value.slice(1)}`;
    }

    // set up
    styledRules['client'].defineDynamic(dynamicKey, dynamicId, styledRules);
    styledRules['client'][dynamicKey] = dynamicId;
  }
};
