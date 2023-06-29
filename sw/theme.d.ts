import { ThemeVariable } from './types/theme.types';
declare class Theme extends HTMLElement {
    static color: ThemeVariable;
    static font?: ThemeVariable;
    static fsDisplay: string;
    static screen?: ThemeVariable;
    static variable: string;
    constructor();
}
export default Theme;
