import Page from './page';

class FormPage extends Page {
    /**
     * define elements
     */
    get username () { return $('#username'); }
    get password () { return $('#password'); }
    get submitButton () { return $('#login button[type=submit]'); }
    get flash () { return $('#flash'); }

    /**
     * a method to encapsulate automation code to interact with the page
     * e.g. to login using username and password
     */
    async login({ username, password }) {
        await this.username.setValue(username);
        await this.password.setValue(password);
        // only for mobile, if you test on a desktop browser `hideKeyboard` won't exist.
        if (browser.hideKeyboard) {
            await browser.hideKeyboard();
        }
        await this.submitButton.click();
    }

    /**
     * define or overwrite page methods
     */
    async open() {
        return super.open('login');
    }
}

export default new FormPage();