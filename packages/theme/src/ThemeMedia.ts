export class ThemeMedia {
  #screen: Record<string, string> | undefined;
  static screenFn: Record<string, Function> = {};

  get screen() {
    if (!this.#screen) throw Error('No Screen Value');
    return this.#screen;
  }

  set screen(screenObj: Record<string, string>) {
    this.createScreenFn(screenObj);
    this.#screen = screenObj;
  }

  private createScreenFn(screenObj: Record<string, string>) {
    for (const screenKey in screenObj) {
      ThemeMedia.screenFn[screenKey] = (cssTemplate: string) => {
        console.log(`theme.js |${screenKey}| = `);
      };
    }
  }
}
