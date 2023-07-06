export const defineElement = (
  prefix: string,
  elementName: string,
  elementClass: typeof HTMLElement
) => {
  customElements.define(`${prefix}-${elementName}`, elementClass);
};
