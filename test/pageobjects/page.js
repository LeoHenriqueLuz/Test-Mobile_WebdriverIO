export default class Page {
    /**
     * Abre uma subpágina da página
     */
    async open(path) {
        return browser.url(path);
    }
}