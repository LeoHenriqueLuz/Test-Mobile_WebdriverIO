export const CONTEXT_REF = {
    NATIVE: 'native',
    WEBVIEW: 'webview',
};

const DOCUMENT_READY_STATE = {
    COMPLETE: 'complete',
    INTERACTIVE: 'interactive',
    LOADING: 'loading',
};

class WebView {
    /**
     * Aguarde o contexto da WebView ser carregado
     *
     * Por padrão, o contexto atual é `NATIVE_APP`. Se uma WebView for carregada,
     * ela será adicionada aos contextos atuais e aparecerá assim no iOS:
     * `["NATIVE_APP","WEBVIEW_28158.2"]`
     * O número após `WEBVIEW` será aleatório e pode estar em qualquer ordem.
     *
     * No Android, o retorno pode ser algo como:
     * `["NATIVE_APP","WEBVIEW_com.wdiodemoapp", "WEBVIEW_com.chrome"]`
     * O nome após `WEBVIEW` será o nome do pacote do app que contém a WebView.
     */
    async waitForWebViewContextLoaded() {
        await driver.waitUntil(
            async () => {
                const currentContexts = await this.getCurrentContexts();
                return currentContexts.length > 1 &&
                    currentContexts.find(context => context.toLowerCase().includes(CONTEXT_REF.WEBVIEW)) !== 'undefined';
            },
            {
                // Tempo máximo de espera de 45 segundos. Isso porque no iOS, o carregamento
                // da WebView pode levar mais tempo.
                timeout: 45000,
                timeoutMsg: 'Contexto da WebView não carregado',
                interval: 100,
            }
        );
    }

    /**
     * Alterna entre os contextos nativo e WebView
     */
    async switchToContext(context) {
        // O primeiro contexto será sempre o NATIVE_APP,
        // o segundo será sempre a página WebdriverIO na WebView.
        await driver.switchContext((await this.getCurrentContexts())[context === CONTEXT_REF.NATIVE ? 0 : 1]);
    }

    /**
     * Retorna um array com a lista de todos os contextos disponíveis
     */
    async getCurrentContexts() {
        return driver.getContexts();
    }

    /**
     * Aguarda o documento ser totalmente carregado
     */
    async waitForDocumentFullyLoaded() {
        await driver.waitUntil(
            // Uma página pode ter múltiplos estados. Precisamos aguardar o estado correto.
            // Essa implementação é semelhante à usada pelo WebDriver para `browser.url('https://webdriver.io')`,
            // que também aguarda a prontidão da página.
            // Veja também as especificações do W3C:
            // https://www.w3.org/TR/webdriver/#dfn-waiting-for-the-navigation-to-complete
            async () => (await driver.execute(() => document.readyState)) === DOCUMENT_READY_STATE.COMPLETE,
            {
                timeout: 15000,
                timeoutMsg: 'O site não foi carregado',
                interval: 100,
            }
        );
    }

    /**
     * Aguarde o site dentro da WebView ser carregado
     */
    async waitForWebsiteLoaded() {
        await this.waitForWebViewContextLoaded();
        await this.switchToContext(CONTEXT_REF.WEBVIEW);
        await this.waitForDocumentFullyLoaded();
        await this.switchToContext(CONTEXT_REF.NATIVE);
    }
}

export default WebView;