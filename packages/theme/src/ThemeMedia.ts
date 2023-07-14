export class ThemeMedia {
  #screen: Record<string, string> | undefined;
  // static screenFn: Record<string, Function> = {};

  get screen() {
    if (!this.#screen) throw Error('No Screen Value');
    return this.#screen;
  }

  set screen(screenObj: Record<string, string>) {
    this.#screen = screenObj;
  }
}
