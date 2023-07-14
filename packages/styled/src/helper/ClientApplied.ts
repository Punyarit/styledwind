import { styleAbbrMapped } from '../constant/styleAbbrMapped';
import { dynamicVariableStore } from './dynamicVariableStore';
import { toCamelCase } from './toCamelCase';

export class ClientApplied {
  #dynamicCached: any = null;

  #getDynamicElement = (dynamicId: string) =>
    new Promise<HTMLElement | null>((resolve, reject) => {
      const shouldEndTime = Date.now() + 2000;
      const intervalTimer = setInterval(() => {
        const element = document.getElementById(dynamicId);
        if (element) {
          clearInterval(intervalTimer);
          resolve(element);
        } else if (shouldEndTime <= Date.now()) {
          clearInterval(intervalTimer);
          resolve(null);
        }
      }, 0);
    });

  defineDynamic(dynamicKey: string, dynamicId: string, styledRules: Record<string, any>) {
    Object.defineProperty(this, `$${toCamelCase(dynamicKey)}`, {
      set: async (val: any) => {
        const element = await this.#getDynamicElement(dynamicId);

        const className = styledRules.dynamic[dynamicKey][val];
        if (!element) {
          console.warn(`Styledwind Warning: Can not set "${val}" to the element id "${dynamicId}". Because the element id "${dynamicId}" not displayed in the DOM within 2 seconds.`);
          return;
        }
        if (!className) {
          throw Error(`Styledwind Error: dynamic value "${val}" is not unable.`);
        }

        const [scope, ...classes] = className.split(' ');
        if (!element.classList.contains(scope)) {
          element.classList.add(scope);
        }

        if (this.#dynamicCached) {
          for (const _className of this.#dynamicCached) {
            element.classList.remove(_className);
          }
        }

        for (const _className of classes) {
          element.classList.add(_className);
        }

        this.#dynamicCached = classes;
      },

      get: () => dynamicId,
    });
  }

  defineVariable(varName: string, appliedVarRule: string, propertyAttr: string): void {
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
