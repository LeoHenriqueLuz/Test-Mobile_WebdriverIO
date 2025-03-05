/**
 * Obtém a diferença de tempo em segundos
 */
export function timeDifference(string, start, end) {
    const elapsed = (end - start) / 1000;
    console.log(`${string} Levou ${elapsed} segundos.`);
}

/**
 * Cria uma solução multiplataforma para abrir um deep link
 */
export async function openDeepLinkUrl(url) {
    const prefix = 'wdio://';

    if (driver.isAndroid) {
        // No Android, a implementação é mais simples
        return driver.execute('mobile:deepLink', {
            url: `${prefix}${url}`,
            package: 'com.wdiodemoapp',
        });
    }


    // No iOS, podemos usar `driver.url` em simuladores, mas não em dispositivos reais.
    // Isso porque, em dispositivos reais, ao chamar `driver.url('')` para abrir um deep link,
    // a Siri pode ser acionada em vez de abrir o link diretamente.
    // Dispositivos reais e simuladores do iOS podem ser diferenciados pelo UDID:
    // - https://blog.diawi.com/2018/10/15/2018-apple-devices-and-their-new-udid-format/
    // - https://www.theiphonewiki.com/wiki/UDID
    // Simuladores do iOS possuem mais de um `-` no UDID.
    const simulatorRegex = new RegExp('(.*-.*){2,}');

    // Verifica se estamos em um simulador
    if ('udid' in driver.capabilities && simulatorRegex.test(driver.capabilities.udid)) {
        await driver.url(`${prefix}${url}`);
    } else {
        // Se for um dispositivo real, precisamos de etapas adicionais:
        // Abrimos o Safari para acessar o deep link
        await driver.execute('mobile: launchApp', { bundleId: 'com.apple.mobilesafari' });

        // Inserimos a URL do deep link no campo de endereço do Safari
        // Esse campo pode ser representado por dois elementos diferentes, o botão ou o campo de texto.
        // Utilizamos um "predicate string" para garantir precisão na busca dos elementos.
        const addressBarSelector = 'label == "Address" OR name == "URL"';
        const urlFieldSelector = 'type == "XCUIElementTypeTextField" && name CONTAINS "URL"';
        const addressBar = $(`-ios predicate string:${addressBarSelector}`);
        const urlField = $(`-ios predicate string:${urlFieldSelector}`);

        // Esperamos o botão de URL aparecer e clicamos para que o campo de texto seja exibido.
        // No iOS 13, o teclado é exibido automaticamente porque o campo já recebe foco ao abrir o Safari.
        if (!(await driver.isKeyboardShown())) {
            await addressBar.waitForDisplayed();
            await addressBar.click();
        }

        // Enviamos a URL e pressionamos Enter para abrir o link
        await urlField.setValue(`${prefix}${url}\uE007`);
    }

    /**
     * DICA:
     * Se você iniciou o dispositivo iOS com `autoAcceptAlerts:true` nas capacidades,
     * o Appium aceitará automaticamente o alerta. Neste caso, o código abaixo pode ser comentado.
     */
    // Espera pelo alerta de confirmação e o aceita
    // Em simuladores do iOS, esse alerta aparece apenas na primeira vez que o deep link é acessado.
    try {
        const openSelector = 'type == \'XCUIElementTypeButton\' && name CONTAINS \'Open\'';
        const openButton = $(`-ios predicate string:${openSelector}`);
        // Assumimos que o alerta aparecerá em até 2 segundos; caso contrário, ele não apareceu
        await openButton.waitForDisplayed({ timeout: 2000 });
        await openButton.click();
    } catch (e) {
        // Ignorar erro caso o alerta não apareça
    }
}