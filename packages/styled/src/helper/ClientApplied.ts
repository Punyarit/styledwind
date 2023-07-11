import { DynamicVariableStore } from './DynamicVariableStore';
import { toCamelCase } from './toCamelCase';

export class ClientApplied {
  var(color: string): string {
    return `var(--${color})`;
  }

  defineDynamicVariable(varName: string, appliedVarRule: string): void {
    Object.defineProperty(this, `$${toCamelCase(varName)}`, {
      set: (value: any) => {
        const textNode = DynamicVariableStore.store[appliedVarRule];
        const data = textNode.data;
        textNode.replaceData(data.indexOf(':'), data.indexOf(';'), `:${value};`);
      },
    });
  }
}
