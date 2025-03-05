import AppScreen from './AppScreen';

class FormsScreen extends AppScreen {
    constructor () {
        super('~Forms-screen');
    }

    get input () { return $('~text-input'); }
    get inputTextResult () { return $('~input-text-result'); }
    get switch () { return $('~switch'); }
    get switchText () { return $('~switch-text'); }
    get dropDown () { return $('~Dropdown'); }
    get activeButton () { return $('~button-Active'); }
    get inActiveButton () { return $('~button-Inactive'); }

    async tapOnInputTextResult() {
        await this.inputTextResult.click();
    }

    async tapOnSwitch() {
        await this.switch.click();
    }

    async tapOnDropDown() {
        await this.dropDown.click();
    }

    async tapOnActiveButton() {
        await this.activeButton.click();
    }

    async tapOnInActiveButton() {
        await this.inActiveButton.click();
    }

    /**
     * Return if the switch is active or not active for iOS / Android
     * For Android the switch is `ON|OFF`, for iOS '1|0'
    */
    async isSwitchActive() {
        const switchState = await this.switch.getAttribute('checked');  // ou 'selected'
        return switchState === 'true';
    }

    /**
     * Get the text of the drop down component
     */
    async getDropDownText() {
        // For Android the selected value can be found with this XPATH
        let selector;

        if (driver.isAndroid) {
            selector = '//*[@content-desc="Dropdown"]/*/android.widget.EditText';
        } else {
            selector = '-ios class chain:**/*[`name == "Dropdown"`]/**/*[`name == "text_input"`]';
        }

        return $(selector).getText();
    }
}

export default new FormsScreen();