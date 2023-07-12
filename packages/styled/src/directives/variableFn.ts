import { CurrentStyleAbbr } from '@styledwind/shared/dist/currentStyleAbbr';
import { styleAbbrMapped } from '../constant/styleAbbrMapped';
import { Theme, dynamicStyle } from '@styledwind/theme';
import { dynamicVariableStore } from '../helper/dynamicVariableStore';

const startStyle = document.createTextNode(
  `${Theme.tag.prefix}{\n--auto:auto;\n--inherit:inherit;\n--initial:initial;\n--none:none;\n--revert:revert;\n--unset:unset; `
);
const endStyle = document.createTextNode(`}`);
dynamicStyle.appendChild(startStyle);
dynamicStyle.appendChild(endStyle);

export const variableFn = (varStr: string, styledRules: Record<string, any>) => {
  styledRules['variable'] ||= {};

  const variables = getVariableSplitted(varStr);
  for (let index = 0; index < variables.length; ++index) {
    const [varName, styleAbbrText] = variables[index].split(': ');

    const [propertyAttr, value] = styleAbbrText.split('[');
    const styleValue = value.slice(0, -1);
    const [styleMapped, styleValMapped] = getStyleMappedAndSetCurrentStyle(
      propertyAttr,
      varName,
      styleValue
    ).split(':');

    // create css properties variable for apply to style tag
    const appliedVarRule = `${styledRules.scope}-${varName}`;
    // append dynamic style
    const dynamicVar = document.createTextNode(`--${appliedVarRule}:${styleValMapped}`);
    dynamicVariableStore[appliedVarRule] = dynamicVar;
    dynamicStyle.insertBefore(dynamicVar, endStyle);

    styledRules['variable'][varName] = `${styleMapped}:var(--${appliedVarRule});`;
    styledRules['client'].defineDynamicVariable(varName, appliedVarRule, propertyAttr);
  }
};

function getVariableSplitted(varStr: string) {
  const variableSplitted = varStr.replace(/\n    \--|variable:/g, '').split(';');
  variableSplitted.pop();
  return variableSplitted;
}

function getStyleMappedAndSetCurrentStyle(
  propertyAttr: string,
  variable: string,
  styleValue: string
): string {
  // set CurrentStyleAbbr for handle error when style abbr does not match.
  CurrentStyleAbbr.abbr = propertyAttr;
  CurrentStyleAbbr.variable = variable;
  return styleAbbrMapped[propertyAttr](styleValue);
}
