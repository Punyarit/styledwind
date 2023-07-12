import { styleAbbrMapped } from '../constant/styleAbbrMapped';
import { dynamicVariableStore } from './dynamicVariableStore';
import { toCamelCase } from './toCamelCase';

export class ClientApplied {
  defineDynamicVariable(varName: string, appliedVarRule: string, propertyAttr: string): void {
    Object.defineProperty(this, `$${toCamelCase(varName)}`, {
      set: (styleValue: any) => {
        const textNode = dynamicVariableStore[appliedVarRule];
        const [, styleValMapped] = styleAbbrMapped[propertyAttr](styleValue).split(':');
        textNode.replaceData(
          textNode.data.indexOf(':'),
          textNode.data.indexOf(';'),
          `:${styleValMapped}`
        );
      },
    });
  }
}
