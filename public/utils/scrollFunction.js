import { handleScroll } from "./handleScroll";

let timer = null;

export function scrollFunction() {
    clearTimeout(this.timer);
    this.timer = setTimeout(handleScroll, 100);
}
