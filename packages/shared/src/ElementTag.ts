import { defineElement } from './defineElement';

export class ElementTag {
  #prefix!: string;

  constructor(public elementClass: typeof HTMLElement, public elementName: string) {}

  set prefix(prefix: string) {
    defineElement(prefix, this.elementName, this.elementClass);
    this.#prefix = `${prefix}-${this.elementName}`;
  }
  get prefix() {
    return this.#prefix;
  }
}
