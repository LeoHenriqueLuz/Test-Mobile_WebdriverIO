import { DEFAULT_PIN } from '../helpers/Constants';

class AndroidSettings {
    /**
     * Get the platform version
     */
    get platformVersion() {
        return parseInt(
            (driver.capabilities.platformVersion || '8'),
            10
        );
    }

    /**
     * Execute the fingerprint wizard for Android 7 or lower
     */
    async fingerPrintWizardSevenOrLower(pin) {
        await this.waitAndTap('NEXT');
        await this.setPinSevenOrLower(pin);
        await this.touchSensorSevenOrLower(pin);
        await this.waitAndTap('DONE');
    }

    /**
     * Enable the fingerprint through the wizard
     */
    async fingerPrintWizardEightOrHigher(pin) {
        if (this.platformVersion > 9) {
            await this.reEnterPin(pin);
            await this.waitAndTap('NEXT');
        } else {
            await this.waitAndTap('NEXT');
            await this.reEnterPin(pin);
        }

        await this.touchSensorEightAndHigher(pin);
        await this.waitAndTap('DONE');
    }

    /**
     * Re-enter pin and submit screen
     */
    async reEnterPin(pin) {
        await (await this.findAndroidElementByText('Re-enter your PIN')).waitForDisplayed();
        await this.executeAdbCommand(`input text ${pin} && input keyevent 66`);
    }

    /**
     * Set the pin for Android 7 or lower
     */
    async setPinSevenOrLower(pin) {
        await this.waitAndTap('Fingerprint + PIN');
        await this.waitAndTap('No thanks');
        await (await this.findAndroidElementByText('Choose your PIN')).waitForDisplayed();
        await this.executeAdbCommand(
            `input text ${pin} && input keyevent 66 && input text ${pin} && input keyevent 66`
        );
        await this.waitAndTap('DONE');
    }

    /**
     * Touch sensor and enable fingerprint for Android 7 and lower
     */
    async touchSensorSevenOrLower(touchCode) {
        await this.waitAndTap('NEXT');
        await (await this.findAndroidElementByText('Put your finger')).waitForDisplayed();
        await driver.fingerPrint(touchCode);
        await (await this.findAndroidElementByText('Move your finger')).waitForDisplayed();
        await driver.fingerPrint(touchCode);
    }

    /**
     * Touch sensor and enable fingerprint for Android 8 and higher
     */
    async touchSensorEightAndHigher(touchCode) {
        await (await this.findAndroidElementByText('Touch the sensor')).waitForDisplayed();
        await driver.fingerPrint(touchCode);

        await (await this.findAndroidElementByText('Put your finger')).waitForDisplayed();
        await driver.fingerPrint(touchCode);

        await (await this.findAndroidElementByText('Keep lifting')).waitForDisplayed();
        await driver.fingerPrint(touchCode);
    }

    /**
     * Execute ADB commands on the device
     */
    async executeAdbCommand(adbCommand) {
        await driver.execute('mobile: shell', {
            command: adbCommand,
        });
    }

    /**
     * Find an Android element based on text
     */
    async findAndroidElementByText(string) {
        const selector = `android=new UiSelector().textContains("${string}")`;
        return $(selector);
    }

    /**
     * Wait and click on an element
     */
    async waitAndTap(string) {
        await (await this.findAndroidElementByText(string)).waitForDisplayed();
        await (await this.findAndroidElementByText(string)).click();
    }

    /**
     * This is the core method to enable FingerPrint for Android. It will walk through all steps to enable
     * FingerPrint on Android 7.1 till the latest one all automatically for you.
     */
    async enableBiometricLogin() {
        if (this.platformVersion < 8) {
            await this.executeAdbCommand(
                'am start -a android.settings.SECURITY_SETTINGS'
            );
            await this.waitAndTap('Fingerprint');
            await this.fingerPrintWizardSevenOrLower(DEFAULT_PIN);
        } else {
            await this.executeAdbCommand(
                `am start -a android.settings.SECURITY_SETTINGS && locksettings set-pin ${DEFAULT_PIN}`
            );
            await this.waitAndTap('Fingerprint');
            await this.fingerPrintWizardEightOrHigher(DEFAULT_PIN);
        }
    }
}

export default new AndroidSettings();