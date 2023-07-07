export class ThemeFont {
  #family: Record<string, string> | undefined;
  #display: string | undefined;

  set family(familyVal: Record<string, string> | undefined) {
    this.#family = familyVal;
  }
  get family(): Record<string, string> | undefined {
    return this.#family;
  }

  set display(displayVal: string | undefined) {
    localStorage.setItem('styledwind-font-display', displayVal!);
    this.#display = displayVal;
  }
  get display(): string | undefined {
    return this.#display;
  }
}
