import { createAndInjectStyle } from './helpers/createAndInjectStyle';
import { generateColorStyleText } from './helpers/generateColorStyleText';
class Theme extends HTMLElement {
    constructor() {
        super();
        const colorStyleText = generateColorStyleText(Theme.color);
        const variableStyleText = `sw-theme{${Theme.variable}}`;
        const themeSTyle = colorStyleText + variableStyleText;
        createAndInjectStyle(themeSTyle);
    }
}
Theme.color = {};
Theme.fsDisplay = '1';
Theme.variable = ``;
customElements.define('sw-theme', Theme);
class Div extends HTMLElement {
    set css(css) { }
}
customElements.define('sw-div', Div);
export default Theme;
//# sourceMappingURL=theme.js.map