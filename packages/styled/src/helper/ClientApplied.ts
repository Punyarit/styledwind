import { styleAbbrMapped } from '../constant/styleAbbrMapped';
import { DynamicVariableStore } from './DynamicVariableStore';
import { toCamelCase } from './toCamelCase';

export class ClientApplied {
  var(color: string): string {
    return `var(--${color})`;
  }

  defineDynamicVariable(varName: string, appliedVarRule: string, propertyAttr: string): void {
    Object.defineProperty(this, `$${toCamelCase(varName)}`, {
      set: (styleValue: any) => {
        const textNode = DynamicVariableStore.store[appliedVarRule];
        const data = textNode.data;
        const [, styleValMapped] = styleAbbrMapped[propertyAttr](styleValue).split(':');
        textNode.replaceData(data.indexOf(':'), data.indexOf(';'), `:${styleValMapped}`);
      },
    });
  }
}
