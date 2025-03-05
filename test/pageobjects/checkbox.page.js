import Page from './page';

class CheckboxPage extends Page {
    /**
     * define elements
     */
    get lastCheckbox () { return $('#checkboxes input:last-child'); }
    get firstCheckbox () { return $('#checkboxes input:first-child'); }

    /**
     * overwrite specific options to adapt into page object
     */
    async open() {
        return super.open('checkboxes');
    }
}

export default new CheckboxPage();