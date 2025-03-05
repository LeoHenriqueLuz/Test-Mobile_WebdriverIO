import { DEFAULT_PIN, INCORRECT_PIN } from './Constants';

class Biometrics {
    get iosAllowBiometry() { return $('~Don’t Allow'); }
    get allowBiometry() { return $('~OK'); }
    get androidBiometryAlert() {
        const selector = 'android=new UiSelector().textContains("Please log in")';
        return $(selector);
    }

    /**
     * Submit biometric login
     */
    async submitBiometricLogin(successful) {
        // Touch / Face ID precisa ser acionado de maneira diferente no iOS
        if (driver.isIOS) {
            return this.submitIosBiometricLogin(successful);
        }
        return this.submitAndroidBiometricLogin(successful ? DEFAULT_PIN : INCORRECT_PIN);
    }

    /**
     * Submit iOS biometric login
     */
    async submitIosBiometricLogin(successful) {
        await this.allowIosBiometricUsage();
        return driver.touchId(successful);
    }

    /**
     * Permitir o uso de biometria no iOS, se ainda não estiver aceito
     */
    async allowIosBiometricUsage() {
        try {
            await this.iosAllowBiometry.waitForDisplayed({ timeout: 3000 });
            await this.allowBiometry.click();
        } catch (e) {
            // Se o alerta não aparecer, significa que já foi aceito antes
        }
    }

    /**
     * Submit Android biometric login
     */
    async submitAndroidBiometricLogin(fingerprintId) {
        await this.androidBiometryAlert.waitForDisplayed();
        await driver.fingerPrint(fingerprintId);
    }
}

export default new Biometrics();